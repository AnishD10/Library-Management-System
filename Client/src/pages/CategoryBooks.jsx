import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const categoryNames = {
  philosophy: "Philosophy",
  romance: "Romance",
  scifi: "Sci-Fi",
  history: "History",
  fantasy: "Fantasy",
  mystery: "Mystery",
  biography: "Biography",
  adventure: "Adventure",
  "self-help": "Self-Help",
  science: "Science",
};

function CategoryBooks({ addToReadList = [], handleAddToRead = () => {} }) {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/api/books')
      .then(res => {
        // Filter books by category (case-insensitive)
        setBooks(
          (res.data || []).filter(
            b => b.category?.toLowerCase() === category?.toLowerCase()
          )
        );
      })
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="min-h-screen bg-[#181818] py-12 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {categoryNames[category] || "Category"} Books
          </h1>
          <Link
            to="/borrower"
            className="bg-[#DC143C] hover:bg-[#a10e2a] text-white px-4 py-2 rounded shadow font-semibold"
          >
            Back to Home
          </Link>
        </div>
        {loading ? (
          <div className="text-gray-400 text-center mt-16">Loading...</div>
        ) : books.length === 0 ? (
          <div className="text-gray-400 text-center mt-16">No books found for this category.</div>
        ) : (
          <div className="flex flex-wrap gap-8 justify-start">
            {books.map((book) => (
              <div
                key={book._id || book.title}
                className="flex flex-col items-center w-60 bg-[#232323] rounded-xl shadow-lg p-4 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-[#DC143C]/60"
                style={{ zIndex: 10 }}
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-40 h-60 object-cover rounded shadow mb-4 cursor-pointer"
                />
                <div className="text-center mb-2">
                  <div className="text-lg font-bold text-white">{book.title}</div>
                  <div className="text-gray-300 text-base">{book.author}</div>
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    className="bg-[#DC143C] hover:bg-[#a10e2a] text-white px-3 py-1 rounded shadow text-sm font-semibold"
                    onClick={() => handleAddToRead(book.title)}
                    disabled={addToReadList.includes(book.title)}
                  >
                    {addToReadList.includes(book.title) ? "Added" : "Add to Read"}
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded shadow text-sm font-semibold">
                    Borrow
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryBooks;