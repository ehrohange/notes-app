import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AuthProvider
      authType="localstorage"
      authName="_auth"
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    > */}
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    {/* </AuthProvider> */}
  </StrictMode>
);
