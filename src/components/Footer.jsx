import React from "react";

import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <img
            src={logo}
            alt="Table Track"
            className="footer-logo"
          />

          <div>
            <h2>Taken</h2>
            <p>
              Plataforma para la gestión de reservas,
              organización de mesas y control del servicio.
            </p>
          </div>
        </div>

       
      </div>

      <div className="footer-bottom">
        © 2026  — Gestión de reservas Samuel Diaz
      </div>
    </footer>
  );
}

export default Footer;