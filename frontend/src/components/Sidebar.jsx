import { MenuIcon } from "lucide-react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
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
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li onClick={handleLogout}>
            <span className="bg-red-600 text-white pl-6 py-3 hover:bg-red-500 transition-colors duration-200">
              Logout
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
