
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000"; // Change if your backend runs elsewhere

export default function Book() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", author: "", isbn: "", _id: null });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch books
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/books`, { params: { search } });
      setBooks(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch books");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await axios.put(`${API_URL}/api/books/${form._id}`, form);
      } else {
        await axios.post(`${API_URL}/api/books`, form);
      }
      setForm({ title: "", author: "", isbn: "", _id: null });
      setEditing(false);
      fetchBooks();
      setError("");
    } catch (err) {
      setError("Failed to save book");
    }
    setLoading(false);
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/api/books/${id}`);
      fetchBooks();
      setError("");
    } catch (err) {
      setError("Failed to delete book");
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(fetchBooks, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [search]);

  return (
    <div className="p-4 text-gray-800 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Book Management</h1>
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={handleSearch}
          className="border px-2 py-1 rounded w-64"
        />
        {loading && <span className="text-xs text-gray-500">Loading...</span>}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2 flex-wrap items-end">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border px-2 py-1 rounded"
          required
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          className="border px-2 py-1 rounded"
          required
        />
        <input
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          className="border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          {editing ? "Update" : "Add"} Book
        </button>
        {editing && (
          <button
            type="button"
            className="bg-gray-400 text-white px-3 py-1 rounded"
            onClick={() => {
              setForm({ title: "", author: "", isbn: "", _id: null });
              setEditing(false);
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">ISBN</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td className="py-2 px-4 border-b">{book.title}</td>
                <td className="py-2 px-4 border-b">{book.author}</td>
                <td className="py-2 px-4 border-b">{book.isbn}</td>
                <td className="py-2 px-4 border-b flex gap-2">
                  <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}