import { PlusIcon } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const location = useLocation();
  const currentLocation = location.pathname.split("/").filter(Boolean).pop();

  return (
    <header className={`border-b-base-content/10 mb-10 ${currentLocation !== "login" && currentLocation !== "" && "bg-neutral"}`}>
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to={`/`} className="flex items-center space-x-1">
            <img
              src="/icons/logo.webp"
              alt="logo"
              className="size-10 object-contain"
            />
            <h1
              className="text-4xl font-bold text-primary tracking-tight pt-2"
              style={{ textShadow: "0 2px 0 rgba(0, 0, 0, 0.5)" }}
            >
              Buzznotes
            </h1>
          </Link>
          {!currentLocation && (
            <Link to={"/login"} className="btn btn-primary w-full max-w-40">
              <span>Login</span>
            </Link>
          )}
          {/* <div>
            <Sidebar />
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
