import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

export default function Borrower() {
  const [borrowers, setBorrowers] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", _id: null });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBorrowers();
  }, []);

  const fetchBorrowers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/borrowers`, { params: { search } });
      setBorrowers(res.data);
      setError("");
    } catch {
      setError("Failed to fetch borrowers");
    }
    setLoading(false);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await axios.put(`${API_URL}/api/borrowers/${form._id}`, form);
      } else {
        await axios.post(`${API_URL}/api/borrowers`, form);
      }
      setForm({ name: "", email: "", phone: "", address: "", _id: null });
      setEditing(false);
      setShowModal(false);
      fetchBorrowers();
      setError("");
    } catch {
      setError("Failed to save borrower");
    }
    setLoading(false);
  };

  const handleEdit = (borrower) => {
    setForm(borrower);
    setEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this borrower?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/api/borrowers/${id}`);
      fetchBorrowers();
      setError("");
    } catch {
      setError("Failed to delete borrower");
    }
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(fetchBorrowers, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [search]);

  const filteredBorrowers = borrowers.filter(
    (b) => b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 text-gray-800 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Borrower Management</h1>
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search by name"
          className="px-4 py-2 rounded bg-[#181818] text-white border border-gray-600 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setForm({ name: "", email: "", phone: "", address: "", _id: null });
            setEditing(false);
            setShowModal(true);
          }}
        >
          Add Borrower
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
            <h2 className="text-xl font-bold mb-4 text-white">{editing ? "Edit Borrower" : "Add Borrower"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="border px-2 py-1 rounded bg-[#232323] text-white"
                required
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="border px-2 py-1 rounded bg-[#232323] text-white"
                required
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border px-2 py-1 rounded bg-[#232323] text-white"
                required
              />
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="border px-2 py-1 rounded bg-[#232323] text-white"
                required
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
                  {editing ? "Update" : "Add"} Borrower
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setForm({ name: "", email: "", phone: "", address: "", _id: null });
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
              <th className="py-3 px-4 border-b text-center align-middle">Name</th>
              <th className="py-3 px-4 border-b text-center align-middle">Email</th>
              <th className="py-3 px-4 border-b text-center align-middle">Phone</th>
              <th className="py-3 px-4 border-b text-center align-middle">Address</th>
              <th className="py-3 px-4 border-b text-center align-middle">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBorrowers.map((borrower) => (
              <tr key={borrower._id}>
                <td className="py-3 px-4 border-b text-center align-middle">{borrower.name}</td>
                <td className="py-3 px-4 border-b text-center align-middle">{borrower.email}</td>
                <td className="py-3 px-4 border-b text-center align-middle">{borrower.phone}</td>
                <td className="py-3 px-4 border-b text-center align-middle">{borrower.address}</td>
                <td className="py-3 px-4 border-b flex justify-center items-center gap-2 align-middle">
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