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
    <div className="homepage-container">
      <BookForm onFormSubmit={triggerRefresh} bookToEdit={bookToEdit} />
      <div className="book-list-container">
        <BookList refresh={refresh} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default HomePage;
