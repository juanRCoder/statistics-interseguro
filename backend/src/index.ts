import 'dotenv/config';
import express, { Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_req, res: Response) => {
  res.json({ message: 'API is running' });
});

// // Users -tests
// app.get('/users', async (_req, res: Response) => {
//   const users = await prisma.user.findMany({
//     select: {
//       id: true,
//       name: true,
//       email: true,
//     },
//   });
//   res.status(200).json(users);
// });

// app.post('/register', async (req, res: Response) => {
//   const { name, email, password } = req.body;
//   const newUser = await prisma.user.create({
//     data: {
//       name,
//       email,
//       password,
//     },
//   });

//   res
//     .status(201)
//     .json({ message: 'User registered successfully', user: newUser });
// });

app.listen(PORT, () => {
  console.log(`API is running on: http://localhost:${PORT}`);
});
