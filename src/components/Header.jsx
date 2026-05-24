import React from "react";
import { useLocation } from "react-router-dom";

import logo from "../assets/logo.png";
import BotonCerrarSesion from "./BotonCerrarSesion";

function Header() {
  const location = useLocation();
  const estaEnPanel = location.pathname === "/panel";

  return (
    <header className="header">
      <div className="header-container">

        <div className="logo-section">
          <img src={logo} alt="Table Track" className="logo-img" />

          <div>
            <h1>Taken</h1>
            <p>Gestión de reservas</p>
          </div>
        </div>

        <div className="header-right">
          {estaEnPanel && <BotonCerrarSesion />}
        </div>

      </div>
    </header>
  );
}

export default Header;