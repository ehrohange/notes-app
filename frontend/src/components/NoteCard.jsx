import React from 'react'
import { Link } from 'react-router-dom'
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from '../lib/utils';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const NoteCard = ({note, setNotes}) => {

  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure to delete this note?")) return;

    try {
      api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter(note => note._id !== id)); // Get rid of the deleted id.
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note: ", error);
      toast.error("Failed to delete note.");
    }
  }

  return (
    <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all
    duration-200 border-b-4 border-solid border-secondary overflow-clip'>
        <div className='card-body bg-primary'>
            <h3 className='font-bold text-lg text-base-content'>{note.title}</h3>
            <p className='font-medium text-base-content/70 line-clamp-3'>{note.content}</p>
            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content/60'>
                  {formatDate(new Date(note.createdAt))}
                </span>
                <div className='flex items-center gap-1'>
                  <PenSquareIcon className='size-4' />
                  <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, note._id)}><Trash2Icon className='size-4' /></button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard