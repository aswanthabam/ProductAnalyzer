// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ToastProvider from "./context/ToastContext.tsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import DialogProvider from "./context/DialogContext.tsx";
import RefreshProvider from "./context/RefreshContext.tsx";
import NavbarProvider from "./context/NavbarContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastProvider>
      <DialogProvider>
        <RefreshProvider>
          <NavbarProvider>
            <App />
          </NavbarProvider>
        </RefreshProvider>
      </DialogProvider>
    </ToastProvider>
  </BrowserRouter>
);
