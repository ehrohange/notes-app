import React from "react";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import NotesPage from "./pages/NotesPage";
import HomePage from "./pages/HomePage";
import LoginSignUpPage from "./pages/LoginSignUpPage";
import { RequireAuth } from "react-auth-kit";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 bg-white"></div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginSignUpPage />} />

        {/* Protected Routes */}
        <Route
          path="/create"
          element={
            <RequireAuth loginPath="/login">
              <CreatePage />
            </RequireAuth>
          }
        />
        <Route
          path="/note/:id"
          element={
            <RequireAuth loginPath="/login">
              <NoteDetailPage />
            </RequireAuth>
          }
        />
        <Route
          path="/notes"
          element={
            <RequireAuth loginPath="/login">
              <NotesPage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
