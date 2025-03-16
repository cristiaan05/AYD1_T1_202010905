import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Alert,
    CircularProgress,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";

// Simulación de disponibilidad del médico
const disponibilidad = {
    monday: ["09:00", "10:00", "14:00", "16:00"],
    tuesday: ["09:00", "11:00", "15:00"],
    wednesday: ["10:00", "13:00", "17:00"],
    thursday: ["08:00", "12:00", "15:00"],
    friday: ["09:00", "14:00", "16:00"],
};

const AgendarCita = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const medico = location.state?.medico;

    const [fecha, setFecha] = useState(null);
    const [hora, setHora] = useState("");
    const [motivo, setMotivo] = useState("");
    const [horarios, setHorarios] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);

    // Actualiza los horarios según la fecha seleccionada
    useEffect(() => {
        if (fecha) {
            const dia = fecha.locale("es").format("dddd").toLowerCase();
            dayjs.locale('es');
            setHorarios(disponibilidad[dia] || []);
        }
    }, [fecha]);

    const handleAgendar = () => {
        setError(null);

        if (!fecha || !hora || !motivo) {
            setError("Por favor completa todos los campos.");
            return;
        }

        if (!horarios.includes(hora)) {
            setError("El horario seleccionado no está disponible.");
            return;
        }

        setCargando(true);
        setTimeout(() => {
            setCargando(false);
            alert(`Cita programada con el Dr. ${medico.nombre} el ${fecha.format("DD/MM/YYYY")} a las ${hora}.`);
            navigate("/paciente/medicos");
        }, 2000);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <Box sx={{ p: 4, maxWidth: 500, mx: "auto", backgroundColor: "#FFF", borderRadius: "12px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, textAlign: "center" }}>
                    Programar Cita con {medico.nombre}
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                {/* Fecha de la cita con DatePicker */}
                <DatePicker
                    label="Fecha de la cita"
                    value={fecha}
                    format="DD/MM/YYYY"
                    localeText={{
                        today: 'Hoy',
                        cancelButtonLabel: 'Cancelar',
                        okButtonLabel: 'Aceptar',
                        clearButtonLabel: 'Limpiar',
                        datePickerToolbarTitle: 'Seleccionar fecha',
                        dateTableLabel: 'Seleccionar fecha',
                        datePickerDialogTitle: 'Seleccionar fecha',
                    }}
                    onChange={(newValue) => setFecha(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
                />

                {/* Hora de la cita */}
                {console.log(fecha, horarios.length)}
                <TextField
                    fullWidth
                    select
                    label="Hora de la cita"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    disabled={!fecha || horarios.length === 0}
                    sx={{ mb: 2 }}
                >
                    {horarios.length === 0 ? (
                        <MenuItem disabled>No hay horarios disponibles</MenuItem>
                    ) : (
                        horarios.map((horaDisponible) => (
                            <MenuItem key={horaDisponible} value={horaDisponible}>
                                {horaDisponible}
                            </MenuItem>
                        ))
                    )}
                </TextField>

                {/* Motivo de la cita */}
                <TextField
                    fullWidth
                    label="Motivo de la cita"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* Botón de agendar */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAgendar}
                    disabled={cargando}
                    sx={{ py: 1.5, fontSize: "1rem" }}
                >
                    {cargando ? <CircularProgress size={24} color="inherit" /> : "Agendar Cita"}
                </Button>
            </Box>
        </LocalizationProvider>
    );
};

export default AgendarCita;
