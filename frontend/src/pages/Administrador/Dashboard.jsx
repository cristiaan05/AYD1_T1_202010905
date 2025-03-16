import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { Grid2 as Grid } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Colores para los gráficos
const COLORS = ["#1E88E5", "#D32F2F", "#FFC107", "#43A047", "#7B1FA2"];

const Dashboard = () => {
  const [cargando, setCargando] = useState(true);
  const [medicosAtendidos, setMedicosAtendidos] = useState([]);
  const [especialidadesCitas, setEspecialidadesCitas] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    totalPacientes: 0,
    totalMedicos: 0,
    totalCitas: 0,
  });

  useEffect(() => {
    // Simulación de API para obtener datos
    setTimeout(() => {
      setMedicosAtendidos([
        { nombre: "Dr. Juan Pérez", pacientes: 120 },
        { nombre: "Dra. Ana López", pacientes: 95 },
        { nombre: "Dr. Carlos Méndez", pacientes: 75 },
        { nombre: "Dra. Laura Gómez", pacientes: 60 },
        { nombre: "Dr. Ricardo Martínez", pacientes: 50 },
      ]);

      setEspecialidadesCitas([
        { especialidad: "Cardiología", citas: 200 },
        { especialidad: "Pediatría", citas: 180 },
        { especialidad: "Ginecología", citas: 150 },
        { especialidad: "Dermatología", citas: 120 },
        { especialidad: "Neurología", citas: 100 },
      ]);

      setEstadisticas({
        totalPacientes: 500,
        totalMedicos: 50,
        totalCitas: 1200,
      });

      setCargando(false);
    }, 2000);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Dashboard de Administración
      </Typography>

      {cargando ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Estadísticas Generales */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: "#1E88E5", color: "white" }}>
                <CardContent>
                  <Typography variant="h6">Total de Pacientes</Typography>
                  <Typography variant="h4">{estadisticas.totalPacientes}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: "#D32F2F", color: "white" }}>
                <CardContent>
                  <Typography variant="h6">Total de Médicos</Typography>
                  <Typography variant="h4">{estadisticas.totalMedicos}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: "#43A047", color: "white" }}>
                <CardContent>
                  <Typography variant="h6">Total de Citas</Typography>
                  <Typography variant="h4">{estadisticas.totalCitas}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Reporte: Médicos con más pacientes atendidos */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
              Médicos con más Pacientes Atendidos
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={medicosAtendidos}>
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pacientes" fill="#1E88E5" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>

          {/* Reporte: Especialidades con más citas generadas */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
              Especialidades con Más Citas Generadas
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={especialidadesCitas}
                  dataKey="citas"
                  nameKey="especialidad"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {especialidadesCitas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
