import React from "react";
import "./Header.css";

export default function Header({ name = "Usuário", onLogout }) {
  return (
    <header className="header">
    
      <div className="logo-publica">
        <img src="/MB.jpg" alt="Logo" />
        <span>My Blog</span>
      </div>

      <div className="profile-menu">
        <span className="profile-name">{name}</span>
        <div className="logout-btn" onClick={onLogout}>
          Sair
        </div>
      </div>
    </header>
  );
}
