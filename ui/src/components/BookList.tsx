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
    <div className="flex flex-col h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-4 bg-gray-800 text-white">
        Seznam knih
      </h1>
      <div className="flex-grow overflow-y-scroll">
        <table className="w-full table-auto border-collapse bg-white shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 border">Název</th>
              <th className="p-4 border">Autor</th>
              <th className="p-4 border">Rok</th>
              <th className="p-4 border">Dostupnost</th>
              <th className="p-4 border">Akce</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr
                key={book.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
              >
                <td className="p-4 border">{book.title}</td>
                <td className="p-4 border">{book.author}</td>
                <td className="p-4 border">{book.year}</td>
                <td className="p-4 border">
                  {book.available ? "Ano" : "Ne"}
                </td>
                <td className="p-4 border">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-4"
                    onClick={() => onEdit(book)}
                  >
                    Upravit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteBook(book.id)}
                  >
                    Odstranit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
