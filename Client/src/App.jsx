

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
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




function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Preview />} />
            <Route path="/borrower" element={<BorrowerHome />} />
            <Route path="/librarian" element={<LibrarianHome />}>
              <Route path="books" element={<Book />} />
              <Route path="borrowers" element={<Borrower />} />
              <Route path="users" element={<User />} />
              <Route path="records" element={<Record />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;