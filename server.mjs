import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";

dotenv.config();

import { userRouter, customerRouter, medicineRouter } from "./src/routes/index.js";
import './src/models/index.js'

const app = express();
const PORT = process.env.PORT || 3000;

const options = {
  apis: [`./src/routes/*.js`],
};

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`Server is running on http://localhost:${PORT}`);
});

app.use('/api/users', userRouter);
app.use('/api/customers', customerRouter);
app.use('/api/medicines', medicineRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
