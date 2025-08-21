import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'; // for ESMconst API_URL = "http://localhost:3000";

const API_URL = "http://localhost:3000"; // Change if your backend runs elsewhere

const Home = () => {

  // Fetch book details

  const [book, setBook] = useState(null);

    // JWT decoding logic
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    var borrowerId = decoded.borrowerId;
    var borrowerName = decoded.borrowerName;
    // Use these values in your UI
  }

  const fetchBook = async (bookId) => {
    try {
      const res = await axios.get(`${API_URL}/api/books/${bookId}`);
      setBook( res.data )}
    catch (err) {
      console.error("Error fetching book:", err);
      return null;
    }
  }
  fetchBook("68a537726f5fef4eb8144734"); // Replace with actual book ID

  //fetching ends here


  const handleBorrow = async () => {
    try {

      const response = await axios.post(`${API_URL}/api/records`, {
        bookId: book._id,
        borrowerId: borrowerId,
        status: "issue",
      });
      console.log("Borrow request successful:", response.data);
      alert(`book is borrowed by ${borrowerName}`);
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert("Failed to borrow book. Please try again.");
    }
  };



  return(
<>

<div className="card card-side bg-base-100 shadow-sm">
  <figure>
    <img
    key={book ? book._id : "placeholder"}
      src={book ? `${API_URL}/uploads/${book.coverImage}` : "https://via.placeholder.com/150"}
      alt= {book ? book.title : "Book Cover"}>
  </img>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{book ?book.title : "abc"}</h2>
    <p>Click the button to watch on Jetflix app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={handleBorrow}>borrow</button>
    </div>
  </div>
</div>
<button className="btn">Logout</button>


</>



  )
};

export default Home;