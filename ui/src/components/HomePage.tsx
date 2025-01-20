import { useState } from "react";
import BookList from "./BookList";
import BookForm from "./BookForm";
import { Book } from "../../../src/Model1/book";

const HomePage = () => {
  const [refresh, setRefresh] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  const triggerRefresh = () => setRefresh(!refresh);

  const handleEdit = (book: Book) => {
    setBookToEdit(book);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
        Správa Knih
      </h1>
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-300">
        <BookForm onFormSubmit={triggerRefresh} bookToEdit={bookToEdit} />
      </div>
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <BookList refresh={refresh} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default HomePage;
