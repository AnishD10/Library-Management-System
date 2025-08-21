import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

export default function Record() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ bookId: "", borrowerId: "", status: "issue", _id: null });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/records`, { params: { search } });
      setRecords(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch records");
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
        await axios.put(`${API_URL}/api/records/${form._id}`, form);
      } else {
        await axios.post(`${API_URL}/api/records`, form);
      }
      setForm({ bookId: "", borrowerId: "", status: "issue", _id: null });
      setEditing(false);
      fetchRecords();
      setError("");
    } catch (err) {
      setError("Failed to save record");
    }
    setLoading(false);
  };

  const handleEdit = (record) => {
    setForm(record);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/api/records/${id}`);
      fetchRecords();
      setError("");
    } catch (err) {
      setError("Failed to delete record");
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(fetchRecords, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="p-4 text-gray-800 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Record Management</h1>
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search records..."
          value={search}
          onChange={handleSearch}
          className="border px-2 py-1 rounded w-64"
        />
        {loading && <span className="text-xs text-gray-500">Loading...</span>}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2 flex-wrap items-end">
        <input
          name="bookId"
          value={form.bookId}
          onChange={handleChange}
          placeholder="Book ID"
          className="border px-2 py-1 rounded"
          required
        />
        <input
          name="borrowerId"
          value={form.borrowerId}
          onChange={handleChange}
          placeholder="Borrower ID"
          className="border px-2 py-1 rounded"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border px-2 py-1 rounded"
        >
          <option value="issue">Issue</option>
          <option value="return">Return</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          {editing ? "Update" : "Add"} Record
        </button>
        {editing && (
          <button
            type="button"
            className="bg-gray-400 text-white px-3 py-1 rounded"
            onClick={() => {
              setForm({ bookId: "", borrowerId: "", status: "issue", _id: null });
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
              <th className="py-2 px-4 border-b">Book ID</th>
              <th className="py-2 px-4 border-b">Book Title</th>
              <th className="py-2 px-4 border-b">Borrower ID</th>
              <th className="py-2 px-4 border-b">Borrower Name</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id}>
                <td className="py-2 px-4 border-b">{
                  record.bookId && typeof record.bookId === 'object'
                    ? record.bookId._id || 'N/A'
                    : record.bookId || 'N/A'
                }</td>
                <td className="py-2 px-4 border-b">{
                  record.bookId && typeof record.bookId === 'object'
                    ? record.bookId.title || 'N/A'
                    : 'N/A'
                }</td>
                <td className="py-2 px-4 border-b">{
                  record.borrowerId && typeof record.borrowerId === 'object'
                    ? record.borrowerId._id || 'N/A'
                    : record.borrowerId || 'N/A'
                }</td>
                <td className="py-2 px-4 border-b">{
                  record.borrowerId && typeof record.borrowerId === 'object'
                    ? record.borrowerId.name || 'N/A'
                    : 'N/A'
                }</td>
                <td className="py-2 px-4 border-b">{record.status}</td>
                <td className="py-2 px-4 border-b flex gap-2">
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
