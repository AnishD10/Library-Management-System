import React from "react";

const SectionFooter = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 mt-12">
      <div className="container mx-auto px-4 flex flex-col items-center gap-2">
        <span className="font-bold text-lg">Library Management System</span>
        <span className="text-xs">&copy; {new Date().getFullYear()} All rights reserved.</span>
      </div>
    </footer>
  );
};

export default SectionFooter;
