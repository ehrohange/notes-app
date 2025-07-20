import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import {
  ArrowLeftIcon,
  Loader,
  LoaderIcon,
  SaveIcon,
  Trash2Icon,
} from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { jwtDecode } from "jwt-decode";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const token = useAuthHeader();

  const jwt = token.split(" ")[1]; // Remove "Bearer " prefix
  const decodedToken = jwtDecode(jwt);

  useEffect(() => {
    if (!token) {
      toast.error("No token found. Please login again.");
      return;
    }
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${decodedToken.id}/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch the note.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      toast.success("Note deleted");
      navigate("/notes");
    } catch (error) {
      toast.error("Error in deleting note.");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields are required!");
      return;
    }
    try {
      setSaving(true);
      await api.patch(`/notes/update/${id}`, note, {
        headers: {
          Authorization: token,
        },
      });
      toast.success("Note updated successfully!");
      navigate("/notes");
    } catch (error) {
      toast.error("Failed to update note.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/notes" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5 mr-2" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Write your note title here..."
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className={`btn btn-primary ${saving && "animate-pulse"}`}
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>{" "}
                      Saving...
                    </>
                  ) : (
                    <>
                      <SaveIcon className="size-5" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NoteDetailPage;
