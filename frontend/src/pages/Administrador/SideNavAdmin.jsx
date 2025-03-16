import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { text: "Solicitud de Usuarios", icon: <GroupIcon />, path: "/admin/usuarios" },
  { text: "Ver Usuarios", icon: <MedicalServicesIcon />, path: "/admin/listadoUsuarios" },
  { text: "Configuraciones", icon: <SettingsIcon />, path: "/admin/configuracion" },
];

const SideNavAdministrador = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          backgroundColor: "#1A73E8",
          color: "#FFF",
          borderRadius: "0px 20px 20px 0px",
          boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {/* Logo y Nombre */}
      <Box sx={{ textAlign: "center", py: 3 }}>
        <img src="https://static.vecteezy.com/system/resources/previews/048/257/310/non_2x/stethoscope-symbol-health-logo-silhouette-on-white-background-vector.jpg" alt="SaludPlus" width={80} />
        <Box sx={{ fontSize: "1.2rem", fontWeight: "bold", mt: 1 }}>Admin Panel</Box>
      </Box>

      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)", mx: 2 }} />

      {/* Menú */}
      <List sx={{ mt: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            sx={{
              color: "white",
              borderRadius: "8px",
              mx: 2,
              mt: 1,
              transition: "0.3s",
              "&.active": { backgroundColor: "#1565C0" },
              "&:hover": { backgroundColor: "#1565A0" },
            }}
          >
            <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)", mx: 2, mt: 2 }} />

      {/* Botón de Cerrar Sesión */}
      <Box sx={{ textAlign: "center", mt: "auto", pb: 3, px: 2 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            backgroundColor: "#F44336",
            color: "white",
            borderRadius: "8px",
            py: 1,
            "&:hover": { backgroundColor: "#D32F2F" },
          }}
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Drawer>
  );
};

export default SideNavAdministrador;
