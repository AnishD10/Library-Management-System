import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import NavigationBar from '../components/NavBar'
import SectionFooter from '../components/Footer';

function Home({ user }) {
  // Manual next handler
    const handleNextQuote = () => {
      setFade(false);
      setTimeout(() => {
        setFamousQuoteIndex(prev => (prev + 1) % famousQuotes.length);
        setFade(true);
      }, 600);
    };
  // Animation state for smooth transitions
    const [fade, setFade] = useState(true);
    useEffect(() => {
      const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setFamousQuoteIndex(prev => (prev + 1) % famousQuotes.length);
          setFade(true);
        }, 600); // fade out, then change, then fade in
      }, 30000); // 30 seconds
      return () => clearInterval(interval);
    }, []);
  // State for quote book modal
  const [showQuoteBookModal, setShowQuoteBookModal] = useState(false);

  // Book details for quote books
  const quoteBookDetails = {
    "The Little Prince": {
      title: "The Little Prince",
      description: "A poetic tale of loneliness, friendship, love, and loss, The Little Prince is one of the most-translated and best-selling books in the world.",
      cover: "https://covers.openlibrary.org/b/id/8225261-L.jpg"
    },
    "The Fellowship of the Ring": {
      title: "The Fellowship of the Ring",
      author: "J.R.R. Tolkien",
      description: "The first volume of The Lord of the Rings, introducing the quest to destroy the One Ring.",
      cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg"
    },
    "Harry Potter and the Sorcerer's Stone": {
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      description: "The first book in the Harry Potter series, following Harry's first year at Hogwarts School of Witchcraft and Wizardry.",
      cover: "https://covers.openlibrary.org/b/id/7984916-L.jpg"
    },
    "Wuthering Heights": {
      title: "Wuthering Heights",
      author: "Emily Brontë",
      description: "A classic novel of passion and tragedy set on the Yorkshire moors.",
      cover: "https://covers.openlibrary.org/b/id/8231996-L.jpg"
    },
  };

  // Helper to get book key from author string
  function getBookKeyFromQuote(quote) {
    if (quote.author.includes('Little Prince')) return 'The Little Prince';
    if (quote.author.includes('Fellowship of the Ring')) return 'The Fellowship of the Ring';
    if (quote.author.includes('Harry Potter')) return "Harry Potter and the Sorcerer's Stone";
    if (quote.author.includes('Wuthering Heights')) return 'Wuthering Heights';
    return null;
  }
  // Famous quotes state
  const [famousQuoteIndex, setFamousQuoteIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBook, setModalBook] = useState(null);
  const [showMore, setShowMore] = useState({ philosophy: false, romance: false, scifi: false });
  const scrollRefs = {
    philosophy: useRef(null),
    romance: useRef(null),
    scifi: useRef(null),
  };
  const openModal = (bookTitle) => {
    setModalBook(bookTitle);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalBook(null);
  };
  // (removed duplicate handleScroll definition)
  // State for "Add to Read" list and its modal
  const [addToReadList, setAddToReadList] = useState([]);
  const [showAddToReadDropdown, setShowAddToReadDropdown] = useState(false);
  const [addToReadMessage, setAddToReadMessage] = useState(""); // <-- NEW STATE
  const addToReadDropdownRef = useRef(null);

  // Handler to add a book to the "Add to Read" list
  const handleAddToRead = (bookTitle) => {
    setAddToReadList((prev) =>
      prev.includes(bookTitle) ? prev : [...prev, bookTitle]
    );
    setAddToReadMessage(`"${bookTitle}" added to your Read list!`);
    setTimeout(() => setAddToReadMessage(""), 2000);
  };
  // Handler to remove a book from the "Add to Read" list
  const handleRemoveFromRead = (bookTitle) => {
    setAddToReadList((prev) => prev.filter((title) => title !== bookTitle));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        addToReadDropdownRef.current &&
        !addToReadDropdownRef.current.contains(event.target)
      ) {
        setShowAddToReadDropdown(false);
      }
    }
    if (showAddToReadDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddToReadDropdown]);

  const navigate = useNavigate();

  // State to track if "More" should be shown after user scrolls
  const [showMoreBtn, setShowMoreBtn] = useState({
    philosophy: false,
    romance: false,
    scifi: false,
  });

  // Handler to check if user has scrolled (show "More" only after scroll)
  const handleScroll = (category) => {
    const ref = scrollRefs[category]?.current;
    if (ref) {
      setShowMoreBtn((prev) => ({
        ...prev,
        [category]: ref.scrollLeft > 10,
      }));
    }
  };

  const [books, setBooks] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books and quotes from backend
  useEffect(() => {
    setLoading(true);
    // Fetch books
    const booksPromise = axios.get('https://library-management-system-ylrf.onrender.com/api/books');
    // Fetch quotes (new endpoint)
    const quotesPromise = axios.get('https://library-management-system-ylrf.onrender.com/api/books').catch(() => ({ data: [] }));

    Promise.all([booksPromise, quotesPromise])
      .then(([booksRes, quotesRes]) => {
        setBooks(booksRes.data || []);
        setQuotes(quotesRes.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  // Use backend quotes if available, else fallback to static or book quotes
  const famousQuotes = quotes.length > 0
    ? quotes.map(q => ({
        text: q.text || q.quote,
        author: q.author,
        cover: q.coverImage || q.cover,
      }))
    : books
        .filter(b => b.quote && b.quote !== 'No quote available.')
        .map(b => ({
          text: b.quote,
          author: `${b.author}, ${b.title}`,
          cover: b.coverImage,
        }))
      .concat([
        // fallback static quotes if no backend quotes and no book quotes
        {
          text: "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
          author: "Antoine de Saint-Exupéry, The Little Prince",
          cover: "https://covers.openlibrary.org/b/id/8225261-L.jpg"
        },
        {
          text: "All we have to decide is what to do with the time that is given us.",
          author: "J.R.R. Tolkien, The Fellowship of the Ring",
          cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg"
        },
        {
          text: "Not all those who wander are lost.",
          author: "J.R.R. Tolkien, The Fellowship of the Ring",
          cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg"
        },
        {
          text: "It does not do to dwell on dreams and forget to live.",
          author: "J.K. Rowling, Harry Potter and the Sorcerer's Stone",
          cover: "https://covers.openlibrary.org/b/id/7984916-L.jpg"
        },
        {
          text: "Whatever our souls are made of, his and mine are the same.",
          author: "Emily Brontë, Wuthering Heights",
          cover: "https://covers.openlibrary.org/b/id/8231996-L.jpg"
        },
      ]);

  // All categories in order
  const allCategories = [
    { key: 'philosophy', label: 'Philosophy', books: books.filter(b => b.category?.toLowerCase() === 'philosophy').slice(0, 6) },
    { key: 'romance', label: 'Romance', books: books.filter(b => b.category?.toLowerCase() === 'romance').slice(0, 6) },
    { key: 'scifi', label: 'Sci-Fi', books: books.filter(b => b.category?.toLowerCase() === 'scifi' || b.category?.toLowerCase() === 'sci-fi').slice(0, 6) },
    { key: 'history', label: 'History', books: books.filter(b => b.category?.toLowerCase() === 'history').slice(0, 6) },
    { key: 'fantasy', label: 'Fantasy', books: books.filter(b => b.category?.toLowerCase() === 'fantasy').slice(0, 6) },
    { key: 'mystery', label: 'Mystery', books: books.filter(b => b.category?.toLowerCase() === 'mystery').slice(0, 6) },
    { key: 'biography', label: 'Biography', books: books.filter(b => b.category?.toLowerCase() === 'biography').slice(0, 6) },
    { key: 'adventure', label: 'Adventure', books: books.filter(b => b.category?.toLowerCase() === 'adventure').slice(0, 6) },
    { key: 'selfhelp', label: 'Self-Help', books: books.filter(b => b.category?.toLowerCase() === 'self-help').slice(0, 6) },
    { key: 'science', label: 'Science', books: books.filter(b => b.category?.toLowerCase() === 'science').slice(0, 6) },
  ];

  // State to control how many categories are shown
  const [visibleCategoryCount, setVisibleCategoryCount] = useState(3);

  // State to track which books are borrowed by the user
  const [borrowedStatus, setBorrowedStatus] = useState({});
  const [borrowReturnMessage, setBorrowReturnMessage] = useState("");

  // Fetch borrowed books for the user
  useEffect(() => {
    if (!user.id) return;
    axios
      .get(`https://library-management-system-ylrf.onrender.com/api/borrowers/${user.id}`)
      .then((res) => {
        // Use the borrowedBooks array from the borrower object
        const borrowedBooks = res.data.borrowedBooks || [];
        const statusMap = {};
        borrowedBooks.forEach((bookId) => {
          statusMap[bookId] = true;
        });
        setBorrowedStatus(statusMap);
      })
      .catch(() => setBorrowedStatus({}));
  }, [user.id, books.length]);

  // Handler for borrow/return
  const handleBorrowOrReturn = async (book) => {
    if (!user.id) return;
    const bookId = book._id || book.id;
    const isBorrowed = borrowedStatus[bookId];

    try {
      await axios.post("https://library-management-system-ylrf.onrender.com/api/records", {
        bookId,
        borrowerId: user.id,
        status: isBorrowed ? "return" : "issue", // <-- "issue" for borrow, "return" for return
      });
      setBorrowedStatus((prev) => ({
        ...prev,
        [bookId]: !isBorrowed,
      }));
      setBorrowReturnMessage(
        isBorrowed
          ? `"${book.title}" returned successfully!`
          : `"${book.title}" borrowed successfully!`
      );
      setTimeout(() => setBorrowReturnMessage(""), 2000);
    } catch (err) {
      alert("Failed to update borrow status.");
    }
  };

  // Get an array of borrowed book IDs
const borrowedBookIds = Object.keys(borrowedStatus).filter(id => borrowedStatus[id]);

// Get the full book objects for borrowed books
const borrowedBooks = books.filter(book => borrowedBookIds.includes(book._id || book.id));

  return (
    <>
      <div style={{ backgroundColor: 'black', minHeight: '100vh' }} className="no-scrollbar">
        {/* NavigationBar and Add to Read Dropdown */}
        <section
          style={{
            width: '100vw',
            height: '80vh',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1500&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="flex flex-col items-center justify-center text-white relative"
        >
          <div className="w-full relative">
            <NavigationBar
              onBookIconClick={() => setShowAddToReadDropdown((v) => !v)}
              addToReadList={addToReadList}
              handleAddToRead={handleAddToRead}
            />
            {/* Only render Add to Read Dropdown when icon is clicked */}
            {showAddToReadDropdown && (
              <div
                ref={addToReadDropdownRef}
                className="absolute right-8 top-16 z-50 bg-[#181818] rounded-xl shadow-2xl p-4 w-80 animate-modalFadeIn flex flex-col items-center"
              >
                <h2 className="text-xl font-bold text-white mb-2 text-center">Add to Read List</h2>
                {addToReadList.length === 0 ? (
                  <div className="text-gray-400 text-center">No books added yet.</div>
                ) : (
                  <ul className="w-full flex flex-col gap-4">
                    {addToReadList.map((title) => {
                      const book = books.find(b => b.title === title);
                      const bookId = book?._id || book?.id;
                      const isBorrowed = borrowedStatus[bookId];
                      return (
                        <li key={title} className="flex flex-col items-center bg-[#232323] rounded-lg p-2 shadow">
                          <img
                            src={book?.coverImage}
                            alt={title}
                            className="w-12 h-16 object-cover rounded shadow mb-1"
                          />
                          <div className="text-base font-bold text-white">{title}</div>
                          <div className="text-gray-300 mb-1 text-sm">{book?.author}</div>
                          <div className="flex gap-2 mt-1">
                            <button
                              className="bg-[#DC143C] hover:bg-[#a10e2a] text-white px-2 py-0.5 rounded shadow text-xs font-semibold"
                              onClick={() => handleRemoveFromRead(title)}
                            >
                              Remove
                            </button>
                            <button
                              className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-0.5 rounded shadow text-xs font-semibold"
                              onClick={() => handleBorrowOrReturn(book)}
                            >
                              {isBorrowed ? "Return" : "Borrow"}
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
            {/* Success message for Add to Read */}
            {addToReadMessage && (
              <div className="fixed top-6 right-1/2 translate-x-1/2 z-[100] bg-green-600 text-white px-6 py-2 rounded shadow-lg font-semibold transition-all duration-300">
                {addToReadMessage}
              </div>
            )}
            {/* Success message for Borrow/Return */}
            {borrowReturnMessage && (
              <div className="fixed top-20 right-1/2 translate-x-1/2 z-[100] bg-green-600 text-white px-6 py-2 rounded shadow-lg font-semibold transition-all duration-300">
                {borrowReturnMessage}
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col items-center justify-center w-full relative">
            <div className={`text-2xl md:text-4xl font-serif font-bold text-center max-w-5xl w-full mb-4 text-white drop-shadow-lg px-4 transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}>
              "<span className="text-white">{famousQuotes[famousQuoteIndex].text}</span>"
            </div>
            <div className={`text-lg md:text-xl font-light text-center text-gray-200 mb-4 transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}>
              - <span className="text-white font-semibold">{famousQuotes[famousQuoteIndex].author}</span>
            </div>
            {/* Manual next button */}
            <button
              onClick={handleNextQuote}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-[#DC143C] hover:bg-[#a10e2a] text-white rounded-full p-3 shadow-lg transition-colors duration-200"
              aria-label="Next Quote"
              style={{ zIndex: 10 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {/* Book cover box at right bottom */}
            <div
              className={`absolute right-16 bottom-16 bg-white rounded-xl shadow-2xl flex items-center justify-center p-0 hover:scale-110 hover:shadow-2xl cursor-pointer border border-gray-200 transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}
              style={{ width: '150px', height: '210px' }}
              onClick={() => setShowQuoteBookModal(true)}
            >
              <img
                src={famousQuotes[famousQuoteIndex].cover}
                alt="Book Cover"
                className="w-full h-full object-cover rounded-lg"
                style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.28)' }}
              />
            </div>
            {/* Book cover box at right bottom */}
            <div
              className="absolute right-16 bottom-16 bg-white rounded-xl shadow-2xl flex items-center justify-center p-0 transition-transform duration-300 hover:scale-110 hover:shadow-2xl cursor-pointer border border-gray-200"
              style={{ width: '150px', height: '210px' }}
              onClick={() => setShowQuoteBookModal(true)}
            >
              <img
                src={famousQuotes[famousQuoteIndex].cover}
                alt="Book Cover"
                className="w-full h-full object-cover rounded-lg"
                style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.28)' }}
              />
            </div>

            {/* Modal for quote book details */}
            {showQuoteBookModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
                <div className="bg-[#181818] rounded-xl shadow-2xl p-8 w-full max-w-md relative animate-modalFadeIn flex flex-col items-center">
                  <button onClick={() => setShowQuoteBookModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none">&times;</button>
                  {(() => {
                    // Try to find the book in your backend books array by matching cover or title
                    const quote = famousQuotes[famousQuoteIndex];
                    let book = books.find(
                      b =>
                        b.coverImage === quote.cover ||
                        b.title === quote.title ||
                        quote.author?.includes(b.title)
                    );
                    if (!book) return <div className="text-white">Book details not found.</div>;
                    const bookId = book._id || book.id;
                    const isBorrowed = borrowedStatus[bookId];
                    return (
                      <>
                        <img src={book.coverImage} alt={book.title} className="w-40 h-60 object-cover rounded shadow mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2 text-center">{book.title}</h2>
                        <div className="text-gray-300 mb-2 text-center">{book.author}</div>
                        <div className="text-gray-400 text-center mb-4">{book.description}</div>
                        <div className="mb-4 text-gray-400">Quantity Available: <span className="text-white font-semibold">{book.quantity ?? 'N/A'}</span></div>
                        <div className="flex gap-3 justify-center w-full">
                          <button
                            className="bg-[#DC143C] hover:bg-[#a10e2a] text-white px-4 py-2 rounded shadow text-base font-semibold"
                            onClick={() => handleBorrowOrReturn(book)}
                          >
                            {isBorrowed ? "Return" : "Borrow Now"}
                          </button>
                          <button
                            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded shadow text-base font-semibold"
                            onClick={() => {
                              handleAddToRead(book.title);
                              setShowQuoteBookModal(false);
                              setShowAddToReadDropdown(true);
                            }}
                          >
                            Add to Read
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </section>
        {/* Explore Section */}
        <section
          className="py-12 px-4 md:px-16 bg-black relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <h2 className="flex items-center justify-center gap-2 text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            <span className="text-white">Explore</span>
            <FontAwesomeIcon icon={faCompass} className="text-gray-400 text-4xl md:text-5xl ml-2" />
          </h2>
          {/* Category Carousels */}
          <div className="space-y-10">
            {allCategories.slice(0, visibleCategoryCount).map(category => (
              <div key={category.key} className="bg-[#1a1a1a] rounded-lg shadow-lg p-4 md:p-6">
                <div className="w-fit px-2 mb-4 flex">
                  <div className="inline-block bg-[#2d2d2d] rounded-r-lg border-l-8 border-[#DC143C] px-6 py-2 shadow-md">
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">{category.label}</h3>
                  </div>
                </div>
                <div className="relative">
                  <div className="overflow-visible w-full flex justify-center scroll-smooth no-scrollbar">
                    <div className="flex flex-row gap-8 min-w-[1200px] justify-center items-center mx-auto">
                      {category.books.map((book) => {
                        const bookId = book._id || book.id;
                        const isBorrowed = borrowedStatus[bookId];
                        return (
                          <div
                            key={book.title}
                            className="flex flex-col items-center w-60 bg-[#232323] rounded-xl shadow-lg p-4 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-[#DC143C]/60"
                            style={{ zIndex: 10 }}
                          >
                            <img src={book.coverImage} alt={book.title} className="w-40 h-60 object-cover rounded shadow mb-4 cursor-pointer" onClick={() => openModal(book.title)} />
                            <div className="text-center mb-2">
                              <div className="text-lg font-bold text-white">{book.title}</div>
                              <div className="text-gray-300 text-base">{book.author}</div>
                            </div>
                            <div className="flex gap-2 justify-center">
                              <button
                                className="bg-[#DC143C] hover:bg-[#a10e2a] text-white px-3 py-1 rounded shadow text-sm font-semibold"
                                onClick={() => handleAddToRead(book.title)}
                              >
                                Add to Read
                              </button>
                              <button
                                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded shadow text-sm font-semibold"
                                onClick={() => handleBorrowOrReturn(book)}
                              >
                                {isBorrowed ? "Return" : "Borrow"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      {/* More button at the end */}
                      <button
                        className="ml-4 bg-[#DC143C] hover:bg-[#a10e2a] text-white px-4 py-2 rounded shadow font-semibold z-20 self-center"
                        onClick={() => navigate(`/category/${category.key}`)}
                      >
                        More &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Show More/Less Categories Button */}
            {allCategories.length > 3 && (
              <div className="flex justify-center">
                {visibleCategoryCount < allCategories.length ? (
                  <button
                    className="bg-[#DC143C] hover:bg-[#a10e2a] text-white px-8 py-3 rounded shadow font-bold text-lg"
                    onClick={() => setVisibleCategoryCount(count => Math.min(count + 3, allCategories.length))}
                  >
                    Show More Categories
                  </button>
                ) : (
                  <button
                    className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded shadow font-bold text-lg"
                    onClick={() => setVisibleCategoryCount(3)}
                  >
                    Show Less
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
        {/* Borrowed Books Section */}
        <div className="max-w-xl mx-auto mt-8 mb-8 bg-[#181818] rounded-xl shadow-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Borrowed Books</h2>
          {borrowedBooks.length === 0 ? (
            <div className="text-gray-400 text-center">No borrowed books.</div>
          ) : (
            <ul className="flex flex-col gap-4">
              {borrowedBooks.map(book => (
                <li key={book._id || book.id} className="flex items-center gap-4 bg-[#232323] rounded-lg p-2 shadow">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded shadow"
                  />
                  <div>
                    <div className="text-base font-bold text-white">{book.title}</div>
                    <div className="text-gray-300 text-sm">{book.author}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <SectionFooter />
    </>
  );
}

export default Home;