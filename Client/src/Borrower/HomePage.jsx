import React from "react";
import NavigationBar from "./Components/NavigationBar";


const HomePage = () => {
    return (
        <div className="bg-black h-screen text-white">
                 {/* Hero Section */}
        <section className="bg-Hero bg-cover bg-center h-screen flex flex-col items-center text-white ">
            <NavigationBar />
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg text-center mt-[100px] " style={{fontFamily: "Merriweather, serif"}}>
            Welcome To The Reader’s Paradise
          </h1>
          <p className="text-2xl font-light text-center mt-[30px] mb-[50px] max-w-2xl mx-auto">
            Where Word Evaporates To Cloud Of Thoughts
          </p>
          <button className="bg-red-700 text-white h-12 w-[180px] rounded-full text-xl font-Regular flex items-center justify-center ">
            Borrow Now
          </button>
        </section>
        </div>
    );
}

export default HomePage;