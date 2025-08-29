import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

const Profile = () => {
  const [librarian, setLibrarian] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setLibrarian({
        name: decoded.name || "Librarian Name",
        email: decoded.email || "librarian@email.com",
        role: decoded.role || "Librarian",
        username: decoded.username || "-",
        phone: decoded.phone || "-",
        createdAt: decoded.createdAt || null,
        avatar: decoded.avatar,
      });
    } catch (err) {
      setLibrarian(null);
    }
  }, []);

  if (!librarian) {
    return (
      <div className="flex justify-center items-center h-full text-gray-400">
        Loading librarian details...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-[#232323] rounded-xl shadow-lg p-8 mt-8 text-white">
      <div className="flex flex-col items-center mb-8">
        <img
          src={librarian.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
          alt="Librarian avatar"
          className="w-24 h-24 rounded-full mb-4"
        />
        <div className="text-2xl font-bold">{librarian.name}</div>
        <div className="text-gray-400">{librarian.email}</div>
        <div className="text-gray-400 mt-2">Role: {librarian.role}</div>
      </div>
      <div className="space-y-2">
        <div>
          <span className="font-semibold">Username:</span> {librarian.username}
        </div>
        <div>
          <span className="font-semibold">Phone:</span> {librarian.phone}
        </div>
        <div>
          <span className="font-semibold">Joined:</span> {librarian.createdAt ? new Date(librarian.createdAt).toLocaleDateString() : "-"}
        </div>
      </div>
    </div>
  );
};

export default Profile;