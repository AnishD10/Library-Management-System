import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';


function App() {

  const [message, setMessage] = useState('');
  const [form , setForm] = useState({
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
    <div>
      <h1>Library Management System</h1>
      <div className='main-panel'>
      <div className='login'>
      <h2>Login Borrower</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" onChange={handleChange} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" onChange={handleChange} required />

        <button type="submit">Login</button>
        {message && <p className='message'>{message}</p>}
      </form>
      </div>
      <div className='dashboard'>
      <h2>Borrower Dashboard</h2>
      <p className='book'>Book Title: {bookDetails.title || 'Loading...'}</p>
      <p className='author'>Author: {bookDetails.author || 'Loading...'}</p>
      <p className='available'>Available: {bookDetails.available}</p>

      <button type='button' onClick={() => fetchBookDetails("68790c15eccc3d2f8b6f3cf3")}>
        Refresh Book Details
      </button>
      </div>
      </div>
    </div>
  )
}

export default App
