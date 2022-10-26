import dotenv from "dotenv";
import express from "express";

dotenv.config();

const port = 8080;
const app = express();

app.use(express.json());

app.listen(port, () => console.log(`Server running at PORT ${port}`));
