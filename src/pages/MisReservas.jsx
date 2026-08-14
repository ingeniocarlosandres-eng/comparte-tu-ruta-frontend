import { useState, useEffect } from 'react';
import { misReservas } from '../services/reservasService';
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

  useEffect(() => {
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
    cargar();
  }, []);

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
          </div>
        ))}
      </div>
    </div>
  );
}

export default MisReservas;