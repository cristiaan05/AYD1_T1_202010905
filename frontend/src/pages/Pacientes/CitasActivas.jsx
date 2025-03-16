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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert,
} from "@mui/material";

const CitasActivas = () => {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    // Simulación de API: Obtener citas activas del paciente
    setTimeout(() => {
      const citasPendientes = [
        {
          id: 1,
          fecha: "2024-04-10",
          hora: "10:00 AM",
          medico: "Dr. Juan Pérez",
          direccion: "Av. Reforma 123, Ciudad",
          motivo: "Revisión de presión arterial",
        },
        {
          id: 2,
          fecha: "2024-04-15",
          hora: "3:00 PM",
          medico: "Dra. María López",
          direccion: "Calle Central 456, Zona 10",
          motivo: "Consulta de piel y alergias",
        },
      ];

      setCitas(citasPendientes);
      setCargando(false);
    }, 2000);
  }, []);

  const handleCancelarCita = () => {
    setCitas(citas.filter((cita) => cita.id !== citaSeleccionada.id));
    setMensaje(`Cita con ${citaSeleccionada.medico} cancelada con éxito.`);
    setOpenDialog(false);
    setCitaSeleccionada(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Citas Activas
      </Typography>

      {mensaje && <Alert severity="success" sx={{ mb: 2 }}>{mensaje}</Alert>}

      {cargando ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : citas.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
          No tienes citas activas en este momento.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1A73E8" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Fecha</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Hora</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Médico</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Dirección</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Motivo</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {citas.map((cita) => (
                <TableRow key={cita.id}>
                  <TableCell>{cita.fecha}</TableCell>
                  <TableCell>{cita.hora}</TableCell>
                  <TableCell>{cita.medico}</TableCell>
                  <TableCell>{cita.direccion}</TableCell>
                  <TableCell>{cita.motivo}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => {
                        setCitaSeleccionada(cita);
                        setOpenDialog(true);
                      }}
                    >
                      Cancelar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Diálogo de Confirmación */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Cancelar Cita</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas cancelar tu cita con{" "}
            <strong>{citaSeleccionada?.medico}</strong> el día <strong>{citaSeleccionada?.fecha}</strong> a las{" "}
            <strong>{citaSeleccionada?.hora}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            No, mantener cita
          </Button>
          <Button onClick={handleCancelarCita} color="error" autoFocus>
            Sí, cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CitasActivas;
