package main

import (
  "bytes"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"gonum.org/v1/gonum/mat"
)

type GetQRRequest struct {
	Matrix [][]float64 `json:"matrix"`
}

func main() {
	app := fiber.New()

	app.Post("/api/qr", func(c *fiber.Ctx) error {
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

    // send request to nodejs api
    payload, err := json.Marshal(fiber.Map{
			"Q": matrixToSlice(&Q),
			"R": matrixToSlice(&R),
		})

    resp, err := http.Post(
			"http://api-node:3005/api/statistics",
			"application/json",
			bytes.NewBuffer(payload),
		)

		if err != nil {
			return c.Status(500).JSON(fiber.Map{
        "error": "failed to call node api",
      })
		}
    defer resp.Body.Close()


    var stats map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&stats)

    return c.JSON(fiber.Map{
			"Q": matrixToSlice(&Q),
			"R": matrixToSlice(&R),
			"statistics": stats,
    })
	})
	

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "go API is running!"})
	})

	log.Fatal(app.Listen(":8080"))
}

func matrixToSlice(m *mat.Dense) [][]float64 {

	rows, cols := m.Dims()

	result := make([][]float64, rows)

	for i := 0; i < rows; i++ {

		result[i] = make([]float64, cols)

		for j := 0; j < cols; j++ {
			result[i][j] = m.At(i, j)
		}
	}

	return result
}