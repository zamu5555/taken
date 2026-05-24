import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BotonCerrarSesion from "../components/BotonCerrarSesion";
const API_URL = "https://6a11e2223e35d0f37ee3ccc9.mockapi.io";

function Panel() {
  const host = JSON.parse(localStorage.getItem("host")) || {};

  const [reservas, setReservas] = useState([]);

  const obtenerReservas = async () => {
    const res = await fetch(`${API_URL}/reservas`);
    return await res.json();
  };

  useEffect(() => {
    const cargarReservas = async () => {
      const data = await obtenerReservas();
      setReservas(data);
    };

    cargarReservas();
  }, []);

  const normalizarEstado = (estado) =>
    estado?.toLowerCase().trim();

  const reservasEnEspera = reservas.filter(
    (r) => normalizarEstado(r.estado) === "en espera"
  );

  const reservasConfirmadas = reservas.filter(
    (r) => normalizarEstado(r.estado) === "confirmada"
  );

  const reservasFinalizadas = reservas.filter(
    (r) => normalizarEstado(r.estado) === "finalizada"
  );

  return (
    <>
      <Header />

      <main className="panel-container">

        <section className="welcome-box">
          <h2>Bienvenido, {host.nombre || "Host"}</h2>
          <p>Reservas del restaurante</p>
        </section>

        <section className="cards">

          <div className="card">
            <h3>{reservas.length}</h3>
            <p>Total reservas</p>
          </div>

          <div className="card">
            <h3>{reservasEnEspera.length}</h3>
            <p>En espera</p>
          </div>

          <div className="card">
            <h3>{reservasConfirmadas.length}</h3>
            <p>Confirmadas</p>
          </div>

          <div className="card">
            <h3>{reservasFinalizadas.length}</h3>
            <p>Finalizadas</p>
          </div>

        </section>

        <section className="reservas-box">
          <h3>Reservas</h3>

          {reservas.length === 0 ? (
            <p>No hay reservas registradas</p>
          ) : (
            reservas.map((r) => (
              <div className="reserva-item" key={r.id}>
                <strong>{r.nombreCliente}</strong>
                <p>{r.fechaHora}</p>
                <p>{r.cantidadPersonas} personas</p>
                <p>Mesa {r.mesa}</p>
                <p>{r.telefono}</p>
                <p>{r.observaciones}</p>
                <span>{r.estado}</span>
              </div>
            ))
          )}

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Panel;