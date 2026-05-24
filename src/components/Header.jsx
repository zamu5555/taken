import React from "react";

import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <img
            src={logo}
            alt="Table Track"
            className="logo-img"
          />

          <div>
            <h1>Taken</h1>
            <p>Gestión de reservas</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;