import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

const LibrarianHome = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const res = await fetch("http://localhost:3000/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setUser(data);
            } catch (err) {
                setUser(null);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="bg-black min-h-screen text-white">
            <div className="flex flex-col items-center py-8">
                <h1 className="text-4xl font-bold mb-2">Librarian Dashboard</h1>
                <h2 className="mb-4">Welcome, {user ? user.name : "..."}</h2>
                <div className="flex gap-4 mb-8">
                    <Link to="books">Manage Books</Link>
                    <Link to="borrowers">Manage Borrowers</Link>
                    <Link to="users">Manage Users</Link>
                    <Link to="records">Manage Records</Link>
            
                </div>
                <button
                    className="bg-red-600 px-4 py-2 rounded"
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }}
                >
                    Logout
                </button>
            </div>
            <div className="px-4">
                <Outlet />
            </div>
        </div>
    );
};

export default LibrarianHome;