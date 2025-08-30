import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './global-theme.css';
import Login from "./Auth/Login";
import BorrowerHome from "./Borrower/Home";
import LibrarianHome from "./Librarian/LibrarianHome";
import Book from "./Librarian/Dashboard/Book";
import Borrower from "./Librarian/Dashboard/Borrower";
import Record from "./Librarian/Dashboard/Record";
import Profile from "./Librarian/Dashboard/Profile";
import CategoryBooks from "./Borrower/Categories";
import ProfilePage from "./Borrower/Profile";
import { jwtDecode } from "jwt-decode";


function App() {
  const [addToReadList, setAddToReadList] = useState([]);
  const [user, setUser] = useState({});

  const handleAddToRead = (title) => {
    setAddToReadList(list => list.includes(title) ? list : [...list, title]);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          name: decoded.borrowerName,
          email: decoded.borrowerEmail,
          id: decoded.borrowerId,
        });
      } catch (e) {
        setUser({});
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/borrower"
              element={
                <BorrowerHome
                  user={user}
                  addToReadList={addToReadList}
                  handleAddToRead={handleAddToRead}
                />
              }
            />
            <Route path="/librarian" element={<LibrarianHome />}>
              <Route path="books" element={<Book />} />
              <Route path="borrower" element={<Borrower />} />
              <Route path="records" element={<Record />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route
              path="/category/:category"
              element={
                <CategoryBooks
                  addToReadList={addToReadList}
                  handleAddToRead={handleAddToRead}
                />
              }
            />
            <Route
              path="/profile"
              element={<ProfilePage user={user} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;