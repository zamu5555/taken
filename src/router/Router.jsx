import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Panel from "../pages/Panel";
import FormularioReserva from "../pages/FormularioReserva";

function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Login />} />
            <Route
                path="/panel"
                element={<Panel />} />
            <Route
                path="FormularioCrear"
                element={<FormularioReserva/>}/>
        </Routes>
    );
}

export default AppRoutes;