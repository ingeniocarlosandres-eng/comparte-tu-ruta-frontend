import api from './api';

/**
 * VehiculosService (frontend)
 * Consume los endpoints del módulo de vehículos del backend.
 */

export async function misVehiculos() {
  const { data } = await api.get('/vehiculos');
  return data; // { exito, total, vehiculos }
}

export async function registrarVehiculo(datosVehiculo) {
  const { data } = await api.post('/vehiculos', datosVehiculo);
  return data;
}