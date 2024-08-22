import express, { response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

dotenv.config();

const app = express();

app.use(express.json());

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5555;

