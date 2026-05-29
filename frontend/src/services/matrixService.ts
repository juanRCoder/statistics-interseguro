import type { QRResult } from '../utils/matrixUtils';

const API_BASE = import.meta.env.VITE_API_URL;

/**
 * Envía una matriz a la API Go y retorna el resultado de la factorización QR,
 * la rotación y las estadísticas.
 *
 * @throws {Error} Si la respuesta HTTP no es exitosa o hay un error de red.
 */
export async function computeQR(matrix: number[][]): Promise<QRResult> {
  const res = await fetch(`${API_BASE}/api/qr`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ matrix }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error((data as { error?: string }).error ?? 'API error');
  }

  return data as QRResult;
}
