import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow w-full max-w-6xl px-6 flex flex-col-reverse md:flex-row items-center justify-center gap-16 mx-auto py-20">
        <img
          src={`/graphics/graphic-1.webp`}
          alt="graphic"
          className="aspect-square max-w-96 md:size-1/2 md:max-w-none"
        />
        <div className="flex flex-col gap-5 text-center items-center md:text-start md:items-start">
          <div className="flex flex-col text-neutral/90 text-4xl font-bold">
            <h1>
              Welcome to Buzznotes!
            </h1>
            <h1>
              Notes That Stick Like Honey
            </h1>
          </div>
          <p className="text-xl">
            From quick thoughts to deep ideas, collect them all in your hive.
            Sweet, simple, and always buzzing with productivity.
          </p>

          <Link to={"/login"} className="btn btn-primary w-full max-w-52 hover:scale-[1.05]">
            <span>Get Started!</span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
