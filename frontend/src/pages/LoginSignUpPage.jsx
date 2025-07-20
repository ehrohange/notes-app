import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../lib/axios";

const LoginSignUpPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Set values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useSignIn();

  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const clearInputs = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
    return;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email address is required.");
      return;
    }
    if (!firstName.trim()) {
      toast.error("First Name is required.");
      return;
    }
    if (!lastName.trim()) {
      toast.error("Last Name is required.");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Email must be valid.");
      return;
    }
    if (!password.trim()) {
      toast.error("Password is required.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const success = await api.post(
        "/users/create",
        {
          email,
          firstName,
          lastName,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (success) {
        toast.success(
          "Signed up successfully! A verification link has been sent to your email."
        );
        setIsLogin(true);
        clearInputs();
        setIsLoading(false);
        return;
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Sorry. Something went wrong");
      }
      setIsLoading(false);
      return;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email address is required.");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Email must be valid.");
      return;
    }
    if (!password.trim()) {
      toast.error("Password is required.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await api.post("/auth/login", {
        email: email,
        password: password,
      });

      const data = res.data;

      if (data.message && data.token === undefined) {
        toast.error(data.message);
        return;
      }

      const success = signIn({
        auth: {
          token: data.token,
          type: "Bearer",
        },
        expiresIn: 60 * 4,
        authState: { token: data.token },
      });

      if (success) {
        toast.success("Logged in successfully!");
        navigate("/notes");
        setIsLoading(false);
      } else {
        toast.error("Login failed.");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow w-full max-w-6xl px-6 flex flex-col-reverse md:flex-row items-center justify-center gap-16 mx-auto py-10">
        <img
          src={`/graphics/graphic-${isLogin ? "1" : "2"}.webp`}
          alt="graphic"
          className="aspect-square max-w-96 md:size-1/2 md:max-w-none"
        />
        <form
          onSubmit={isLogin ? handleLogin : handleSignUp}
          className="flex flex-col gap-5 w-full max-w-96"
        >
          <div className="flex flex-col text-neutral/90 text-4xl font-bold select-none">
            <h1>{isLogin ? "Hello there!" : "Hi there!"}</h1>
            <h1>{isLogin ? "Welcome back." : "Glad to see 'ya."}</h1>
          </div>
          <fieldset className="fieldset space-y-1">
            <legend className="fieldset-legend select-none">
              Email Address
            </legend>
            <input
              type="email"
              className="input bg-neutral/5 w-full"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              autoComplete={isLogin ? "email" : "new-email"}
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
                  name="fistName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  autoComplete={"off"}
                />
              </fieldset>
              <fieldset className="fieldset space-y-1">
                <legend className="fieldset-legend select-none">
                  Last Name
                </legend>
                <input
                  type="text"
                  className="input bg-neutral/5 w-full"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  autoComplete={"off"}
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset space-y-1">
            <legend className="fieldset-legend select-none">Password</legend>
            <input
              type="password"
              className="input bg-neutral/5 w-full"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete={isLogin ? "current-password" : "new-password"}
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
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                autoComplete={"off"}
              />
            </fieldset>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLogin && !isLoading && "Buzz In!"}
            {!isLogin && !isLoading && "Submit"}
            {isLogin && isLoading && (
              <>
                <span>Buzz In!</span>
                <span className="loading loading-spinner loading-sm"></span>
              </>
            )}
            {!isLogin && isLoading && (
              <>
                <span>Submit</span>
                <span className="loading loading-spinner loading-sm"></span>
              </>
            )}
          </button>
          <p
            className={`text-center ${
              isLogin
                ? "select-none"
                : "text-blue-950 cursor-pointer hover:text-blue-800 underline"
            }`}
            onClick={() => {
              !isLogin && setIsLogin(true);
              clearInputs();
            }}
          >
            {isLogin
              ? "Don't have an account yet?"
              : "Already have an account?"}
          </p>
          {isLogin && (
            <button
              className="btn btn-neutral"
              onClick={() => {
                setIsLogin(false);
                clearInputs();
              }}
            >
              Create an account
            </button>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginSignUpPage;
