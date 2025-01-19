import { Request, Response } from "express";
import { Book } from "../models/book";

let books: Book[] = [];
let idCounter = 1;

export const getBooks = (req: Request, res: Response) => {
  const { author, page, limit } = req.query;

  let filteredBooks = books;

  if (author) {
    filteredBooks = books.filter((book) => book.author === author);
  }

  if (page && limit) {
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const start = (pageNum - 1) * limitNum;
    const end = start + limitNum;
    filteredBooks = filteredBooks.slice(start, end);
  }

  res.json(filteredBooks);
};

export const addBook = (req: Request, res: Response) => {
  const { title, author, year, available } = req.body;

  if (!title || !author || typeof year !== "number" || typeof available !== "boolean") {
    return res.status(400).json({ message: "Invalid data" });
  }

  const newBook: Book = { id: idCounter++, title, author, year, available };
  books.push(newBook);
  res.status(201).json(newBook);
};

export const getBookById = (req: Request, res: Response) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
};

export const updateBook = (req: Request, res: Response) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const { title, author, year, available } = req.body;
  if (!title || !author || typeof year !== "number" || typeof available !== "boolean") {
    return res.status(400).json({ message: "Invalid data" });
  }

  book.title = title;
  book.author = author;
  book.year = year;
  book.available = available;

  res.json(book);
};

export const deleteBook = (req: Request, res: Response) => {
  books = books.filter((b) => b.id !== parseInt(req.params.id));
  res.status(204).send();
};
