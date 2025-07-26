import { MenuIcon, User, User2, User2Icon } from "lucide-react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const Sidebar = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const token = useAuthHeader();

  const [decodedToken, setDecodedToken] = React.useState(null);

  useEffect(() => {
    const decodeToken = () => {
      if (!token) return;
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error(error);
      }
    };
    decodeToken();
  }, [token]);

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="relative drawer drawer-end">
      {/* ✅ Single controlling checkbox for both drawer and icon swap */}
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle peer hidden"
      />

      <div className="drawer-content">
        {/* Button to open/close drawer and toggle icon */}
        <label
          htmlFor="my-drawer-4"
          className="btn btn-ghost btn-circle swap swap-rotate text-primary peer-checked/swap"
        >
          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>

      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-neutral/90 font-medium text-base-content min-h-full w-80 p-4 space-y-2 pt-6">
          <li className="text-neutral/90 text-xl w-full overflow-hidden font-semibold py-1 pl-1 flex items-center gap-2 flex-nowrap flex-row mb-6">
            <User2Icon className="size-6 p-0 text-accent" />
            <span className="pt-1 px-0 pb-0 w-60 overflow-hidden whitespace-nowrap truncate ">
              {!decodedToken ? "User" : decodedToken.firstName}
            </span>
          </li>
          <li className="w-full">
            <Link to={"/"} className="w-full hover:bg-neutral/40 hover:text-white">
              <span className="text-lg pl-2 py-1">Settings</span>
            </Link>
          </li>
          <li className="w-full">
            <Link to={"/"} className="w-full hover:bg-neutral/40 hover:text-white">
              <span className="text-lg pl-2 py-1">Settings</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <span className="text-lg hover:text-white pl-6 py-3 hover:bg-red-500 transition-colors duration-200">
              Logout
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
