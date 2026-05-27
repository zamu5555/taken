import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";

function FormularioReserva() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombreCliente: "",
    fechaHora: "",
    cantidadPersonas: "",
    estado: "",
    mesa: "",
    telefono: "",
    observaciones: "",
  });

  const cambiarValor = (e) => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const guardarReserva = async (e) => {
    e.preventDefault();

    if (!formulario.nombreCliente || !formulario.cantidadPersonas) {
      Swal.fire({
        icon: "warning",
        title: "Campos obligatorios",
        text: "Debes completar nombre y cantidad de personas",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const nuevaReserva = {
      ...formulario,
      cantidadPersonas: Number(formulario.cantidadPersonas),
      mesa: Number(formulario.mesa),
    };

    try {
      await axios.post(
        "https://6a11e2223e35d0f37ee3ccc9.mockapi.io/reservas",
        nuevaReserva
      );

      await Swal.fire({
        icon: "success",
        title: "Reserva creada",
        text: "La reserva fue registrada correctamente",
        confirmButtonColor: "#2563eb",
      });

      navigate("/panel");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar la reserva",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-6">
            Crear Reserva
          </h2>

          <form onSubmit={guardarReserva}>
            <input
              type="text"
              name="nombreCliente"
              placeholder="Nombre del cliente"
              className="w-full border p-2 rounded mb-4"
              value={formulario.nombreCliente}
              onChange={cambiarValor}
              required
            />

            <input
              type="datetime-local"
              name="fechaHora"
              className="w-full border p-2 rounded mb-4"
              value={formulario.fechaHora}
              onChange={cambiarValor}
              required
            />

            <input
              type="number"
              name="cantidadPersonas"
              placeholder="Cantidad de personas"
              className="w-full border p-2 rounded mb-4"
              value={formulario.cantidadPersonas}
              onChange={cambiarValor}
              required
            />

            <select
              name="estado"
              className="w-full border p-2 rounded mb-4"
              value={formulario.estado}
              onChange={cambiarValor}
              required
            >
              <option value="">
                Seleccione estado
              </option>

              <option value="Confirmada">
                Confirmada
              </option>

              <option value="Pendiente">
                Pendiente
              </option>

              <option value="Cancelada">
                Cancelada
              </option>
            </select>

            <input
              type="number"
              name="mesa"
              placeholder="Número de mesa"
              className="w-full border p-2 rounded mb-4"
              value={formulario.mesa}
              onChange={cambiarValor}
              required
            />

            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              className="w-full border p-2 rounded mb-4"
              value={formulario.telefono}
              onChange={cambiarValor}
            />

            <input
              type="text"
              name="observaciones"
              placeholder="Observaciones"
              className="w-full border p-2 rounded mb-4"
              value={formulario.observaciones}
              onChange={cambiarValor}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded"
            >
              Guardar Reserva
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default FormularioReserva;