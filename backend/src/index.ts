import 'dotenv/config';
import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

app.get('/', (_req, res: Response) => {
  res.json({ message: 'node API is running!' });
});

app.post('/api/statistics', (req: Request, res: Response) => {
  const { Q, R } = req.body as { Q: number[][]; R: number[][] };

  if (!Q || !R) {
    return res.status(400).json({ error: 'Missing Q or R' });
  }

  if (Q.length === 0 || R.length === 0) {
    return res.status(400).json({ error: 'Q and R cannot be empty' });
  }

  const allValues = [...Q.flat(), ...R.flat()];

  const max = Math.max(...allValues);
  const min = Math.min(...allValues);
  const sum = allValues.reduce((acc, val) => acc + val, 0);
  const avg = sum / allValues.length;

  const isDiagonal = (matrix: number[][]) =>
    matrix.every((row, i) =>
      row.every((val, j) => i === j || Math.abs(val) < 1e-10)
    );

  res.json({
    max: parseFloat(max.toFixed(2)),
    min: parseFloat(min.toFixed(2)),
    sum: parseFloat(sum.toFixed(2)),
    avg: parseFloat(avg.toFixed(2)),
    isDiagonalQ: isDiagonal(Q),
    isDiagonalR: isDiagonal(R),
  });
});

app.listen(PORT, () => {
  console.log(`API is running on: http://localhost:${PORT}`);
});
