import React from "react";
import NavigationBar from "./Components/NavigationBar";
import HeroImage from "../assets/images/Hero.jpg";



const HomePage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-[600px] flex flex-col items-center text-white relative"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <NavigationBar />
        <h1
          className="text-5xl md:text-6xl font-bold drop-shadow-lg text-center mt-[100px]"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Welcome To The Reader’s Paradise
        </h1>
        <p className="text-2xl font-light text-center mt-[30px] mb-[50px] max-w-2xl mx-auto">
          Where Word Evaporates To Cloud Of Thoughts
        </p>
        <button className="bg-red-700 text-white h-12 w-[180px] rounded-full text-xl font-Regular flex items-center justify-center hover:bg-red-800">
          Borrow Now
        </button>
        
      </section>
    </div>
  );
};

export default HomePage;