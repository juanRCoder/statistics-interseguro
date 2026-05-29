export interface QRStatistics {
  max: number;
  min: number;
  avg: number;
  sum: number;
  isDiagonalQ: boolean;
  isDiagonalR: boolean;
}

export interface QRResult {
  original: number[][];
  matrixRotated: number[][];
  Q: number[][];
  R: number[][];
  statistics: QRStatistics;
}

export const formatVal = (v: number): number => parseFloat(v.toFixed(4));

/**
 * Genera una matriz de `rows × cols` preservando los valores existentes
 * de la matriz anterior y rellenando con 0 las celdas nuevas.
 */
export const resizeMatrix = (
  prev: number[][],
  rows: number,
  cols: number
): number[][] =>
  Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => prev[i]?.[j] ?? 0)
  );
