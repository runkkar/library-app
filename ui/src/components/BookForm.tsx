import React, { useState, useEffect } from "react";
import axios from "axios";
import { Book } from "../../../src/models/book";

interface BookFormProps {
  onFormSubmit: () => void;
  bookToEdit?: Book | null;
}

const BookForm = ({ onFormSubmit, bookToEdit }: BookFormProps) => {
  const [form, setForm] = useState<{
    id: number | null;
    title: string;
    author: string;
    year: string;
    available: boolean;
  }>({
    id: null,
    title: "",
    author: "",
    year: "",
    available: false,
  });

  useEffect(() => {
    if (bookToEdit) {
      setForm({
        id: bookToEdit.id,
        title: bookToEdit.title,
        author: bookToEdit.author,
        year: bookToEdit.year.toString(),
        available: bookToEdit.available,
      });
    }
  }, [bookToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      title: form.title,
      author: form.author,
      year: parseInt(form.year, 10),
      available: form.available,
    };

    if (form.id) {
      axios
        .put(`http://localhost:3000/api/books/${form.id}`, dataToSend)
        .then(() => {
          alert("Kniha byla úspěšně aktualizována!");
          setForm({ id: null, title: "", author: "", year: "", available: false });
          onFormSubmit();
        })
        .catch((err) => {
          console.error(err.response?.data || "Chyba při aktualizaci knihy");
          alert(err.response?.data?.message || "Nepodařilo se aktualizovat knihu");
        });
    } else {
      axios
        .post("http://localhost:3000/api/books", dataToSend)
        .then(() => {
          alert("Kniha byla úspěšně přidána!");
          setForm({ id: null, title: "", author: "", year: "", available: false });
          onFormSubmit();
        })
        .catch((err) => {
          console.error(err.response?.data || "Chyba při přidávání knihy");
          alert(err.response?.data?.message || "Nepodařilo se přidat knihu");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>{form.id ? "Upravit Knihu" : "Přidat Knihu"}</h2>
      <div className="input-group">
        <label>Název</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <label>Autor</label>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <label>Rok</label>
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <label>
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
          Dostupná
        </label>
      </div>
      <button type="submit">
        {form.id ? "Aktualizovat Knihu" : "Přidat Knihu"}
      </button>
    </form>
  );
};

export default BookForm;
