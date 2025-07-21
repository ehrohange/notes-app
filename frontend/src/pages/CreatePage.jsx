import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const token = useAuthHeader();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("No token found. Please login again.");
      return;
    }

    const jwt = token.split(" ")[1];
    const decodedToken = jwtDecode(jwt);

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required!");
      return;
    }

    setIsLoading(true);

    try {
      await api.post(
        `/notes/${decodedToken.id}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Note created successfully!");
      navigate("/notes");
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast!", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary/10 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/notes" className="btn btn-ghost mb-6 text-neutral/90">
            <ArrowLeftIcon className="size-5 mr-2" />
            Back to Notes
          </Link>
          <div className="card bg-base-100 border-b-4 border-base-200">
            <div className="card-body">
              <h2 className="card-title text-neutral/90 text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    value={title}
                    className="input input-bordered"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    value={content}
                    className="textarea textarea-bordered h-32"
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (<span className="flex items-center gap-1"><span className="loading loading-spinner loading-sm"></span><span>Creating...</span></span>) : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePage;
