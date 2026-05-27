import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Panel from "../pages/Panel";
import FormularioReserva from "../pages/FormularioReserva";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/panel" element={<Panel />} />
            <Route path="/formulario-crear" element={<FormularioReserva />} />
        </Routes>
    );
}