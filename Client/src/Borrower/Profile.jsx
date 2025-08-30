import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage({ user = {} }) {
  const [borrowedBookIds, setBorrowedBookIds] = useState([]);
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [fine, setFine] = useState(0);
  const [error, setError] = useState("");
  const [returnMessage, setReturnMessage] = useState("");



  useEffect(() => {
    if (user.id) {
      fetchBorrowedBookIds();
      fetchAllBooks();
    }
    // eslint-disable-next-line
  }, [user.id]);

  // Fetch all books from backend
  const fetchAllBooks = () => {
    axios
      .get("https://library-management-system-ylrf.onrender.com/api/books")
      .then(res => setBooks(res.data))
      .catch(() => setBooks([]));
  };

  // Fetch borrowed book IDs
  const fetchBorrowedBookIds = () => {
    axios
      .get(`https://library-management-system-ylrf.onrender.com/api/borrowers/${user.id}`)
      .then(res => {
        setBorrowedBookIds(res.data.booksBorrowed || []);
        setFine(res.data.fine || 0);
        setError("");
      })
      .catch(() => setError("User not found or no borrowed books."));
  };

  // Map borrowed IDs to book objects
  useEffect(() => {
    if (borrowedBookIds.length && books.length) {
      const borrowed = books.filter(book =>
        borrowedBookIds.includes(book._id || book.id)
      );
      setBorrowedBooks(borrowed);
    } else {
      setBorrowedBooks([]);
    }
  }, [borrowedBookIds, books]);

  const handleReturn = async (book) => {
    try {
      await axios.post("https://library-management-system-ylrf.onrender.com/api/records", {
        bookId: book._id || book.id,
        borrowerId: user.id,
        status: "return",
      });
      setReturnMessage(`"${book.title}" returned successfully!`);
      fetchBorrowedBookIds();
      setTimeout(() => setReturnMessage(""), 2000);
    } catch (err) {
      setReturnMessage("Failed to return book.");
      setTimeout(() => setReturnMessage(""), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#181818] py-12 px-4 md:px-16 text-white">
      <div className="max-w-2xl mx-auto bg-[#232323] rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <img
            src={user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
            alt="User avatar"
            className="w-24 h-24 rounded-full mb-4"
          />
          <div className="text-2xl font-bold">{user.name || "User Name"}</div>
          <div className="text-gray-400">{user.email || "user@email.com"}</div>
        </div>
        {returnMessage && (
          <div className="text-green-400 mb-4 text-center">{returnMessage}</div>
        )}
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Borrowed Books</h2>
          {borrowedBooks.length === 0 ? (
            <div className="text-gray-400">No borrowed books.</div>
          ) : (
            <ul className="space-y-2">
              {borrowedBooks.map(book => (
                <li key={book._id || book.title} className="flex items-center gap-3 bg-[#181818] rounded p-2">
                  <img src={book.coverImage} alt={book.title} className="w-10 h-14 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{book.title}</div>
                    <div className="text-gray-400 text-sm">{book.author}</div>
                  </div>
                  <button
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded shadow text-xs font-semibold"
                    onClick={() => handleReturn(book)}
                  >
                    Return
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Fine Details</h2>
          <div className="text-lg">
            {fine > 0 ? (
              <span className="text-red-400">Outstanding Fine: ₹{fine}</span>
            ) : (
              <span className="text-green-400">No outstanding fines.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;