package utils

import "gonum.org/v1/gonum/mat"

func MatrixToSlice(m *mat.Dense) [][]float64 {
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

func RotateMatrix90(matrix [][]float64) [][]float64 {
	rows := len(matrix)
	cols := len(matrix[0])

	rotated := make([][]float64, cols)
	for i := range rotated {
		rotated[i] = make([]float64, rows)
	}

	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			rotated[j][rows-1-i] = matrix[i][j]
		}
	}

	return rotated
}