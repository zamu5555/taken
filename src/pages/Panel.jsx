import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL =
  "https://6a11e2223e35d0f37ee3ccc9.mockapi.io/reservas";

function Panel() {
  const host =
    JSON.parse(localStorage.getItem("host")) || {};

  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerReservas = async () => {
    try {
      setLoading(true);

      const res = await fetch(API_URL);
      const data = await res.json();

      setReservas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setReservas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const buscarId = (reserva) => {
    const encontrada = reservas.find(
      (item) =>
        item.nombreCliente ===
          reserva.nombreCliente &&
        item.fechaHora === reserva.fechaHora &&
        item.mesa === reserva.mesa
    );

    return encontrada?.id;
  };

  const actualizarEstado = async (
    reserva,
    nuevoEstado
  ) => {
    try {
      const id = buscarId(reserva);

      if (!id) {
        Swal.fire(
          "Error",
          "No se encontró la reserva",
          "error"
        );
        return;
      }

      const res = await fetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...reserva,
            estado: nuevoEstado,
          }),
        }
      );

      if (!res.ok) throw new Error();

      await obtenerReservas();

      Swal.fire(
        "Actualizada",
        `La reserva quedó en estado "${nuevoEstado}"`,
        "success"
      );
    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        "No se pudo actualizar",
        "error"
      );
    }
  };

  const editarReserva = async (reserva) => {
    const { value: values } =
      await Swal.fire({
        title: "Editar reserva",
        html: `
          <input
            id="fecha"
            class="swal2-input"
            value="${reserva.fechaHora}"
            placeholder="Fecha y hora"
          />

          <input
            id="cantidad"
            type="number"
            class="swal2-input"
            value="${reserva.cantidadPersonas}"
            placeholder="Cantidad"
          />
        `,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",

        preConfirm: () => {
          const fecha =
            document.getElementById(
              "fecha"
            ).value;

          const cantidad =
            document.getElementById(
              "cantidad"
            ).value;

          if (
            !fecha.trim() ||
            !cantidad
          ) {
            Swal.showValidationMessage(
              "Todos los campos son obligatorios"
            );
            return false;
          }

          return {
            fechaHora: fecha,
            cantidadPersonas:
              Number(cantidad),
          };
        },
      });

    if (!values) return;

    try {
      const id = buscarId(reserva);

      const res = await fetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...reserva,
            ...values,
          }),
        }
      );

      if (!res.ok) throw new Error();

      await obtenerReservas();

      Swal.fire(
        "Actualizada",
        "La reserva fue editada",
        "success"
      );
    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        "No se pudo editar",
        "error"
      );
    }
  };

  const cambiarEstado = async (
    reserva,
    nuevoEstado
  ) => {
    const result =
      await Swal.fire({
        title: `¿Cambiar a ${nuevoEstado}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

    if (result.isConfirmed) {
      await actualizarEstado(
        reserva,
        nuevoEstado
      );
    }
  };

  const eliminarReserva = async (
    reserva
  ) => {
    const result =
      await Swal.fire({
        title:
          "¿Estás seguro de cancelar esta reserva?",
        text:
          "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText:
          "Sí, cancelar",
        cancelButtonText: "No",
      });

    if (!result.isConfirmed) return;

    try {
      const id = buscarId(reserva);

      if (!id) {
        Swal.fire(
          "Error",
          "No se encontró la reserva",
          "error"
        );
        return;
      }

      const res = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error();

      await obtenerReservas();

      Swal.fire(
        "Cancelada",
        "La reserva fue eliminada correctamente",
        "success"
      );
    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        "No se pudo eliminar",
        "error"
      );
    }
  };

  const normalizarEstado = (
    estado
  ) => estado?.toLowerCase().trim();

  const reservasEnEspera =
    reservas.filter(
      (r) =>
        normalizarEstado(
          r.estado
        ) === "en espera"
    );

  const reservasConfirmadas =
    reservas.filter(
      (r) =>
        normalizarEstado(
          r.estado
        ) === "confirmada"
    );

  const reservasFinalizadas =
    reservas.filter(
      (r) =>
        normalizarEstado(
          r.estado
        ) === "finalizada"
    );

  return (
    <>
      <Header />

      <main className="panel-container">
        <section className="welcome-box">
          <h2>
            Bienvenido,{" "}
            {host.nombre || "Host"}
          </h2>

          <p>
            Reservas del restaurante
          </p>
        </section>

        <section className="cards">
          <div className="card">
            <h3>{reservas.length}</h3>
            <p>Total reservas</p>
          </div>

          <div className="card">
            <h3>
              {
                reservasEnEspera.length
              }
            </h3>
            <p>En espera</p>
          </div>

          <div className="card">
            <h3>
              {
                reservasConfirmadas.length
              }
            </h3>
            <p>Confirmadas</p>
          </div>

          <div className="card">
            <h3>
              {
                reservasFinalizadas.length
              }
            </h3>
            <p>Finalizadas</p>
          </div>
        </section>

        <section className="reservas-box">
          <h3>Reservas</h3>

          {loading ? (
            <p>Cargando...</p>
          ) : reservas.length === 0 ? (
            <p>
              No hay reservas
              registradas
            </p>
          ) : (
            reservas.map(
              (r, index) => (
                <div
                  className="reserva-item"
                  key={`${r.id}-${index}`}
                >
                  <strong>
                    {r.nombreCliente}
                  </strong>

                  <p>
                    {r.fechaHora}
                  </p>

                  <p>
                    {
                      r.cantidadPersonas
                    }{" "}
                    personas
                  </p>

                  <p>
                    Mesa {r.mesa}
                  </p>

                  <p>
                    {r.telefono}
                  </p>

                  <p>
                    {
                      r.observaciones
                    }
                  </p>

                  <span>
                    {r.estado}
                  </span>

                  <div className="acciones">
                    <button
                      onClick={() =>
                        editarReserva(
                          r
                        )
                      }
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        cambiarEstado(
                          r,
                          "Confirmada"
                        )
                      }
                    >
                      Confirmar
                    </button>

                    <button
                      onClick={() =>
                        cambiarEstado(
                          r,
                          "Finalizada"
                        )
                      }
                    >
                      Finalizar
                    </button>

                    <button
                      onClick={() =>
                        cambiarEstado(
                          r,
                          "Cancelada"
                        )
                      }
                    >
                      Cancelar
                    </button>

                    <button
                      onClick={() =>
                        eliminarReserva(
                          r
                        )
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )
            )
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Panel;