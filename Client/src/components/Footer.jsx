
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFooter(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showFooter) return null;

  return (
    <footer className="w-full bg-gray-900 text-white h-32 md:h-40 flex items-center justify-center mt-auto text-center fixed bottom-0 left-0 z-50 text-xs">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 w-full">
        <span className="text-sm md:text-base">&copy; {new Date().getFullYear()} Library Management System. All rights reserved.</span>
        <div className="flex gap-6 text-sm md:text-base">
          <a href="#" className="hover:underline">Terms &amp; Conditions</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Newsletter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
