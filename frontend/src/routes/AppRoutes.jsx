import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Pacientes from "../pages/Pacientes/Pacientes";
import ProtectedRoute from "../pages/ProtectedRoute";
import Medicos from "../pages/Medicos/Medicos";
import Administrador from "../pages/Administrador/Administrador";

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute role="paciente" />}>
          <Route path="/paciente/*" element={<Pacientes />} />
        </Route>

        <Route element={<ProtectedRoute role="medico" />}>
          <Route path="/medico/*" element={<Medicos />} />
        </Route>

        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin/*" element={<Administrador />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}
