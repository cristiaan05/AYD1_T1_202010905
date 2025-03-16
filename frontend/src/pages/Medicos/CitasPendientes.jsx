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
  DialogTitle,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import dayjs from "dayjs";

const CitasPendientes = () => {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [tratamiento, setTratamiento] = useState("");
  const [openAtenderDialog, setOpenAtenderDialog] = useState(false);
  const [openCancelarDialog, setOpenCancelarDialog] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    // Simulación de API: Obtener citas pendientes
    setTimeout(() => {
      const citasPendientes = [
        {
          id: 1,
          fecha: "2024-04-12",
          hora: "09:00 AM",
          paciente: "Carlos Ramírez",
          correo: "carlos.ramirez@example.com",
          motivo: "Dolor en el pecho",
        },
        {
          id: 2,
          fecha: "2024-04-11",
          hora: "11:00 AM",
          paciente: "Ana Gómez",
          correo: "ana.gomez@example.com",
          motivo: "Revisión de presión arterial",
        },
      ];

      // Ordenar citas por fecha más reciente
      const citasOrdenadas = citasPendientes.sort(
        (a, b) => dayjs(a.fecha).valueOf() - dayjs(b.fecha).valueOf()
      );

      setCitas(citasOrdenadas);
      setCargando(false);
    }, 2000);
  }, []);

  // Función para atender paciente
  const handleAtenderPaciente = () => {
    if (!tratamiento.trim()) {
      setMensaje("El tratamiento es obligatorio.");
      return;
    }

    // Simulación de eliminación de la cita y registro del tratamiento
    setCitas(citas.filter((cita) => cita.id !== citaSeleccionada.id));

    setMensaje(`Paciente ${citaSeleccionada.paciente} atendido con éxito.`);
    setOpenAtenderDialog(false);
    setCitaSeleccionada(null);
    setTratamiento("");
  };

  // Función para cancelar cita
  const handleCancelarCita = () => {
    // Simulación de eliminación de la cita
    setCitas(citas.filter((cita) => cita.id !== citaSeleccionada.id));

    // Simulación de notificación por correo
    console.log(`Correo enviado a ${citaSeleccionada.correo}: "Su cita ha sido cancelada"`);

    setMensaje(`Cita con ${citaSeleccionada.paciente} cancelada. Se notificó por correo.`);
    setOpenCancelarDialog(false);
    setCitaSeleccionada(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Citas Pendientes
      </Typography>

      {mensaje && <Alert severity="success" sx={{ mb: 2 }}>{mensaje}</Alert>}

      {cargando ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : citas.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
          No tienes citas pendientes en este momento.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1A73E8" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Fecha</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Hora</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Paciente</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Motivo</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {citas.map((cita) => (
                <TableRow key={cita.id}>
                  <TableCell>{cita.fecha}</TableCell>
                  <TableCell>{cita.hora}</TableCell>
                  <TableCell>{cita.paciente}</TableCell>
                  <TableCell>{cita.motivo}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => {
                        setCitaSeleccionada(cita);
                        setOpenAtenderDialog(true);
                      }}
                    >
                      Atender
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => {
                        setCitaSeleccionada(cita);
                        setOpenCancelarDialog(true);
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

      {/* Diálogo para Atender Paciente */}
      <Dialog open={openAtenderDialog} onClose={() => setOpenAtenderDialog(false)}>
        <DialogTitle>Atender Paciente</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Estás atendiendo a <strong>{citaSeleccionada?.paciente}</strong> con el motivo: <strong>{citaSeleccionada?.motivo}</strong>.
          </Typography>
          <TextField
            fullWidth
            label="Tratamiento"
            variant="outlined"
            multiline
            rows={3}
            value={tratamiento}
            onChange={(e) => setTratamiento(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAtenderDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAtenderPaciente} color="success">
            Marcar como Atendido
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para Cancelar Cita */}
      <Dialog open={openCancelarDialog} onClose={() => setOpenCancelarDialog(false)}>
        <DialogTitle>Cancelar Cita</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            ¿Estás seguro de que deseas cancelar la cita de{" "}
            <strong>{citaSeleccionada?.paciente}</strong> el día{" "}
            <strong>{citaSeleccionada?.fecha}</strong> a las{" "}
            <strong>{citaSeleccionada?.hora}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancelarDialog(false)} color="secondary">
            No, mantener cita
          </Button>
          <Button onClick={handleCancelarCita} color="error">
            Sí, cancelar cita
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CitasPendientes;
