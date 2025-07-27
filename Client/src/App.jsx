import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info'); // 'success', 'error', 'info'
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    available: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/users/login', form, {
        headers: {
          'Content-Type': 'application/json'
        }
      }); 

      setMessage(res.data.message);
      setMessageType('success');
      setIsLoggedIn(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  }

  const fetchBookDetails = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/books/${id}`);
      console.log(response.data);
      
      setBookDetails({
        title: response.data.title,
        author: response.data.author,
        available: response.data.available
      });
      setMessage('Book details refreshed successfully!');
      setMessageType('success');
    } catch (error) {
      console.error('Error fetching book details:', error);
      setMessage('Error fetching book details');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchBookDetails("68790c15eccc3d2f8b6f3cf3");
  }, []);

  const getMessageStyles = () => {
    switch (messageType) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  Library Management System
                </h1>
                <p className="text-sm text-gray-500">Manage your books efficiently</p>
              </div>
            </div>
            
            {isLoggedIn && (
              <div className="flex items-center px-4 py-2 space-x-2 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-800">Logged In</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Login Section */}
          <div className="overflow-hidden bg-white border border-gray-100 shadow-xl rounded-2xl">
            <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600">
              <h2 className="flex items-center space-x-2 text-2xl font-bold text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Borrower Login</span>
              </h2>
              <p className="mt-1 text-sm text-blue-100">Sign in to access your library account</p>
            </div>
            
            <div className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={form.email}
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 placeholder-gray-400 transition duration-200 border border-gray-300 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      value={form.password}
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 placeholder-gray-400 transition duration-200 border border-gray-300 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your password"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-white transition duration-200 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Dashboard Section */}
          <div className="overflow-hidden bg-white border border-gray-100 shadow-xl rounded-2xl">
            <div className="px-8 py-6 bg-gradient-to-r from-green-600 to-blue-600">
              <h2 className="flex items-center space-x-2 text-2xl font-bold text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Book Dashboard</span>
              </h2>
              <p className="mt-1 text-sm text-green-100">View and manage book information</p>
            </div>
            
            <div className="p-8">
              <div className="space-y-6">
                <div className="p-6 transition duration-200 border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2 space-x-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="text-sm font-semibold text-blue-700">Book Title</span>
                      </div>
                      <p className="text-lg font-bold text-gray-800">{bookDetails.title || 'Loading...'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 transition duration-200 border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2 space-x-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm font-semibold text-green-700">Author</span>
                      </div>
                      <p className="text-lg font-bold text-gray-800">{bookDetails.author || 'Loading...'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 transition duration-200 border border-orange-100 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2 space-x-2">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                        <span className="text-sm font-semibold text-orange-700">Available Copies</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">{bookDetails.available}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      bookDetails.available > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {bookDetails.available > 0 ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type='button' 
                onClick={() => fetchBookDetails("68790c15eccc3d2f8b6f3cf3")}
                disabled={isLoading}
                className="flex items-center justify-center w-full px-6 py-3 mt-8 space-x-2 font-semibold text-white transition duration-200 shadow-lg bg-gradient-to-r from-green-600 to-blue-600 rounded-xl hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    <span>Refreshing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Refresh Book Details</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className="max-w-2xl mx-auto mt-8">
            <div className={`p-4 rounded-xl border ${getMessageStyles()} shadow-sm`}>
              <div className="flex items-center space-x-3">
                {messageType === 'success' && (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {messageType === 'error' && (
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <p className="font-medium">{message}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
