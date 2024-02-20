import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import { serve, setup } from "swagger-ui-express";

dotenv.config();

import spec from "./swagger.json" assert { type: "json" };
import userRoutes from "./src/routes/index.js";
import './src/models/index.js'

const app = express();
const PORT = process.env.PORT || 3000;

const options = {
  apis: [`./src/routes/*.js`],
};

app.use(bodyParser.json());
app.use('/swagger', serve, setup(spec, options));

app.get('/', (req, res) => {
  res.send(`Server is running on http://localhost:${PORT}`);
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
