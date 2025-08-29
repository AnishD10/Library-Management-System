import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import Home from "./Dashboard/Home";
import Profile from "./Dashboard/Profile";


const LibrarianHome = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

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

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const showDashboard = location.pathname === "/librarian" || location.pathname === "/librarian/";
    const showProfile = location.pathname === "/librarian/profile";

    return (
        <div className="bg-black min-h-screen text-white flex flex-col">
            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="w-80 bg-[#181818] min-h-screen flex flex-col py-8 px-4">
                    <h1 className="text-3xl font-bold mb-10 text-center">Librarian Dashboard</h1>
                    <nav className="flex flex-col gap-4 mb-8">
                        <Link to="" className={`hover:bg-[#232323] px-4 py-2 rounded transition ${showDashboard ? "bg-[#232323]" : ""}`}>Dashboard</Link>
                        <Link to="books" className="hover:bg-[#232323] px-4 py-2 rounded transition">Manage Books</Link>
                        <Link to="borrowers" className="hover:bg-[#232323] px-4 py-2 rounded transition">Manage Borrowers</Link>
                        <Link to="records" className="hover:bg-[#232323] px-4 py-2 rounded transition">Manage Records</Link>
                        <Link to="profile" className={`hover:bg-[#232323] px-4 py-2 rounded transition ${showProfile ? "bg-[#232323]" : ""}`}>Profile</Link>
                    </nav>
                    <button
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded mt-auto"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
                {/* Main Content */}
                <div className="flex-1 px-8 py-8">
                    {showDashboard ? <Home /> : showProfile ? <Profile /> : <Outlet />}
                </div>
            </div>
        </div>
    );
};

export default LibrarianHome;