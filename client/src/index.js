import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Modal from "react-modal";

import App from "./components/App/App";

import "./styles/index.css";

Modal.setAppElement("#root");

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
