import React, { useState } from "react";

export default function Header({ name = "Usuário", onLogout }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <header className="header">
      <div className="logo-publica">
        <img src="/MB.jpg" alt="Logo" />
        <span>My Blog</span>
      </div>
      <div className="profile-menu">
        <span onClick={toggleDropdown} className="profile-name">
          {name}
        </span>
        <img
          src="/user.svg"
          alt="User Icon"
          className="profile-icon"
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <div className="menu-dropdown">
            <p onClick={onLogout}>Sair</p>
          </div>
        )}
      </div>
    </header>
  );
}
