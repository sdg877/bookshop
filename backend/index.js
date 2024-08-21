// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { PORT } from "./config.js";
// import { Book } from './models/bookModel.js';

// const app = express();
// dotenv.config();

// const DATABASE_URL = process.env.DATABASE_URL;
// console.log("Database URL:", DATABASE_URL);

// app.get("/", (request, response) => {
//   console.log(request);
//   return response.status(200).send("Welcome to MERN stack");
// });

// app.post('/books', async (request, response) => {
//     try {
//         if (
//             !request.body.title ||
//             !request.body.author ||
//             !request.body.publishYear
//         ) {
//             return response.status(400).send({
//                 message: 'Send all required fields',
//             });
//         }
//         const newBook = {
//             title: request.body.title,
//             author: request.body.author,
//             publishYear: request.body.publishYear,
//         };
//         const book = await Book.create(newBook);

//         return response.status(201).send(book);
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message })
//     }
// });

// app.listen(PORT, () => {
//   console.log(`App is listening on port: ${PORT}`);
// });

// mongoose
//   .connect(DATABASE_URL)
//   .then(() => {
//     console.log("App connected to database");
//     app.listen(PORT, () => {
//         console.log(`App is listening on port: ${PORT}`);
//       });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

import express, { response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

dotenv.config();

const app = express();

app.use(express.json());

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5555;

console.log("Database URL:", DATABASE_URL);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to MERN stack");
});

app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields",
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
    response.status(500).send({ message: error.message });
  }
});

app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required feilds: title, author, publish year'
      })
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found! '})
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
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
