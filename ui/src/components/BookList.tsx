import { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "../../../src/Model1/book";

interface BookListProps {
  refresh: boolean;
  onEdit: (book: Book) => void;
}

const BookList = ({ refresh, onEdit }: BookListProps) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/books").then((res) => setBooks(res.data));
  }, [refresh]);

  const deleteBook = (id: number) => {
    axios.delete(`http://localhost:3000/api/books/${id}`).then(() => {
      alert("Kniha byla úspěšně odstraněna!");
      setBooks(books.filter((book) => book.id !== id));
    });
  };

  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>Název</th>
          <th>Autor</th>
          <th>Rok</th>
          <th>Dostupnost</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td>{book.available ? "Ano" : "Ne"}</td>
            <td>
              <button
                className="edit-button"
                onClick={() => onEdit(book)}
              >
                Upravit
              </button>
              <button
                className="delete-button"
                onClick={() => deleteBook(book.id)}
              >
                Odstranit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
