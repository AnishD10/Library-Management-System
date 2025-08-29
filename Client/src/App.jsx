import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import backgroundImage from './assets/images/background.jpg';
import './global-theme.css';
import Login from "./Auth/Login"; 
import Preview from "./Preview/Preview";
import BorrowerHome from "./Borrower/BorrowerHome";
import LibrarianHome from "./Librarian/LibrarianHome";
import Book from "./Librarian/Dashboard/Book";
import Borrower from "./Librarian/Dashboard/Borrower";
import User from "./Librarian/Dashboard/User";
import Record from "./Librarian/Dashboard/Record";
import CategoryBooks from "./pages/CategoryBooks";
import ProfilePage from "./pages/ProfilePage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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
            <Route path="/" element={<Preview />} />
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
              <Route path="borrowers" element={<Borrower />} />
              <Route path="users" element={<User />} />
              <Route path="records" element={<Record />} />
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