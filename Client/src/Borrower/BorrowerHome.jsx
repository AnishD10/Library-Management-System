import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:3000";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  // JWT decoding logic
  let borrowerId = null;
  let borrowerName = null;
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    borrowerId = decoded.borrowerId;
    borrowerName = decoded.borrowerName;
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/books`);
        setBooks(res.data);
        // Extract unique categories if category field exists
        const cats = Array.from(new Set(res.data.map(b => b.category).filter(Boolean)));
        setCategories(cats);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    const fetchBorrowedBooks = async () => {
      if (!borrowerId) return;
      try {
        const res = await axios.get(`${API_URL}/api/borrowers/${borrowerId}`);
        setBorrowedBooks(res.data.booksBorrowed || []);
      } catch (err) {
        console.error("Error fetching borrowed books:", err);
      }
    };

    fetchBooks();
    fetchBorrowedBooks();
  }, [borrowerId]);


  const handleBorrow = async (bookId, title) => {
    try {
      await axios.post(`${API_URL}/api/records`, {
        bookId,
        borrowerId,
        status: "issue",
      });
      setBorrowedBooks(prev => [...prev, bookId]);
      setBooks(prevBooks => prevBooks.map(book =>
        book._id === bookId ? { ...book, available: book.available - 1 } : book
      ));
      alert(`Book '${title}' is borrowed by ${borrowerName}`);
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert("Failed to borrow book. Please try again.");
    }
  };

  const handleReturn = async (bookId, title) => {
    try {
      await axios.post(`${API_URL}/api/records`, {
        bookId,
        borrowerId,
        status: "return",
      });
      setBorrowedBooks(prev => prev.filter(id => id !== bookId));
      setBooks(prevBooks => prevBooks.map(book =>
        book._id === bookId ? { ...book, available: book.available + 1 } : book
      ));
      alert(`Book '${title}' is returned by ${borrowerName}`);
    } catch (error) {
      console.error("Error returning book:", error);
      alert("Failed to return book. Please try again.");
    }
  };

  // Group books by category if category exists, else show all
  const renderBooksByCategory = () => {
    if (categories.length === 0) {
      // No category field, show all books
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => {
            const isBorrowed = borrowedBooks.includes(book._id);
            return (
              <div key={book._id} className="card card-side bg-base-100 shadow-sm">
                <figure>
                  <img
                    src={book.coverImage ? `${API_URL}/uploads/${book.coverImage}` : "https://via.placeholder.com/150"}
                    alt={book.title}
                    style={{ width: "120px", height: "160px", objectFit: "cover" }}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{book.title}</h2>
                  <p>Author: {book.author}</p>
                  <p>Available: {book.available}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => isBorrowed ? handleReturn(book._id, book.title) : handleBorrow(book._id, book.title)}
                    >
                      {isBorrowed ? "Return" : "Borrow"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    // Grouped by category
    return categories.map(category => (
      <div key={category} className="mb-8">
        <h3 className="text-xl font-semibold mb-2">{category}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.filter(b => b.category === category).map((book) => {
            const isBorrowed = borrowedBooks.includes(book._id);
            return (
              <div key={book._id} className="card card-side bg-base-100 shadow-sm">
                <figure>
                  <img
                    src={book.coverImage ? `${API_URL}/uploads/${book.coverImage}` : "https://via.placeholder.com/150"}
                    alt={book.title}
                    style={{ width: "120px", height: "160px", objectFit: "cover" }}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{book.title}</h2>
                  <p>Author: {book.author}</p>
                  <p>Available: {book.available}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => isBorrowed ? handleReturn(book._id, book.title) : handleBorrow(book._id, book.title)}
                    >
                      {isBorrowed ? "Return" : "Borrow"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Available Books</h2>
      {renderBooksByCategory()}
      <button className="btn mt-6">Logout</button>
    </>
  );
};

export default Home;