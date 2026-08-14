import api from './api';

/**
 * AuthService (frontend)
 * Consume los endpoints del módulo de autenticación del backend
 * (/api/auth/login, /api/auth/registro).
 */

export async function iniciarSesion({ email, password }) {
  const { data } = await api.post('/auth/login', { email, password });
  return data; // { exito, mensaje, usuario, token }
}

export async function registrar({
  nombre, email, password, telefono, barrio, tipoUsuario,
}) {
  const { data } = await api.post('/auth/registro', {
    nombre, email, password, telefono, barrio, tipoUsuario,
  });
  return data; // { exito, mensaje, usuario, token }
}