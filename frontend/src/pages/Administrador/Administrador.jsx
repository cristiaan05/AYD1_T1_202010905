import React from "react";
import { Box, Typography } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import SideNavAdministrador from "./SideNavAdmin";
import Dashboard from "./Dashboard";
import GestionUsuarios from "./GestionUsuarios";
import Configuracion from "./Configuracion";
import ListadoUsuarios from "./ListadoUsuarios";

const Administrador = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* SideNav */}
      <SideNavAdministrador />

      {/* Contenido Dinámico */}
      <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="usuarios" element={<GestionUsuarios />} />
          <Route path="listadoUsuarios" element={<ListadoUsuarios />} />
          <Route path="configuracion" element={<Configuracion />} />
          <Route
            path="/"
            element={<Typography variant="h4">Selecciona una opción del menú</Typography>}
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default Administrador;
