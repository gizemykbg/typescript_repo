import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import Info from "./pages/Info";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addContact" element={<AddEdit />} />
          <Route path="/editContact/:id" element={<AddEdit />} />
          <Route path="/info/:id" element={<Info />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
