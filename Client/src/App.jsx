
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import backgroundImage from './assets/images/background.jpg';
import Login from "./Auth/Login"; 
import Preview from "./Preview/Preview";
import BorrowerHome from "./Borrower/BorrowerHome"; // Importing BorrowerHome component


function App() {
  return (
        <div >
    <BrowserRouter>
      <Routes>
         
  
        <Route path="/" element={<Preview />} />

        <Route path="/borrower" element={<BorrowerHome />} /> 

      
      </Routes>
    </BrowserRouter>
      </div>
    
  );
}

export default App;