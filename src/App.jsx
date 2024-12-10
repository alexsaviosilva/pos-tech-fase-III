// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MenuForm from "./components/MenuForm";
import ViewPosts from "./components/ViewPosts";

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-blue-300">Nova Publicação</Link>
          </li>
          <li>
            <Link to="/view-posts" className="hover:text-blue-300">Ver Publicações</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<MenuForm />} />
          <Route path="/view-posts" element={<ViewPosts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
