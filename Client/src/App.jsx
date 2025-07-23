

import './App.css'

function App() {

  return (
    <div>
      <h1>Library Management System</h1>
      <div className='main-panel'>
      <div className='login'>
      <h2>Login Borrower</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
        
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        
        <button type="submit">Login</button>
      </form>
      </div>
      <div className='dashboard'>
      <h2>Borrower Dashboard</h2>
      <p className='book'>Book Title: 1984</p>
      <p className='author'>Author: George Orwell</p>
      <p className='available'>Available : 3</p>

      <button>Borrow</button>
      </div>
      </div>
    </div>
  )
}

export default App
