import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Professor from "./Professor";
import NovaPublicacao from "./NovaPublicacao";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Professor />} />
        <Route path="/nova-publicacao" element={<NovaPublicacao />} />
      </Routes>
    </Router>
  );
}
