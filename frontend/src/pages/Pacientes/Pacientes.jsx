import React from "react";
import { Box, Typography } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import SideNav from "./SideNav";
import BuscarMedicos from "./BuscarMedicos";
import CitasActivas from "./CitasActivas";
import Perfil from "./Perfil";
import AgendarCita from "./AgendarCIta";
import HistorialCitas from "../../components/HistorialCita";

const Pacientes = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* SideNav */}
      <SideNav />

      {/* Contenido Dinámico */}
      <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
        <Routes>
          <Route path="medicos" element={<BuscarMedicos />} />
          <Route path="agendar-cita" element={<AgendarCita />} />
          <Route path="citas" element={<CitasActivas />} />
          <Route path="historial" element={<HistorialCitas />} />
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

export default Pacientes;
