import React, { useState, useEffect } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import MedicoCard from "../../components/MedicoCard";
import { useNavigate } from "react-router-dom";
import { Grid2 as Grid } from "@mui/material";

const BuscarMedicos = () => {
  const navigate = useNavigate();
  const [medicos, setMedicos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const medicosRegistrados = [
        { id: 1, nombre: "Dr. Juan Pérez", especialidad: "Cardiología", direccion: "Av. Reforma 123", foto: "/assets/medicos/juan-perez.jpg" },
        { id: 2, nombre: "Dra. María López", especialidad: "Dermatología", direccion: "Calle Central 456", foto: "/assets/medicos/maria-lopez.jpg" },
        { id: 3, nombre: "Dr. Carlos Gómez", especialidad: "Pediatría", direccion: "Boulevard Principal 789", foto: "/assets/medicos/carlos-gomez.jpg" },
      ];

      const medicosConCita = [1];

      const medicosDisponibles = medicosRegistrados.filter(
        (medico) => !medicosConCita.includes(medico.id)
      );

      setMedicos(medicosDisponibles);
      setCargando(false);
    }, 2000);
  }, []);

  const handleAgendarCita = (medico) => {
    navigate("/paciente/agendar-cita", { state: { medico } });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Médicos Disponibles
      </Typography>

      {cargando ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {medicos.map((medico) => (
            <Grid item xs={12} sm={6} md={4} key={medico.id}>
              <MedicoCard medico={medico} onAgendarCita={handleAgendarCita} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default BuscarMedicos;
