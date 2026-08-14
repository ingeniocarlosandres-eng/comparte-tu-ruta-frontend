import { createContext, useContext, useState, useEffect } from 'react';
import { iniciarSesion, registrar } from '../services/authService';

const AuthContext = createContext(null);

/**
 * Proveedor de autenticación.
 * Mantiene el estado global del usuario autenticado y el token JWT,
 * persistidos en localStorage para sobrevivir recargas de página.
 */
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');
    if (usuarioGuardado && token) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  const login = async (credenciales) => {
    const data = await iniciarSesion(credenciales);
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    setUsuario(data.usuario);
    return data;
  };

  const registrarUsuario = async (datosRegistro) => {
    const data = await registrar(datosRegistro);
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    setUsuario(data.usuario);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  const esConductor = () => (
    usuario?.tipoUsuario === 'conductor' || usuario?.tipoUsuario === 'ambos'
  );

  const value = {
    usuario, cargando, login, registrarUsuario, logout, esConductor,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Hook de conveniencia para consumir el contexto desde cualquier componente */
export function useAuth() {
  return useContext(AuthContext);
}