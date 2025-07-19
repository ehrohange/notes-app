import React from "react";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import NotesPage from "./pages/NotesPage";
import HomePage from "./pages/HomePage";
import LoginSignUpPage from "./pages/LoginSignUpPage";
import RequireAuth from "react-auth-kit";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 bg-white"></div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginSignUpPage />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/note/:id" element={<NoteDetailPage />} />
          <Route path="/notes/create" element={<CreatePage />} />
          <Route path="/notes" element={<NotesPage />} />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
