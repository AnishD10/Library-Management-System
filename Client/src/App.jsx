
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import backgroundImage from './assets/images/background.jpg';
import Login from "./Auth/Login"; 

function App() {
  return (
        <div >

        <img src="{backgroundImage}" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
                       {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20">
      </div>
    <BrowserRouter>
      <Routes>
         
      
        <Route path="/" element={<Login/>} />
      
      </Routes>
    </BrowserRouter>
      </div>
    
  );
}

export default App;