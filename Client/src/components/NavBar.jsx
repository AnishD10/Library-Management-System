import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBook } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function NavigationBar({ onBookIconClick, addToReadList = [], handleAddToRead, user = {} }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalBook, setModalBook] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();

  // Fetch books from backend and filter by search term
  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    axios.get("http://localhost:3000/api/books")
      .then(res => {
        const lower = searchTerm.toLowerCase();
        const filtered = (res.data || []).filter(
          b =>
            b.title?.toLowerCase().includes(lower) ||
            b.author?.toLowerCase().includes(lower)
        );
        setSearchResults(filtered.slice(0, 8)); // Limit results
        setShowDropdown(filtered.length > 0);
      });
  }, [searchTerm]);

  // Hide dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hide profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="NavBar h-[100px] w-full flex items-center justify-between px-[100px] text-white shadow-md">
      <div className="Nav-links h-full w-[500px] flex justify-evenly items-center">
        <Link to="/Home" className="Home">Home</Link>
        <Link to="/AboutUs" className="AboutUs">About</Link>
        <Link to="/ContactUs" className="ContactUs">Contact</Link>
        <Link to="/Blog" className="Blog">Blog</Link>
        <Link to="/Research" className="Research">Research</Link>
      </div>
      <div className="Icons flex items-center w-[500px]">
        <div className="flex flex-row items-center gap-6 flex-1 justify-end">
          {/* Search Bar */}
          <div className="relative min-w-0 w-64" ref={dropdownRef}>
            <div className="flex items-center border border-white/30 rounded-lg px-4 py-2 bg-white/10 backdrop-blur-sm">
              <FontAwesomeIcon icon={faSearch} className="text-white/70 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-transparent text-white placeholder-white/70 focus:outline-none w-full"
                onFocus={() => setShowDropdown(searchResults.length > 0)}
              />
            </div>
            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {searchResults.length === 0 ? (
                  <div className="px-4 py-2 text-gray-500">No results found.</div>
                ) : (
                  searchResults.map(book => (
                    <div
                      key={book._id || book.title}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
                      onClick={() => {
                        setModalBook(book);
                        setShowBookModal(true);
                        setShowDropdown(false);
                        setSearchTerm("");
                      }}
                    >
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-8 h-12 object-cover rounded mr-3"
                      />
                      <div>
                        <div className="font-semibold">{book.title}</div>
                        <div className="text-xs text-gray-500">{book.author}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          {/* Book Icon */}
          <button
            className="ml-4 relative"
            onClick={onBookIconClick}
            aria-label="View Add to Read"
          >
            <FontAwesomeIcon icon={faBook} className="text-xl text-white" />
            {addToReadList && addToReadList.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#DC143C] text-white text-xs rounded-full px-2 py-0.5">
                {addToReadList.length}
              </span>
            )}
          </button>
          {/* Profile Avatar */}
          <div className="relative">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setShowProfileDropdown((v) => !v)}
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src={user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            {showProfileDropdown && (
              <div
                ref={profileDropdownRef}
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 p-4 text-black"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    alt="User avatar"
                    className="w-16 h-16 rounded-full mb-2"
                  />
                  <div className="font-bold text-lg">{user.name || "User Name"}</div>
                  <div className="text-gray-600 text-sm mb-2">{user.email || "user@email.com"}</div>
                  <div className="w-full border-t border-gray-200 my-2"></div>
                  <button
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </button>
                  <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Settings</button>
                  <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Book Modal */}
      {showBookModal && modalBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
          <div className="bg-[#181818] rounded-xl shadow-2xl p-8 w-full max-w-md relative animate-modalFadeIn flex flex-col items-center">
            <button
              onClick={() => setShowBookModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
            >
              &times;
            </button>
            <img src={modalBook.coverImage} alt={modalBook.title} className="w-40 h-60 object-cover rounded shadow mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2 text-center">{modalBook.title}</h2>
            <div className="text-gray-300 mb-2 text-center">{modalBook.author}</div>
            <div className="text-gray-400 text-center mb-4">{modalBook.description}</div>
            <div className="mb-4 text-gray-400">Quantity Available: <span className="text-white font-semibold">{modalBook.quantity ?? 'N/A'}</span></div>
            <div className="flex gap-3 justify-center w-full">
              <button className="bg-[#DC143C] hover:bg-[#a10e2a] text-white px-4 py-2 rounded shadow text-base font-semibold">Borrow Now</button>
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded shadow text-base font-semibold"
                onClick={() => {
                  if (handleAddToRead) handleAddToRead(modalBook.title);
                  setShowBookModal(false);
                }}
              >
                Add to Read
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavigationBar;