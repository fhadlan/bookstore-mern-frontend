import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<div>Home</div>} />
          <Route path="about" element={<div>About</div>} />
          <Route path="orders" element={<div>Orders</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
