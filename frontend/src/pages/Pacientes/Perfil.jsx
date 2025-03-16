import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../components/AuthContext";

const Perfil = () => {
  const { user } = useAuth(); // Obtener datos del usuario (esto se integrará con API en futuro)

  const [perfil, setPerfil] = useState({
    nombre: "Juan Pérez",
    telefono: "5555-5555",
    direccion: "Ciudad, Guatemala",
    correo: user?.email || "juan.perez@example.com",
  });

  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    setMensaje(null);

    if (!perfil.nombre || !perfil.telefono || !perfil.direccion) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setEditando(false);
      setMensaje("Perfil actualizado correctamente.");
    }, 2000);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: "auto", backgroundColor: "#FFF", borderRadius: "12px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, textAlign: "center" }}>
        Mi Perfil
      </Typography>

      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Avatar sx={{ width: 80, height: 80, mx: "auto", mb: 1 }}>JP</Avatar>
        <Typography variant="body1" color="textSecondary">
          {perfil.correo}
        </Typography>
      </Box>

      {mensaje && <Alert severity="success" sx={{ mb: 2 }}>{mensaje}</Alert>}

      <TextField
        fullWidth
        label="Nombre"
        variant="outlined"
        name="nombre"
        value={perfil.nombre}
        onChange={handleChange}
        disabled={!editando}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Teléfono"
        variant="outlined"
        name="telefono"
        value={perfil.telefono}
        onChange={handleChange}
        disabled={!editando}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Dirección"
        variant="outlined"
        name="direccion"
        value={perfil.direccion}
        onChange={handleChange}
        disabled={!editando}
        sx={{ mb: 2 }}
      />

      {editando ? (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleGuardar}
          disabled={cargando}
          sx={{ py: 1.5, fontSize: "1rem" }}
        >
          {cargando ? <CircularProgress size={24} color="inherit" /> : "Guardar Cambios"}
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => setEditando(true)}
          sx={{ py: 1.5, fontSize: "1rem" }}
        >
          Editar Perfil
        </Button>
      )}
    </Box>
  );
};

export default Perfil;
