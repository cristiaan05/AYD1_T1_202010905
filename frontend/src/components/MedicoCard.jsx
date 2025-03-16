import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";

const MedicoCard = ({ medico, onAgendarCita }) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        transition: "0.3s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={medico.foto || "/assets/default-doctor.png"}
        alt={medico.nombre}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {medico.nombre}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Especialidad: {medico.especialidad}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Dirección: {medico.direccion}
        </Typography>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onAgendarCita(medico)}
          >
            Agendar Cita
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MedicoCard;
