
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", form);
      if (response.status === 200) {
        // Save token to localStorage
        const { token ,role  } = response.data;
        localStorage.setItem("token", token);
        // Optionally, save user role or other info if needed
        if (role === 'librarian') {
          window.location.href = "/librarian"; // Redirect to librarian home page
        } else if (role === 'borrower') {
          window.location.href = "/borrower"; // Redirect to borrower home page
        } else {
          alert("Unknown role, redirecting to borrower home.");
          window.location.href = "/"; // Default to borrower home
        }
        alert("Login successful");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } 
    }
  };

  return (
    <form
      className="flex flex-col gap-6 w-full max-w-md bg-white/10 border border-white/30 rounded-lg p-8 shadow-lg backdrop-blur-sm"
      onSubmit={handleSubmit}
    >
      <div className="relative">
        <input
          type="email"
          name="email"
          className="border-b border-white/50 w-full py-2 bg-transparent text-white focus:outline-none focus:border-red-500 focus:border-b-2 transition-colors peer placeholder-transparent"
          autoComplete="off"
          onChange={handleChange}
        />
        <label
          htmlFor="email"
          className="absolute left-0 top-2 text-white/80 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-red-400 transition-all pointer-events-none"
        >
          Email
        </label>
      </div>
      <div className="relative">
        <input
          type="password"
          name="password"
          className="border-b border-white/50 w-full py-2 bg-transparent text-white focus:outline-none focus:border-red-500 focus:border-b-2 transition-colors peer placeholder-transparent"
          autoComplete="off"
          onChange={handleChange}
        />
        <label
          htmlFor="password"
          className="absolute left-0 top-2 text-white/80 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-red-400 transition-all pointer-events-none"
        >
          Password
        </label>
      </div>
      <button
        type="submit"
        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition-colors"
      >
        Login
      </button>
    </form>
  );
};

export default Login;