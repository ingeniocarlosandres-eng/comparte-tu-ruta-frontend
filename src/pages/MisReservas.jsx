import { useState, useEffect } from 'react';
import { misReservas, cancelarReserva } from '../services/reservasService';
import { obtenerRutaPorId } from '../services/rutasService';

const ETIQUETAS_ESTADO = {
  pendiente: 'Pendiente',
  confirmada: 'Confirmada',
  rechazada: 'Rechazada',
  cancelada: 'Cancelada',
};

function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargar = async () => {
    setCargando(true);
    setError('');
    try {
      const data = await misReservas();
      // Enriquecemos cada reserva con los datos de su ruta (origen, destino, fecha),
      // ya que el backend solo devuelve el rutaId, no el detalle de la ruta.
      const reservasConRuta = await Promise.all(
        data.reservas.map(async (reserva) => {
          try {
            const { ruta } = await obtenerRutaPorId(reserva.rutaId);
            return { ...reserva, ruta };
          } catch {
            return { ...reserva, ruta: null };
          }
        }),
      );
      setReservas(reservasConRuta);
    } catch (err) {
      setError('No se pudieron cargar tus reservas.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleCancelar = async (id) => {
    if (!window.confirm('¿Cancelar esta reserva?')) return;
    try {
      await cancelarReserva(id);
      await cargar();
    } catch (err) {
      alert(err.response?.data?.mensaje || 'No se pudo cancelar la reserva');
    }
  };

  return (
    <div className="container" style={{ paddingBlock: 'var(--sp6)' }}>
      <h1 style={{ fontSize: '1.6rem', marginBottom: 'var(--sp5)' }}>Mis reservas</h1>

      {error && <div className="auth-alert err">{error}</div>}

      {!cargando && reservas.length === 0 && !error && (
        <div className="empty-state">
          <p>Todavía no has solicitado ninguna reserva.</p>
        </div>
      )}

      <div className="grid-cards">
        {reservas.map((reserva) => (
          <div key={reserva.id} className="card" style={{ padding: 'var(--sp5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--sp3)' }}>
              <h3>
                {reserva.ruta ? `${reserva.ruta.barrioOrigen} → ${reserva.ruta.barrioDestino}` : 'Ruta no disponible'}
              </h3>
              <span className={`badge badge-${reserva.estado}`}>{ETIQUETAS_ESTADO[reserva.estado]}</span>
            </div>
                  {reserva.ruta && (
              <p>{reserva.ruta.fechaSalida} · {reserva.ruta.horaSalida?.slice(0, 5)}</p>
            )}
            <p>Puestos reservados: {reserva.puestosReservados}</p>
            {reserva.estado === 'confirmada' && reserva.ruta?.conductor && (
              <div style={{ marginTop: 'var(--sp3)', paddingTop: 'var(--sp3)', borderTop: '1px solid var(--border-2)' }}>
                <p style={{ fontWeight: 700, fontSize: '.8rem', marginBottom: 'var(--sp1)' }}>Conductor</p>
                <p>{reserva.ruta.conductor.nombre}{reserva.ruta.conductor.telefono && ` · Tel: ${reserva.ruta.conductor.telefono}`}</p>
                               {reserva.ruta.vehiculo && (
                  <p>{reserva.ruta.vehiculo.marca} · Placa: {reserva.ruta.vehiculo.placa}{reserva.ruta.vehiculo.color && ` · ${reserva.ruta.vehiculo.color}`}</p>
                )}
              </div>
            )}
            {['pendiente', 'confirmada'].includes(reserva.estado) && (
              <button
                type="button"
                className="btn btn-outline btn-sm"
                style={{ marginTop: 'var(--sp3)' }}
                onClick={() => handleCancelar(reserva.id)}
              >
                Cancelar reserva
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MisReservas;