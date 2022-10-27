import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
require("dotenv").config();

const port = 8080;
const app = express();

app.use(express.json());

mongoose.connect(
  process.env.MONGO_URI || "",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  } as ConnectOptions,
  () => {
    console.log("Database connected");
  }
);

app.listen(port, () => console.log(`Server running at PORT ${port}`));
