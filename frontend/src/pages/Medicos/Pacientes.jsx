import React from "react";
import { Typography, Box } from "@mui/material";

const Pacientes = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold">
        Pacientes
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Lista de tus pacientes registrados.
      </Typography>
    </Box>
  );
};

export default Pacientes;
