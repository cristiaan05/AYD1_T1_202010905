import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Chip,
} from "@mui/material";

const HistorialCitasMedico = () => {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Simulación de API: Obtener citas pasadas del médico
    setTimeout(() => {
      const historial = [
        {
          id: 1,
          fecha: "2024-03-15",
          hora: "09:00 AM",
          paciente: "Carlos Ramírez",
          estado: "Atendido",
        },
        {
          id: 2,
          fecha: "2024-03-10",
          hora: "11:00 AM",
          paciente: "Ana Gómez",
          estado: "Cancelado por el paciente",
        },
        {
          id: 3,
          fecha: "2024-02-28",
          hora: "03:00 PM",
          paciente: "Javier López",
          estado: "Atendido",
        },
        {
          id: 4,
          fecha: "2024-02-15",
          hora: "10:00 AM",
          paciente: "Andrea Pérez",
          estado: "Cancelado por el médico",
        },
      ];

      setCitas(historial);
      setCargando(false);
    }, 2000);
  }, []);

  // Función para obtener color del estado
  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Atendido":
        return "success";
      case "Cancelado por el paciente":
        return "warning";
      case "Cancelado por el médico":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Historial de Citas
      </Typography>

      {cargando ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : citas.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
          No tienes citas en tu historial.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1A73E8" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Fecha</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Hora</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Paciente</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {citas.map((cita) => (
                <TableRow key={cita.id}>
                  <TableCell>{cita.fecha}</TableCell>
                  <TableCell>{cita.hora}</TableCell>
                  <TableCell>{cita.paciente}</TableCell>
                  <TableCell>
                    <Chip label={cita.estado} color={getEstadoColor(cita.estado)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default HistorialCitasMedico;
