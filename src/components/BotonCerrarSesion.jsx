import React from "react";
import { useNavigate } from "react-router-dom";

function BotonCerrarSesion() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("host");
    navigate("/");
  };

  return (
    <button onClick={cerrarSesion}>
      Cerrar sesión
    </button>
  );
}

export default BotonCerrarSesion;