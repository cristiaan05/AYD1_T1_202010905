import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simular login
  const login = (email, password) => {
    const fakeUsers = {
      "paciente@saludplus.com": { email, role: "paciente" },
      "medico@saludplus.com": { email, role: "medico" },
      "admin@saludplus.com": { email, role: "admin" },
    };

    if (fakeUsers[email]) {
      setUser(fakeUsers[email]);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
