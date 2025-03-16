import React from "react";
import { Typography, Box } from "@mui/material";

const Configuracion = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold">
        Configuración
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Ajusta los parámetros generales de la plataforma.
      </Typography>
    </Box>
  );
};

export default Configuracion;
