import api from './api';

/**
 * ReservasService (frontend)
 * Consume los endpoints del módulo de reservas del backend.
 */

export async function solicitarReserva({ rutaId, puestosReservados }) {
  const { data } = await api.post('/reservas', { rutaId, puestosReservados });
  return data;
}

export async function misReservas() {
  const { data } = await api.get('/reservas/mias');
  return data; // { exito, total, reservas }
}

export async function reservasDeRuta(rutaId) {
  const { data } = await api.get(`/reservas/ruta/${rutaId}`);
  return data;
}

export async function confirmarReserva(id) {
  const { data } = await api.patch(`/reservas/${id}/confirmar`);
  return data;
}

export async function rechazarReserva(id) {
  const { data } = await api.patch(`/reservas/${id}/rechazar`);
  return data;
}