import express from "express";
import dotenv from "dotenv";
import { PORT } from "./config.js";
import { Book } from './models/bookModel.js';

const app = express();
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
console.log("Database URL:", DATABASE_URL);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to MERN stack");
});

app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
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
