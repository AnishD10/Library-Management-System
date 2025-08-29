import React, { useEffect, useState } from "react";

const Home = () => {
  const [stats, setStats] = useState({
    books: 0,
    borrowers: 0,
    librarians: 0,
    records: 0,
    quantity: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [booksRes, borrowersRes, librariansRes, recordsRes] = await Promise.all([
          fetch("http://localhost:3000/api/books").then(res => res.json()),
          fetch("http://localhost:3000/api/borrowers").then(res => res.json()),
          fetch("http://localhost:3000/api/users?role=librarian").then(res => res.json()),
          fetch("http://localhost:3000/api/records").then(res => res.json()),
        ]);
        const totalBooks = booksRes.length;
        const totalBorrowers = borrowersRes.length;
        const totalLibrarians = librariansRes.length;
        const totalRecords = recordsRes.length;
        const totalQuantity = booksRes.reduce((sum, b) => sum + (b.quantity || 0), 0);

        setStats({
          books: totalBooks,
          borrowers: totalBorrowers,
          librarians: totalLibrarians,
          records: totalRecords,
          quantity: totalQuantity,
        });
      } catch (err) {
        setStats({
          books: 0,
          borrowers: 0,
          librarians: 0,
          records: 0,
          quantity: 0,
        });
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="bg-[#232323] rounded-lg shadow-lg p-8 flex flex-col items-center">
        <div className="text-4xl font-bold mb-2">{stats.books}</div>
        <div className="text-lg text-gray-300">Total Books</div>
      </div>
      <div className="bg-[#232323] rounded-lg shadow-lg p-8 flex flex-col items-center">
        <div className="text-4xl font-bold mb-2">{stats.borrowers}</div>
        <div className="text-lg text-gray-300">Total Borrowers</div>
      </div>
      <div className="bg-[#232323] rounded-lg shadow-lg p-8 flex flex-col items-center">
        <div className="text-4xl font-bold mb-2">{stats.librarians}</div>
        <div className="text-lg text-gray-300">Total Librarians</div>
      </div>
      <div className="bg-[#232323] rounded-lg shadow-lg p-8 flex flex-col items-center">
        <div className="text-4xl font-bold mb-2">{stats.records}</div>
        <div className="text-lg text-gray-300">Total Records</div>
      </div>
      <div className="bg-[#232323] rounded-lg shadow-lg p-8 flex flex-col items-center">
        <div className="text-4xl font-bold mb-2">{stats.quantity}</div>
        <div className="text-lg text-gray-300">Total Quantity</div>
      </div>
    </div>
  );
};

export default Home;