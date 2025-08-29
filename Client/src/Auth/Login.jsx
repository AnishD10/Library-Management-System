import React, { useState, useRef } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:3000";

export default function Auth() {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '', address: '', password: '' });
  const [message, setMessage] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(''); // <-- Add info state
  const containerRef = useRef();

  const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) => setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    try {
      const res = await axios.post(`${API_URL}/api/users/login`, loginForm);
      localStorage.setItem("token", res.data.token);
      setSuccess(true);
      setMessage("Login successful!");
      setTimeout(() => {
        window.location.href = res.data.role === "librarian" ? "/librarian" : "/borrower";
      }, 1200);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    try {
      await axios.post(`${API_URL}/api/borrowers`, registerForm);
      setSuccess(true);
      setInfo("Your login credentials are sent to your email.");
      setIsRegister(false); // Switch to login form
      setMessage('');
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-black"
    >
      <div className="w-full max-w-2xl bg-[#181818] rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Register */}
        <div className={`flex-1 p-8 ${isRegister ? "" : "hidden md:block"}`}>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              name="name"
              placeholder="Name"
              value={registerForm.name}
              onChange={handleRegisterChange}
              className="px-4 py-2 rounded bg-[#232323] text-white border border-gray-600"
              required
            />
            <input
              name="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={handleRegisterChange}
              className="px-4 py-2 rounded bg-[#232323] text-white border border-gray-600"
              required
            />
            <input
              name="phone"
              placeholder="Phone"
              value={registerForm.phone}
              onChange={handleRegisterChange}
              className="px-4 py-2 rounded bg-[#232323] text-white border border-gray-600"
              required
            />
            <input
              name="address"
              placeholder="Address"
              value={registerForm.address}
              onChange={handleRegisterChange}
              className="px-4 py-2 rounded bg-[#232323] text-white border border-gray-600"
              required
            />
            <button
              type="submit"
              className="bg-[#DC143C] hover:bg-[#a10e2a] text-white font-semibold py-2 rounded"
            >
              Register
            </button>
            <p className="text-gray-400 text-sm text-center">
              Already have an account?{" "}
              <span
                className="text-[#DC143C] cursor-pointer"
                onClick={() => setIsRegister(false)}
              >
                Login
              </span>
            </p>
            {isRegister && message && (
              <p className={`text-center ${success ? "text-green-400" : "text-red-400"}`}>{message}</p>
            )}
          </form>
        </div>
        {/* Login */}
        <div className={`flex-1 p-8 ${isRegister ? "hidden md:block" : ""}`}>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              name="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={handleLoginChange}
              className="px-4 py-2 rounded bg-[#232323] text-white border border-gray-600"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              className="px-4 py-2 rounded bg-[#232323] text-white border border-gray-600"
              required
            />
            <button
              type="submit"
              className="bg-[#DC143C] hover:bg-[#a10e2a] text-white font-semibold py-2 rounded"
            >
              Login
            </button>
            <p className="text-gray-400 text-sm text-center">
              Don't have an account?{" "}
              <span
                className="text-[#DC143C] cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Register
              </span>
            </p>
            {info && (
              <p className="text-center text-green-400">{info}</p>
            )}
            {!isRegister && message && (
              <p className={`text-center ${success ? "text-green-400" : "text-red-400"}`}>{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}