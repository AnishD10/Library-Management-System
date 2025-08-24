import { useEffect } from 'react';

// Famous book quotes for the new section
const famousQuotes = [
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
];
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import NavigationBar from '../components/NavBar';
import SectionFooter from '../components/SectionFooter';


const bookDetailsData = {
  'Meditations': {
    quantity: 5,
    description: 'A series of personal writings by Marcus Aurelius, Roman Emperor, on Stoic philosophy.'
  },
  'The Republic': {
    quantity: 3,
    description: 'A Socratic dialogue by Plato concerning justice, order, and character of the just city-state and the just man.'
  },
  'Beyond Good and Evil': {
    quantity: 2,
    description: 'A philosophical work by Friedrich Nietzsche that expands on ideas from Thus Spoke Zarathustra.'
  },
  'Critique of Pure Reason': {
    quantity: 4,
    description: 'A foundational philosophical text by Immanuel Kant, exploring the limits and scope of human reason.'
  },
  'Nicomachean Ethics': {
    quantity: 6,
    description: 'A work by Aristotle on virtue and moral character.'
  },
  'Thus Spoke Zarathustra': {
    quantity: 1,
    description: 'A philosophical novel by Friedrich Nietzsche, presenting ideas on eternal recurrence and the Übermensch.'
  },
  'Pride and Prejudice': {
    quantity: 7,
    description: 'A romantic novel by Jane Austen, following the character development of Elizabeth Bennet.'
  },
  'The Notebook': {
    quantity: 2,
    description: 'A romantic drama novel by Nicholas Sparks about enduring love.'
  },
  'Jane Eyre': {
    quantity: 3,
    description: 'A novel by Charlotte Brontë, blending romance with themes of morality and social criticism.'
  },
  'Me Before You': {
    quantity: 5,
    description: 'A romance novel by Jojo Moyes about an unexpected relationship.'
  },
  'Outlander': {
    quantity: 2,
    description: 'A historical romance novel by Diana Gabaldon involving time travel.'
  },
  'Gone with the Wind': {
    quantity: 1,
    description: 'A novel by Margaret Mitchell set in the American South during the Civil War.'
  },
  'Dune': {
    quantity: 4,
    description: 'A science fiction novel by Frank Herbert, set in a distant future amidst a huge interstellar empire.'
  },
  "Ender's Game": {
    quantity: 3,
    description: 'A military science fiction novel by Orson Scott Card.'
  },
  'Neuromancer': {
    quantity: 2,
    description: 'A science fiction novel by William Gibson, a seminal work in the cyberpunk genre.'
  },
  'Foundation': {
    quantity: 5,
    description: 'A science fiction novel by Isaac Asimov, the first in the Foundation series.'
  },
  'Snow Crash': {
    quantity: 2,
    description: 'A science fiction novel by Neal Stephenson, noted for its exploration of virtual reality.'
  },
  'The Martian': {
    quantity: 6,
    description: 'A science fiction novel by Andy Weir about an astronaut stranded on Mars.'
  },
};

// Book arrays for each category
const philosophyBooks = [
  { title: 'Meditations', author: 'Marcus Aurelius', cover: 'https://covers.openlibrary.org/b/id/8231856-L.jpg' },
  { title: 'The Republic', author: 'Plato', cover: 'https://covers.openlibrary.org/b/id/10523339-L.jpg' },
  { title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche', cover: 'https://covers.openlibrary.org/b/id/11153225-L.jpg' },
  { title: 'Critique of Pure Reason', author: 'Immanuel Kant', cover: 'https://covers.openlibrary.org/b/id/11153226-L.jpg' },
  { title: 'Nicomachean Ethics', author: 'Aristotle', cover: 'https://covers.openlibrary.org/b/id/11153231-L.jpg' },
  { title: 'Thus Spoke Zarathustra', author: 'Friedrich Nietzsche', cover: 'https://covers.openlibrary.org/b/id/11153232-L.jpg' },
];
const romanceBooks = [
  { title: 'Pride and Prejudice', author: 'Jane Austen', cover: 'https://covers.openlibrary.org/b/id/8228691-L.jpg' },
  { title: 'The Notebook', author: 'Nicholas Sparks', cover: 'https://covers.openlibrary.org/b/id/11153223-L.jpg' },
  { title: 'Jane Eyre', author: 'Charlotte Brontë', cover: 'https://covers.openlibrary.org/b/id/11153227-L.jpg' },
  { title: 'Me Before You', author: 'Jojo Moyes', cover: 'https://covers.openlibrary.org/b/id/11153228-L.jpg' },
  { title: 'Outlander', author: 'Diana Gabaldon', cover: 'https://covers.openlibrary.org/b/id/11153233-L.jpg' },
  { title: 'Gone with the Wind', author: 'Margaret Mitchell', cover: 'https://covers.openlibrary.org/b/id/11153234-L.jpg' },
];
const scifiBooks = [
  { title: 'Dune', author: 'Frank Herbert', cover: 'https://covers.openlibrary.org/b/id/10521213-L.jpg' },
  { title: "Ender's Game", author: 'Orson Scott Card', cover: 'https://covers.openlibrary.org/b/id/11153224-L.jpg' },
  { title: 'Neuromancer', author: 'William Gibson', cover: 'https://covers.openlibrary.org/b/id/11153229-L.jpg' },
  { title: 'Foundation', author: 'Isaac Asimov', cover: 'https://covers.openlibrary.org/b/id/11153230-L.jpg' },
  { title: 'Snow Crash', author: 'Neal Stephenson', cover: 'https://covers.openlibrary.org/b/id/11153235-L.jpg' },
  { title: 'The Martian', author: 'Andy Weir', cover: 'https://covers.openlibrary.org/b/id/11153236-L.jpg' },
];

function Home() {
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
  // Fix: move handleScroll into a function
  const handleScroll = (category) => {
    const el = scrollRefs[category]?.current;
    if (!el) return;
    if (el.scrollLeft > 10) {
      setShowMore((prev) => ({ ...prev, [category]: true }));
    } else {
      setShowMore((prev) => ({ ...prev, [category]: false }));
    }
  };
  return (
    <>
      <div style={{ backgroundColor: 'black', minHeight: '100vh' }} className="no-scrollbar">
        {/* Famous Quotes Section with NavigationBar inside */}
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
          <div className="w-full">
            <NavigationBar />
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
                    const bookKey = getBookKeyFromQuote(famousQuotes[famousQuoteIndex]);
                    const book = quoteBookDetails[bookKey];
                    if (!book) return <div className="text-white">Book details not found.</div>;
                    return (
                      <>
                        <img src={book.cover} alt={book.title} className="w-40 h-60 object-cover rounded shadow mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2 text-center">{book.title}</h2>
                        <div className="text-gray-300 mb-2 text-center">by {book.author}</div>
                        <div className="text-gray-400 text-center mb-4">{book.description}</div>
                        <div className="flex gap-3 justify-center w-full">
                          <button className="bg-[#DC143C] hover:bg-[#a10e2a] text-white px-4 py-2 rounded shadow text-base font-semibold">Borrow Now</button>
                          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded shadow text-base font-semibold">Add to Read</button>
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
            {/* Philosophy Category */}
            <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-4 md:p-6">
              <div className="w-full px-2 mb-4 flex">
                <div className="inline-block bg-[#2d2d2d] rounded-r-lg border-l-8 border-[#DC143C] px-6 py-2 shadow-md">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">Philosophy</h3>
                </div>
              </div>

              <div
                className="overflow-hidden w-full flex justify-center scroll-smooth no-scrollbar"
                ref={scrollRefs.philosophy}
                onScroll={() => handleScroll('philosophy')}
              >
                <div className="flex flex-row gap-8 min-w-[1200px] justify-center items-center mx-auto">
                  {philosophyBooks.map((book) => (
                    <div key={book.title} className="flex flex-col items-center w-60 bg-[#232323] rounded-xl shadow-lg p-4 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-[#DC143C]/60">
                      <img src={book.cover} alt={book.title} className="w-40 h-60 object-cover rounded shadow mb-4 cursor-pointer" onClick={() => openModal(book.title)} />
                      <div className="text-center mb-2">
                        <div className="text-lg font-bold text-white">{book.title}</div>
                        <div className="text-gray-300 text-base">{book.author}</div>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <button className="bg-[#DC143C] hover:bg-[#a10e2a] text-white px-3 py-1 rounded shadow text-sm font-semibold">Add to Read</button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded shadow text-sm font-semibold">Borrow</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Romance Category */}
            <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-4 md:p-6">
              <div className="w-full px-2 mb-4 flex">
                <div className="inline-block bg-[#2d2d2d] rounded-r-lg border-l-8 border-[#DC143C] px-6 py-2 shadow-md">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">Romance</h3>
                </div>
              </div>
              <div
                className="overflow-hidden w-full flex justify-center scroll-smooth no-scrollbar"
                ref={scrollRefs.romance}
                onScroll={() => handleScroll('romance')}
              >
                <div className="flex flex-row gap-8 min-w-[1200px] justify-center items-center mx-auto">
                  {romanceBooks.map((book) => (
                    <div key={book.title} className="flex flex-col items-center w-60 bg-[#232323] rounded-xl shadow-lg p-4 hover:scale-105 transition-transform">
                      <img src={book.cover} alt={book.title} className="w-40 h-60 object-cover rounded shadow mb-4 cursor-pointer" onClick={() => openModal(book.title)} />
                      <div className="text-center mb-2">
                        <div className="text-lg font-bold text-white">{book.title}</div>
                        <div className="text-gray-300 text-base">{book.author}</div>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <button className="bg-[#DC143C] hover:bg-[#a10e2a] text-white px-3 py-1 rounded shadow text-sm font-semibold">Add to Read</button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded shadow text-sm font-semibold">Borrow</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Sci-Fi Category */}
            <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-4 md:p-6">
              <div className="w-full px-2 mb-4 flex">
                <div className="inline-block bg-[#2d2d2d] rounded-r-lg border-l-8 border-[#DC143C] px-6 py-2 shadow-md">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">Sci-Fi</h3>
                </div>
              </div>
              <div
                className="overflow-hidden w-full flex justify-center scroll-smooth no-scrollbar"
                ref={scrollRefs.scifi}
                onScroll={() => handleScroll('scifi')}
              >
                <div className="flex flex-row gap-8 min-w-[1200px] justify-center items-center mx-auto">
                  {scifiBooks.map((book) => (
                    <div key={book.title} className="flex flex-col items-center w-60 bg-[#232323] rounded-xl shadow-lg p-4 hover:scale-105 transition-transform">
                      <img src={book.cover} alt={book.title} className="w-40 h-60 object-cover rounded shadow mb-4 cursor-pointer" onClick={() => openModal(book.title)} />
                      <div className="text-center mb-2">
                        <div className="text-lg font-bold text-white">{book.title}</div>
                        <div className="text-gray-300 text-base">{book.author}</div>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <button className="bg-[#DC143C] hover:bg-[#a10e2a] text-white px-3 py-1 rounded shadow text-sm font-semibold">Add to Read</button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded shadow text-sm font-semibold">Borrow</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Modal rendered outside scrollable content */}
      {modalOpen && modalBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
          <div className="bg-[#181818] rounded-xl shadow-2xl p-8 w-full max-w-md relative animate-modalFadeIn flex flex-col items-center">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none">&times;</button>
            {/* Book Cover */}
            <img
              src={
                modalBook === 'Meditations' ? 'https://covers.openlibrary.org/b/id/8231856-L.jpg' :
                modalBook === 'The Republic' ? 'https://covers.openlibrary.org/b/id/10523339-L.jpg' :
                modalBook === 'Beyond Good and Evil' ? 'https://covers.openlibrary.org/b/id/11153225-L.jpg' :
                modalBook === 'Critique of Pure Reason' ? 'https://covers.openlibrary.org/b/id/11153226-L.jpg' :
                modalBook === 'Nicomachean Ethics' ? 'https://covers.openlibrary.org/b/id/11153231-L.jpg' :
                modalBook === 'Thus Spoke Zarathustra' ? 'https://covers.openlibrary.org/b/id/11153232-L.jpg' :
                modalBook === 'Pride and Prejudice' ? 'https://covers.openlibrary.org/b/id/8228691-L.jpg' :
                modalBook === 'The Notebook' ? 'https://covers.openlibrary.org/b/id/11153223-L.jpg' :
                modalBook === 'Jane Eyre' ? 'https://covers.openlibrary.org/b/id/11153227-L.jpg' :
                modalBook === 'Me Before You' ? 'https://covers.openlibrary.org/b/id/11153228-L.jpg' :
                modalBook === 'Outlander' ? 'https://covers.openlibrary.org/b/id/11153233-L.jpg' :
                modalBook === 'Gone with the Wind' ? 'https://covers.openlibrary.org/b/id/11153234-L.jpg' :
                modalBook === 'Dune' ? 'https://covers.openlibrary.org/b/id/10521213-L.jpg' :
                modalBook === "Ender's Game" ? 'https://covers.openlibrary.org/b/id/11153224-L.jpg' :
                modalBook === 'Neuromancer' ? 'https://covers.openlibrary.org/b/id/11153229-L.jpg' :
                modalBook === 'Foundation' ? 'https://covers.openlibrary.org/b/id/11153230-L.jpg' :
                modalBook === 'Snow Crash' ? 'https://covers.openlibrary.org/b/id/11153235-L.jpg' :
                modalBook === 'The Martian' ? 'https://covers.openlibrary.org/b/id/11153236-L.jpg' :
                ''
              }
              alt={modalBook}
              className="w-40 h-60 object-cover rounded shadow mb-4"
            />
            <h2 className="text-2xl font-bold text-white mb-2 text-center">{modalBook}</h2>
            <div className="text-gray-300 mb-2 text-center">{bookDetailsData[modalBook]?.description || 'No description available.'}</div>
            <div className="mb-4 text-gray-400">Quantity Available: <span className="text-white font-semibold">{bookDetailsData[modalBook]?.quantity ?? 'N/A'}</span></div>
            <div className="flex gap-3 justify-center w-full">
              <button className="bg-[#DC143C] hover:bg-[#a10e2a] text-white px-4 py-2 rounded shadow text-base font-semibold">Borrow Now</button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded shadow text-base font-semibold">Add to Read</button>
            </div>
          </div>
        </div>
      )}
    
      {/* ...existing code... */}
      <SectionFooter />
    </>
  );
}


export default Home