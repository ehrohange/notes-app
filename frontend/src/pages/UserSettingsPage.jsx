import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { useState } from "react";
import api from "../lib/axios";

const UserSettingsPage = () => {
  const token = useAuthHeader();
  const decodedToken = jwtDecode(token);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      const res = await api.patch(
        `/users/${decodedToken.id}`,
        {
          password: oldPassword,
          newPassword: newPassword,
        },
        { headers: { Authorization: token } }
      );

      if (res.status === 200) {
        toast.success("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }

      if (res.status === 400) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary/10">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold">
            {decodedToken.firstName + " " + decodedToken.lastName}
          </h1>
          <p className="text-gray-600">Manage your account settings here.</p>
          <div className="w-full mt-4">
            {/* Tabs */}
            <div className="flex items-center ">
              <button className="bg-accent px-4 py-2 text-sm font-medium text-white rounded-tr-lg hover:bg-accent/70 focus:outline-none">
                Password
              </button>
            </div>
            <div className="border-accent border-l-[1px] border-b-[1px] rounded-bl-lg p-4 flex flex-col items-center">
              <p className="font-semibold">Update your password</p>
              <form onSubmit={handleUpdatePassword} className="w-full">
                <label className="label mt-2">
                  <span className="label-text">Old Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Old Password"
                  className="input input-bordered w-full"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <label className="label mt-2">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  placeholder="New Password"
                  className="input input-bordered w-full"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label className="label mt-2">
                  <span className="label-text">Confirm New Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="input input-bordered w-full"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full btn btn-primary mt-4 mb-2"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserSettingsPage;
