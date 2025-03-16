import React from "react";
import { Box, Typography } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import SideNavMedicos from "./SidenavMedicos";
import CitasPendientes from "./CitasPendientes";
import Pacientes from "./Pacientes";
import Perfil from "./PerfilMedico";
import EstablecerHorario from "./EstablecerHorario";
import HistorialCitasMedico from "./HistorialCitasMedico";

const Medicos = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* SideNav */}
      <SideNavMedicos />

      {/* Contenido Dinámico */}
      <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
        <Routes>
          <Route path="citas-pendientes" element={<CitasPendientes />} />
          <Route path="pacientes" element={<Pacientes />} />
          <Route path="horario" element={<EstablecerHorario />} />
          <Route path="historial" element={<HistorialCitasMedico />} />
          <Route path="perfil" element={<Perfil />} />
          <Route
            path="/"
            element={<Typography variant="h4">Selecciona una opción del menú</Typography>}
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default Medicos;
