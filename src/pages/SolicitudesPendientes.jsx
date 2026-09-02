import { useState, useEffect } from 'react';
import { misRutas } from '../services/rutasService';
import { reservasDeRuta, confirmarReserva, rechazarReserva } from '../services/reservasService';

function SolicitudesPendientes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [procesando, setProcesando] = useState(null);

  const cargarSolicitudes = async () => {
    setCargando(true);
    setError('');
    try {
      const { rutas } = await misRutas();
      const listasPorRuta = await Promise.all(
        rutas.map(async (ruta) => {
          const { reservas } = await reservasDeRuta(ruta.id);
          return reservas
            .filter((r) => r.estado === 'pendiente')
            .map((r) => ({ ...r, ruta }));
        }),
      );
      setSolicitudes(listasPorRuta.flat());
    } catch (err) {
      setError('No se pudieron cargar las solicitudes.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const handleConfirmar = async (id) => {
    setProcesando(id);
    try {
      await confirmarReserva(id);
      await cargarSolicitudes();
    } catch (err) {
      alert(err.response?.data?.mensaje || 'No se pudo confirmar la solicitud');
    } finally {
      setProcesando(null);
    }
  };

  const handleRechazar = async (id) => {
    setProcesando(id);
    try {
      await rechazarReserva(id);
      await cargarSolicitudes();
    } catch (err) {
      alert(err.response?.data?.mensaje || 'No se pudo rechazar la solicitud');
    } finally {
      setProcesando(null);
    }
  };

  return (
    <div className="container" style={{ paddingBlock: 'var(--sp6)' }}>
      <h1 style={{ fontSize: '1.6rem', marginBottom: 'var(--sp5)' }}>Solicitudes pendientes</h1>

      {error && <div className="auth-alert err">{error}</div>}

      {!cargando && solicitudes.length === 0 && !error && (
        <div className="empty-state">
          <p>No tienes solicitudes pendientes por revisar.</p>
        </div>
      )}

      <div className="grid-cards">
        {solicitudes.map((solicitud) => (
          <div key={solicitud.id} className="card" style={{ padding: 'var(--sp5)' }}>
           <h3 style={{ marginBottom: 'var(--sp2)' }}>
  {solicitud.ruta.barrioOrigen} → {solicitud.ruta.barrioDestino}
</h3>
<p>{solicitud.ruta.fechaSalida} · {solicitud.ruta.horaSalida?.slice(0, 5)}</p>
<p>Puestos solicitados: {solicitud.puestosReservados}</p>
<p><strong>Pasajero:</strong> {solicitud.pasajero?.nombre ?? 'No disponible'}</p>
{solicitud.pasajero?.telefono && <p>Tel: {solicitud.pasajero.telefono}</p>}

            <div style={{ display: 'flex', gap: 'var(--sp2)', marginTop: 'var(--sp4)' }}>
              <button
                type="button"
                className="btn btn-blue btn-sm"
                disabled={procesando === solicitud.id}
                onClick={() => handleConfirmar(solicitud.id)}
              >
                Confirmar
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                disabled={procesando === solicitud.id}
                onClick={() => handleRechazar(solicitud.id)}
              >
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SolicitudesPendientes;