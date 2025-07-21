import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { jwtDecode } from "jwt-decode";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { NotebookTabsIcon, PlusIcon } from "lucide-react";

const NotesPage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = useAuthHeader();

  useEffect(() => {
    if (!token) {
      toast.error("No token found. Please login again.");
      return;
    }

    const jwt = token.split(" ")[1];
    const decodedToken = jwtDecode(jwt);

    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/all/${decodedToken.id}`, {
          headers: {
            Authorization: token,
          },
        });
        setNotes(res.data);
        setLoading(false);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl min-h-screen md:min-h-0 flex-grow mx-auto w-full p-4">
        {loading && (
          <>
            <div className="w-full mb-4 flex justify-between">
              <span className="skeleton h-10 w-56"></span>
              <span className="skeleton h-10 w-28"></span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="skeleton opacity-80 h-48"></div>
              <div className="skeleton opacity-80"></div>
              <div className="skeleton opacity-80"></div>
              <div className="skeleton opacity-80"></div>
              <div className="skeleton opacity-80"></div>
              <div className="skeleton opacity-80"></div>
            </div>
          </>
        )}
        {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !loading && !isRateLimited && (
          <>
            <div className="w-full mb-4 flex justify-between">
              <span className="text-neutral/90 text-3xl md:text-4xl font-bold select-none flex flex-row items-center gap-[4px] md:gap-[6px]">
                <NotebookTabsIcon className="relative size-6 md:size-8" /> My Notes
              </span>
              <Link to={"/notes/create"} className="btn btn-primary font-bold">
                <PlusIcon /> New Note
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default NotesPage;
