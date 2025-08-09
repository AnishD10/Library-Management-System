
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import backgroundImage from './assets/images/background.jpg';
import Login from "./Auth/Login"; 
import HomePage from "./Borrower/HomePage";

function App() {
  return (
        <div >
    <BrowserRouter>
      <Routes>
         
      
        <Route path="/" element={<Login/>} />
        <Route path="/Home" element={<HomePage />} />
      
      </Routes>
    </BrowserRouter>
      </div>
    
  );
}

export default App;