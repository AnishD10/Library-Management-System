import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:3000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">This is Borrower home</h1>
        <h2>This is {user ? user.name : "..."}</h2>
        <button onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}>logout</button>
      </div>
    </div>
  );
};

export default Home;