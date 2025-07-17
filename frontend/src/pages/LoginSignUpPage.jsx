import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoginSignUpPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow w-full max-w-6xl px-6 flex flex-col-reverse md:flex-row items-center justify-center gap-16 mx-auto py-10">
        <img
          src={`/graphics/graphic-${isLogin ? "1" : "2"}.webp`}
          alt="graphic"
          className="aspect-square max-w-96 md:size-1/2 md:max-w-none"
        />
        <div className="flex flex-col gap-5 w-full max-w-96">
          <div className="flex flex-col text-neutral/90 text-4xl font-bold select-none">
            <h1>
              {isLogin ? "Hello there!" : "Hi there!"}
            </h1>
            <h1>
              {isLogin ? "Welcome back." : "Glad to see 'ya."}
            </h1>
          </div>
          <fieldset className="fieldset space-y-1">
            <legend className="fieldset-legend select-none">
              Email Address
            </legend>
            <input
              type="email"
              className="input bg-neutral/5 w-full"
              placeholder="Email Address"
            />
          </fieldset>
          {!isLogin && (
            <>
              <fieldset className="fieldset space-y-1">
                <legend className="fieldset-legend select-none">
                  First Name
                </legend>
                <input
                  type="text"
                  className="input bg-neutral/5 w-full"
                  placeholder="First Name"
                />
              </fieldset>
              <fieldset className="fieldset space-y-1">
                <legend className="fieldset-legend select-none">
                  Last Name
                </legend>
                <input
                  type="text"
                  className="input bg-neutral/5 w-full"
                  placeholder="Last Name"
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset space-y-1">
            <legend className="fieldset-legend select-none">Password</legend>
            <input
              type="password"
              className="input bg-neutral/5 w-full"
              placeholder="Password"
            />
          </fieldset>
          {!isLogin && (
            <fieldset className="fieldset space-y-1">
              <legend className="fieldset-legend select-none">
                Confirm Password
              </legend>
              <input
                type="password"
                className="input bg-neutral/5 w-full"
                placeholder="Confirm Password"
              />
            </fieldset>
          )}
          <button className="btn btn-primary">{isLogin ? "Buzz In!" : "Submit"}</button>
          <p
            className={`text-center ${
              isLogin
                ? "select-none"
                : "text-blue-950 cursor-pointer hover:text-blue-800 underline"
            }`}
            onClick={() => {
              !isLogin && setIsLogin(true);
            }}
          >
            {isLogin
              ? "Don't have an account yet?"
              : "Already have an account?"}
          </p>
          {isLogin && (
            <button
              className="btn btn-neutral"
              onClick={() => setIsLogin(false)}
            >
              Create an account
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginSignUpPage;
