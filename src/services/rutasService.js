import api from './api';

/**
 * RutasService (frontend)
 * Consume los endpoints del módulo de rutas del backend.
 */

export async function buscarRutas({ origen, destino, fecha }) {
  const params = {};
  if (origen) params.origen = origen;
  if (destino) params.destino = destino;
  if (fecha) params.fecha = fecha;

  const { data } = await api.get('/rutas/buscar', { params });
  return data; // { exito, total, rutas }
}

export async function obtenerRutaPorId(id) {
  const { data } = await api.get(`/rutas/${id}`);
  return data;
}

export async function misRutas() {
  const { data } = await api.get('/rutas');
  return data;
}

export async function publicarRuta(datosRuta) {
  const { data } = await api.post('/rutas', datosRuta);
  return data;
}

export async function actualizarRuta(id, datosRuta) {
  const { data } = await api.put(`/rutas/${id}`, datosRuta);
  return data;
}

export async function cancelarRuta(id) {
  const { data } = await api.patch(`/rutas/${id}/cancelar`);
  return data;
}

export async function eliminarRuta(id) {
  const { data } = await api.delete(`/rutas/${id}`);
  return data;
}