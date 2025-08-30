import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://library-management-system-ylrf.onrender.com";

export default function Record() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    bookId: "",
    borrowerId: "",
    status: "issue",
    _id: null,
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [borrowers, setBorrowers] = useState([]);

  useEffect(() => {
    fetchRecords();
    fetchBooks();
    fetchBorrowers();
    // eslint-disable-next-line
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/records`, { params: { search } });
      setRecords(res.data);
      setError("");
    } catch {
      setError("Failed to fetch records");
    }
    setLoading(false);
  };

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/books`);
      setBooks(res.data);
    } catch {}
  };

  const fetchBorrowers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/borrowers`);
      setBorrowers(res.data);
    } catch {}
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await axios.put(`${API_URL}/api/records/${form._id}`, form);
      } else {
        await axios.post(`${API_URL}/api/records`, form);
      }
      setForm({ bookId: "", borrowerId: "", status: "issue", _id: null });
      setEditing(false);
      setShowModal(false);
      fetchRecords();
      setError("");
    } catch {
      setError("Failed to save record");
    }
    setLoading(false);
  };

  const handleEdit = (record) => {
    setForm({
      bookId: record.bookId?._id || record.bookId,
      borrowerId: record.borrowerId?._id || record.borrowerId,
      status: record.status,
      _id: record._id,
    });
    setEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/api/records/${id}`);
      fetchRecords();
      setError("");
    } catch {
      setError("Failed to delete record");
    }
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(fetchRecords, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [search]);

  const filteredRecords = records.filter(
    (r) =>
      (r.bookId?.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (r.borrowerId?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 text-gray-800 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Record Management</h1>
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search by book or borrower"
          className="px-4 py-2 rounded bg-[#181818] text-white border border-gray-600 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setForm({ bookId: "", borrowerId: "", status: "issue", _id: null });
            setEditing(false);
            setShowModal(true);
          }}
        >
          Add Record
        </button>
        {loading && <span className="text-xs text-gray-500">Loading...</span>}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-[#181818] rounded-lg shadow-lg p-8 w-full max-w-2xl relative pointer-events-auto">
            <button
              className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-white"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-white">{editing ? "Edit Record" : "Add Record"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <select
                name="bookId"
                value={form.bookId}
                onChange={handleChange}
                className="border px-2 py-1 rounded bg-[#232323] text-white"
                required
              >
                <option value="">Select Book</option>
                {books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.title}
                  </option>
                ))}
              </select>
              <select
                name="borrowerId"
                value={form.borrowerId}
                onChange={handleChange}
                className="border px-2 py-1 rounded bg-[#232323] text-white"
                required
              >
                <option value="">Select Borrower</option>
                {borrowers.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border px-2 py-1 rounded bg-[#232323] text-white"
                required
              >
                <option value="issue">Issue</option>
                <option value="return">Return</option>
              </select>
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
                  {editing ? "Update" : "Add"} Record
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setForm({ bookId: "", borrowerId: "", status: "issue", _id: null });
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
              <th className="py-3 px-4 border-b text-center align-middle">Book Title</th>
              <th className="py-3 px-4 border-b text-center align-middle">Borrower Name</th>
              <th className="py-3 px-4 border-b text-center align-middle">Status</th>
              <th className="py-3 px-4 border-b text-center align-middle">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record._id}>
                <td className="py-3 px-4 border-b text-center align-middle">
                  {record.bookId?.title || "N/A"}
                </td>
                <td className="py-3 px-4 border-b text-center align-middle">
                  {record.borrowerId?.name || "N/A"}
                </td>
                <td className="py-3 px-4 border-b text-center align-middle">
                  {record.status}
                </td>
                <td className="py-3 px-4 border-b flex justify-center items-center gap-2 align-middle">
                  <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(record)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(record._id)}
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
