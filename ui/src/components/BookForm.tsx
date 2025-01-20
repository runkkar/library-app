import React, { useState, useEffect } from "react";
import axios from "axios";
import { Book } from "../../../src/Model1/book";

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
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-gray-100 p-6 rounded-md shadow-md border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
        {form.id ? "Upravit Knihu" : "Přidat Knihu"}
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Název</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Autor</label>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Rok</label>
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="available"
          checked={form.available}
          onChange={handleChange}
          className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label className="ml-2 text-sm font-medium text-gray-700">Dostupná</label>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 rounded-md focus:ring-2 focus:outline-none"
      >
        {form.id ? "Aktualizovat Knihu" : "Přidat Knihu"}
      </button>
    </form>
  );
};

export default BookForm;
