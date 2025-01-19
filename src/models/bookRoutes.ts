import { Router } from "express";
import {
  getBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBook,
} from "./bookController";

const router = Router();

router.get("/books", getBooks);
router.post("/books", addBook);
router.get("/books/:id", getBookById);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

export default router;