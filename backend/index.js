import express from "express";
import dotenv from "dotenv";
import { PORT } from "./config.js";

const app = express();
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
console.log("Database URL:", DATABASE_URL);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to MERN stack");
});

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
        console.log(`App is listening on port: ${PORT}`);
      });
  })
  .catch((error) => {
    console.log(error);
  });
