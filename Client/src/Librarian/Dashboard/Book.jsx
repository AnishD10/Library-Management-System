import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

export default function Book() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", author: "", isbn: "", _id: null });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

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
      setShowModal(false);
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
    setShowModal(true);
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

  // Search functionality
  useEffect(() => {
    const timeout = setTimeout(fetchBooks, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [search]);

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 text-gray-800 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Book Management</h1>
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search by title or author"
          className="px-4 py-2 rounded bg-[#181818] text-white border border-gray-600 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setForm({ title: "", author: "", isbn: "", _id: null });
            setEditing(false);
            setShowModal(true);
          }}
        >
          Add Book
        </button>
        {loading && <span className="text-xs text-gray-500">Loading...</span>}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-[#181818] rounded-lg shadow-lg p-8 w-full max-w-2xl relative pointer-events-auto">
            <button
              className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-white"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-white">{editing ? "Edit Book" : "Add Book"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="border px-2 py-1 rounded bg-[#232323] text-white"
                required
              />
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Author"
                className="border px-2 py-1 rounded bg-[#232323] text-white"
                required
              />
              <input
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                placeholder="ISBN"
                className="border px-2 py-1 rounded bg-[#232323] text-white"
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
                  {editing ? "Update" : "Add"} Book
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setForm({ title: "", author: "", isbn: "", _id: null });
                    setEditing(false);
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-center align-middle">Title</th>
              <th className="py-3 px-4 border-b text-center align-middle">Author</th>
              <th className="py-3 px-4 border-b text-center align-middle">ISBN</th>
              <th className="py-3 px-4 border-b text-center align-middle">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book._id}>
                <td className="py-3 px-4 border-b text-center align-middle">{book.title}</td>
                <td className="py-3 px-4 border-b text-center align-middle">{book.author}</td>
                <td className="py-3 px-4 border-b text-center align-middle">{book.isbn}</td>
                <td className="py-3 px-4 border-b flex justify-center items-center gap-2 align-middle">
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