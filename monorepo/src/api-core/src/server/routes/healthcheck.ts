import express from 'express';

const app = express.Router();

app.get('/', (req, res) => res.status(200).json({ message: 'ok' }));

export default app;
