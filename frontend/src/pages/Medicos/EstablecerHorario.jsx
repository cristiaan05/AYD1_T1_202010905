import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";

const diasSemana = [
  { nombre: "Lunes", id: "lunes" },
  { nombre: "Martes", id: "martes" },
  { nombre: "Miércoles", id: "miercoles" },
  { nombre: "Jueves", id: "jueves" },
  { nombre: "Viernes", id: "viernes" },
  { nombre: "Sábado", id: "sabado" },
];

const EstablecerHorario = () => {
  const [diasAtencion, setDiasAtencion] = useState([]);
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setDiasAtencion(checked ? [...diasAtencion, id] : diasAtencion.filter((dia) => dia !== id));
  };

  const handleGuardarHorario = () => {
    setMensaje(null);

    if (diasAtencion.length === 0 || !horaInicio || !horaFin) {
      setMensaje("Por favor selecciona los días y establece un horario.");
      return;
    }

    if (horaInicio >= horaFin) {
      setMensaje("La hora de inicio debe ser antes que la hora de fin.");
      return;
    }

    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setMensaje("Horario establecido con éxito.");
    }, 2000);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: "auto", backgroundColor: "#FFF", borderRadius: "12px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, textAlign: "center" }}>
        Establecer Horario de Atención
      </Typography>

      {mensaje && <Alert severity="success" sx={{ mb: 2 }}>{mensaje}</Alert>}

      <Typography variant="body1" sx={{ mb: 1 }}>
        Selecciona los días que atenderás:
      </Typography>

      <FormGroup>
        {diasSemana.map((dia) => (
          <FormControlLabel
            key={dia.id}
            control={
              <Checkbox
                id={dia.id}
                checked={diasAtencion.includes(dia.id)}
                onChange={handleCheckboxChange}
              />
            }
            label={dia.nombre}
          />
        ))}
      </FormGroup>

      <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
        Selecciona el horario:
      </Typography>

      <TextField
        fullWidth
        type="time"
        label="Hora de inicio"
        variant="outlined"
        value={horaInicio}
        onChange={(e) => setHoraInicio(e.target.value)}
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        fullWidth
        type="time"
        label="Hora de fin"
        variant="outlined"
        value={horaFin}
        onChange={(e) => setHoraFin(e.target.value)}
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleGuardarHorario}
        disabled={cargando}
        sx={{ py: 1.5, fontSize: "1rem" }}
      >
        {cargando ? <CircularProgress size={24} color="inherit" /> : "Guardar Horario"}
      </Button>
    </Box>
  );
};

export default EstablecerHorario;
