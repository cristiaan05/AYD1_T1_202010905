import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const menuItems = {
    paciente: [
      { label: "Dashboard", path: "/paciente" },
      { label: "Citas", path: "/paciente/citas" },
      { label: "Historial", path: "/paciente/historial" },
      { label: "Perfil", path: "/paciente/perfil" },
    ],
    medico: [
      { label: "Dashboard", path: "/medico" },
      { label: "Gestión de Citas", path: "/medico/citas" },
      { label: "Historial", path: "/medico/historial" },
      { label: "Perfil", path: "/medico/perfil" },
    ],
    admin: [
      { label: "Dashboard", path: "/admin" },
      { label: "Gestión de Usuarios", path: "/admin/usuarios" },
      { label: "Reportes", path: "/admin/reportes" },
    ],
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          SaludPlus
        </Typography>

        {user && menuItems[user.role]?.map((item) => (
          <Button color="inherit" component={Link} key={item.path} to={item.path}>
            {item.label}
          </Button>
        ))}

        {user ? (
          <Button color="secondary" onClick={logout}>
            Cerrar Sesión
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/">
            Iniciar Sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
