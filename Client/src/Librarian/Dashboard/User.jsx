
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

export default function User() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ username: "", email: "", role: "", _id: null });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/users`, { params: { search } });
      setUsers(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch users");
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
        await axios.put(`${API_URL}/api/users/${form._id}`, form);
      } else {
        await axios.post(`${API_URL}/api/users`, form);
      }
      setForm({ username: "", email: "", role: "", _id: null });
      setEditing(false);
      fetchUsers();
      setError("");
    } catch (err) {
      setError("Failed to save user");
    }
    setLoading(false);
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/api/users/${id}`);
      fetchUsers();
      setError("");
    } catch (err) {
      setError("Failed to delete user");
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(fetchUsers, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="p-4 text-gray-800 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={handleSearch}
          className="border px-2 py-1 rounded w-64"
        />
        {loading && <span className="text-xs text-gray-500">Loading...</span>}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2 flex-wrap items-end">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
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
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role (admin/user)"
          className="border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          {editing ? "Update" : "Add"} User
        </button>
        {editing && (
          <button
            type="button"
            className="bg-gray-400 text-white px-3 py-1 rounded"
            onClick={() => {
              setForm({ username: "", email: "", role: "", _id: null });
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
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b flex gap-2">
                  <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(user._id)}
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