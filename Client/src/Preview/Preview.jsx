import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavBar";
import HeroImage from "../assets/images/Hero.jpg";
import Login from "../Auth/Login";
import axios from "axios";

const API_URL = "http://localhost:3000"; // Change if your backend runs elsewhere

const Preview = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/books`);
        setBooks(res.data);
      } catch (err) {
        setBooks([]);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <section
        className="relative flex flex-col items-center justify-center min-h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 w-full z-20">
          <NavigationBar />
        </div>
        {/* Title */}
        <h1
          className=" mb-8 text-4xl font-extrabold text-center drop-shadow-lg z-10"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          WELCOME TO READER’S PARADISE
        </h1>
        {/* Login Form */}
        <div className="z-10 w-full flex justify-center">
          <Login />
        </div>
      </section>
      {/* Star Books Section */}
      <section className="w-full bg-black py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 tracking-wide">Star Books</h2>
        <div className="flex flex-wrap justify-center gap-8 px-4">
          {books.length === 0 && <div className="text-gray-400">No books found.</div>}
          {books.map((book) => (
            <div
              key={book._id}
              className="flex flex-col items-center bg-white/10 border border-white/20 rounded-lg p-4 w-40 shadow-md hover:scale-105 transition-transform"
            >
              <div className="w-24 h-32 bg-white/20 rounded mb-3 flex items-center justify-center overflow-hidden">
                {book.coverImage ? (
                  <img
                    src={`${API_URL}/uploads/${book.coverImage}`}
                    alt={book.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">?</span>
                )}
              </div>
              <div className="text-white text-center">
                <div className="font-semibold">{book.title}</div>
                <div className="text-xs text-gray-300">{book.author}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Preview;
