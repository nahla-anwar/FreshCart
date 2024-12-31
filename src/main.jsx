import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fontsource/encode-sans-expanded";
import "@fontsource-variable/cairo";
import "react-image-gallery/styles/css/image-gallery.css";
import "flowbite/dist/flowbite.min.js";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
