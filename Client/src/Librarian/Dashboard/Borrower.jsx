
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

export default function Borrower() {
  const [borrowers, setBorrowers] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", _id: null });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBorrowers();
  }, []);

  const fetchBorrowers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/borrowers`, { params: { search } });
      setBorrowers(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch borrowers");
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
        await axios.put(`${API_URL}/api/borrowers/${form._id}`, form);
      } else {
        await axios.post(`${API_URL}/api/borrowers`, form);
      }
      setForm({ name: "", email: "", phone: "", _id: null });
      setEditing(false);
      fetchBorrowers();
      setError("");
    } catch (err) {
      setError("Failed to save borrower");
    }
    setLoading(false);
  };

  const handleEdit = (borrower) => {
    setForm(borrower);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this borrower?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/api/borrowers/${id}`);
      fetchBorrowers();
      setError("");
    } catch (err) {
      setError("Failed to delete borrower");
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(fetchBorrowers, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="p-4 text-gray-800 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Borrower Management</h1>
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search borrowers..."
          value={search}
          onChange={handleSearch}
          className="border px-2 py-1 rounded w-64"
        />
        {loading && <span className="text-xs text-gray-500">Loading...</span>}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2 flex-wrap items-end">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border px-2 py-1 rounded"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border px-2 py-1 rounded"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          {editing ? "Update" : "Add"} Borrower
        </button>
        {editing && (
          <button
            type="button"
            className="bg-gray-400 text-white px-3 py-1 rounded"
            onClick={() => {
              setForm({ name: "", email: "", phone: "", _id: null });
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
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrowers.map((borrower) => (
              <tr key={borrower._id}>
                <td className="py-2 px-4 border-b">{borrower.name}</td>
                <td className="py-2 px-4 border-b">{borrower.email}</td>
                <td className="py-2 px-4 border-b">{borrower.phone}</td>
                <td className="py-2 px-4 border-b flex gap-2">
                  <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(borrower)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(borrower._id)}
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