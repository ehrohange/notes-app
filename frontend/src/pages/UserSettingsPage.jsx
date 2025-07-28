import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserSettingsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">User Settings</h1>
          <p className="text-gray-600">
            This is where you can manage your user settings.
          </p>
          <p className="text-gray-600/60">Coming soon...</p>
          {/* Add your user settings form or components here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserSettingsPage;
