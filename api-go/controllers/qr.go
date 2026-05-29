package controllers

import (
	"bytes"
	"encoding/json"
	"net/http"

	"api-go/utils"

	"github.com/gofiber/fiber/v2"
	"gonum.org/v1/gonum/mat"
)

type GetQRRequest struct {
	Matrix [][]float64 `json:"matrix"`
}

func GetQR(c *fiber.Ctx) error {
	var body GetQRRequest

	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid body, required a matrix",
		})
	}

	if len(body.Matrix) == 0 || len(body.Matrix[0]) == 0 {
		return c.Status(400).JSON(fiber.Map{
			"error": "Matrix cannot be empty",
		})
	}

	// rotated
	rotated := utils.RotateMatrix90(body.Matrix)

	rows := len(body.Matrix)
	cols := len(body.Matrix[0])

	flat := make([]float64, rows*cols)
	for i, row := range body.Matrix {
		for j, val := range row {
			flat[i*cols+j] = val
		}
	}

	m := mat.NewDense(rows, cols, flat)

	var qr mat.QR
	qr.Factorize(m)

	var Q, R mat.Dense
	qr.QTo(&Q)
	qr.RTo(&R)

	// send QR factorization to the Node API
	payload, err := json.Marshal(fiber.Map{
		"Q": utils.MatrixToSlice(&Q),
		"R": utils.MatrixToSlice(&R),
	})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to marshal payload"})
	}

	resp, err := http.Post(
		"https://statistics-interseguro-api-node.onrender.com/api/statistics",
		"application/json",
		bytes.NewBuffer(payload),
	)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to call node api"})
	}
	defer resp.Body.Close()

	var stats map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&stats)

	return c.JSON(fiber.Map{
		"original":    		 body.Matrix,
		"matrixRotated": rotated,
		"Q":             utils.MatrixToSlice(&Q),
		"R":             utils.MatrixToSlice(&R),
		"statistics":    stats,
	})
}