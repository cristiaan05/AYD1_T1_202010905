import React, { useState } from "react";
import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

// Estilos personalizados para el formulario
const LoginContainer = styled(Grid)({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#F8F9FA",
});

const StyledCard = styled(Card)({
  display: "flex",
  width: "900px",
  borderRadius: "12px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
});

const FormWrapper = styled(Grid)({
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const StyledTextField = styled(TextField)({
  marginBottom: "16px",
  "& .MuiInputBase-root": {
    borderRadius: "8px",
  },
});

const StyledButton = styled(Button)({
  padding: "12px",
  borderRadius: "8px",
  background: "linear-gradient(90deg, #1A73E8, #0066FF)",
  color: "#fff",
  fontWeight: "bold",
  transition: "0.3s",
  "&:hover": {
    background: "linear-gradient(90deg, #0066FF, #1A73E8)",
    transform: "scale(1.05)",
  },
});

const ImageWrapper = styled(Grid)({
  backgroundImage: "url('/assets/images/background.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const success = login(form.email, form.password);
      if (success) {
        navigate("/");
      } else {
        alert("Credenciales incorrectas");
      }
    }, 2000);
  };

  return (
    <LoginContainer container>
      <StyledCard>
        {/* Sección del formulario */}
        <FormWrapper item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1A73E8", mb: 1 }}>
            Bienvenido <span style={{ color: "#000" }}>a SaludPLus</span>
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "#6C757D" }}>
            Ingrese su correo y contraseña para acceder
          </Typography>

          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <StyledTextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={form.password}
              onChange={handleChange}
            />

            <FormControlLabel control={<Checkbox />} label="Remember me" />

            <StyledButton fullWidth type="submit" variant="contained" disabled={loading}>
              {loading ? "Signing in..." : "SIGN IN"}
            </StyledButton>
          </form>

          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            No tienes una cuenta <span style={{ color: "#1A73E8", cursor: "pointer" }}>Registrate</span>
          </Typography>
        </FormWrapper>

        {/* Sección de imagen */}
        <ImageWrapper item xs={12} md={6} />
      </StyledCard>
    </LoginContainer>
  );
};

export default Login;
