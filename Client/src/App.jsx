
import React, { useState } from 'react'
import './App.css'
import axios from 'axios';


function App() {

  const [message, setMessage] = useState('');
  const [form , setForm] = useState({
    email: '',
    password: ''
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
      setMessage(error.res.message);
    }

  }
  

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
      <p className='book'>Book Title: 1984</p>
      <p className='author'>Author: George Orwell</p>
      <p className='available'>Available : 3</p>

      <button type='submit'>Borrow</button>
      </div>
      </div>
    </div>
  )
}

export default App
