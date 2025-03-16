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

const HistorialCitas = () => {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Simulación de API: Obtener citas pasadas
    setTimeout(() => {
      const historial = [
        {
          id: 1,
          fecha: "2024-03-15",
          medico: "Dr. Juan Pérez",
          direccion: "Av. Reforma 123, Ciudad",
          motivo: "Chequeo general",
          tratamiento: "Revisión completa, todo en orden.",
          estado: "Atendido",
        },
        {
          id: 2,
          fecha: "2024-02-28",
          medico: "Dra. María López",
          direccion: "Calle Central 456, Zona 10",
          motivo: "Consulta de piel",
          tratamiento: "Crema recetada para dermatitis.",
          estado: "Atendido",
        },
        {
          id: 3,
          fecha: "2024-02-15",
          medico: "Dr. Carlos Gómez",
          direccion: "Boulevard Principal 789, Zona 15",
          motivo: "Consulta pediátrica",
          tratamiento: "",
          estado: "Cancelado por el paciente",
        },
        {
          id: 4,
          fecha: "2024-01-30",
          medico: "Dra. Ana Fernández",
          direccion: "Zona 1, Guatemala",
          motivo: "Revisión oftalmológica",
          tratamiento: "",
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
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Médico</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Dirección</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Motivo</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tratamiento</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {citas.map((cita) => (
                <TableRow key={cita.id}>
                  <TableCell>{cita.fecha}</TableCell>
                  <TableCell>{cita.medico}</TableCell>
                  <TableCell>{cita.direccion}</TableCell>
                  <TableCell>{cita.motivo}</TableCell>
                  <TableCell>
                    {cita.estado === "Atendido" ? cita.tratamiento : "-"}
                  </TableCell>
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

export default HistorialCitas;
