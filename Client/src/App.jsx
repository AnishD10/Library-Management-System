import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    available: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/users/login', form, {
        headers: {
          'Content-Type': 'application/json'
        }
      }); 

      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  }

  const fetchBookDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/books/${id}`);
      console.log(response.data);
      
      // Update state with book details
      setBookDetails({
        title: response.data.title,
        author: response.data.author,
        available: response.data.available
      });
    } catch (error) {
      console.error('Error fetching book details:', error);
      setMessage('Error fetching book details');
    }
  }

  // Fetch book details when component mounts
  useEffect(() => {
    fetchBookDetails("68790c15eccc3d2f8b6f3cf3");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Library Management System
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start max-w-6xl mx-auto">
        {/* Login Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
            Login Borrower
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email:
              </label>
              <input 
                type="text" 
                id="email" 
                name="email" 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password:
              </label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                placeholder="Enter your password"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium shadow-md hover:shadow-lg"
            >
              Login
            </button>
            
            {message && (
              <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-sm text-blue-700 text-center font-medium">
                  {message}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Dashboard Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
            Borrower Dashboard
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-500 shadow-sm">
              <span className="block text-sm font-medium text-gray-600 mb-1">Book Title:</span>
              <span className="text-lg text-gray-800 font-semibold">
                {bookDetails.title || 'Loading...'}
              </span>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-l-4 border-green-500 shadow-sm">
              <span className="block text-sm font-medium text-gray-600 mb-1">Author:</span>
              <span className="text-lg text-gray-800 font-semibold">
                {bookDetails.author || 'Loading...'}
              </span>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border-l-4 border-yellow-500 shadow-sm">
              <span className="block text-sm font-medium text-gray-600 mb-1">Available:</span>
              <span className="text-lg font-bold text-gray-800">
                {bookDetails.available}
              </span>
            </div>
          </div>

          <button 
            type='button' 
            onClick={() => fetchBookDetails("68790c15eccc3d2f8b6f3cf3")}
            className="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 font-medium shadow-md hover:shadow-lg"
          >
            Refresh Book Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
