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
  Avatar,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import DeleteIcon from "@mui/icons-material/Delete";

const ListadoUsuarios = () => {
  const [tipoUsuario, setTipoUsuario] = useState("pacientes"); // Estado para alternar entre pacientes y médicos
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    // Simulación de API: Obtener usuarios aprobados según el tipo
    setCargando(true);
    setTimeout(() => {
      const pacientesAprobados = [
        {
          id: 1,
          tipo: "paciente",
          nombre: "Carlos Ramírez",
          dpi: "1234567890101",
          genero: "Masculino",
          fechaNacimiento: "1990-05-15",
          correo: "carlos.ramirez@example.com",
          foto: "",
        },
        {
          id: 2,
          tipo: "paciente",
          nombre: "Ana Gómez",
          dpi: "9876543210102",
          genero: "Femenino",
          fechaNacimiento: "1995-08-20",
          correo: "ana.gomez@example.com",
          foto: "",
        },
      ];

      const medicosAprobados = [
        {
          id: 3,
          tipo: "medico",
          nombre: "Dr. Juan Pérez",
          dpi: "1122334455667",
          genero: "Masculino",
          especialidad: "Cardiología",
          colegiado: "789456",
          correo: "juan.perez@example.com",
          foto: "",
        },
        {
          id: 4,
          tipo: "medico",
          nombre: "Dra. María López",
          dpi: "9988776655443",
          genero: "Femenino",
          especialidad: "Pediatría",
          colegiado: "123789",
          correo: "maria.lopez@example.com",
          foto: "",
        },
      ];

      setUsuarios(tipoUsuario === "pacientes" ? pacientesAprobados : medicosAprobados);
      setCargando(false);
    }, 2000);
  }, [tipoUsuario]);

  const handleBajaUsuario = (id) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    setMensaje(`Usuario dado de baja con éxito.`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold">
        Gestión de Usuarios
      </Typography>

      <Tabs value={tipoUsuario} onChange={(e, newValue) => setTipoUsuario(newValue)} sx={{ mb: 3 }}>
        <Tab label="Pacientes Aprobados" value="pacientes" icon={<PersonIcon />} />
        <Tab label="Médicos Aprobados" value="medicos" icon={<MedicalServicesIcon />} />
      </Tabs>

      {mensaje && <Alert severity="warning" sx={{ mb: 2 }}>{mensaje}</Alert>}

      {cargando ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : usuarios.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
          No hay {tipoUsuario === "pacientes" ? "pacientes" : "médicos"} aprobados en el sistema.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1A73E8" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Foto</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Nombre</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>DPI</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Género</TableCell>
                {tipoUsuario === "medicos" && (
                  <>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Especialidad</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>No. Colegiado</TableCell>
                  </>
                )}
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Correo</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>
                    <Avatar
                      src={usuario.foto || ""}
                      sx={{ width: 40, height: 40, bgcolor: usuario.foto ? "transparent" : "grey" }}
                    >
                      {!usuario.foto && <PersonIcon />}
                    </Avatar>
                  </TableCell>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.dpi}</TableCell>
                  <TableCell>{usuario.genero}</TableCell>
                  {usuario.tipo === "medico" && (
                    <>
                      <TableCell>{usuario.especialidad}</TableCell>
                      <TableCell>{usuario.colegiado}</TableCell>
                    </>
                  )}
                  <TableCell>{usuario.correo}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleBajaUsuario(usuario.id)}
                    >
                      Dar de baja
                    </Button>
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

export default ListadoUsuarios;
