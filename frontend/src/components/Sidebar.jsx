import { MenuIcon } from "lucide-react";
import React from "react";

const Sidebar = () => {
    
  return (
    <div className="relative drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost">
          <MenuIcon className="text-neutral size-10" />
        </label>
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <span className="bg-red-600 text-white pl-6 py-3 hover:bg-red-500 transition-colors duration-200">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
