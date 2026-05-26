import React from "react";
import { useNavigate } from "react-router-dom";

function BotonCrear() {
  const navigate = useNavigate();

  const crear = () => {
    navigate("/FormularioCrear");
  };

  return (
    <button onClick={crear}>
      Crea una nueva reserva
    </button>
  );
}

export default BotonCrear;