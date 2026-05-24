import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import router from "../router/Router";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [turno, setTurno] = useState("");

  const login = (e) => {
    e.preventDefault();

    if (!nombre || !turno) {
      alert("Debe ingresar todos los campos");
      return;
    }

    const host = {
      nombre,
      turno,
    };

    localStorage.setItem("host", JSON.stringify(host));

    navigate("/panel");
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={login}
          className="bg-white p-8 rounded-lg shadow-md w-96"
        >
          <h1 className="text-2xl font-bold text-center mb-6">
            Registra tu ingreso
          </h1>

          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full border p-2 rounded mb-4"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <select
            className="w-full border p-2 rounded mb-4"
            value={turno}
            onChange={(e) => setTurno(e.target.value)}
          >
            <option value="">Seleccione turno</option>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Ingresar
          </button>
        </form>
      </div>

      <Footer/>
    </>
  );
}

export default Login;