import { useState, useEffect } from 'react';
import { reservasDeRuta } from '../services/reservasService';

/**
 * Muestra los pasajeros con reserva confirmada para una ruta específica.
 * Se usa dentro de "Mis rutas" para que el conductor pueda consultar
 * los datos de contacto incluso después de confirmar la solicitud.
 */
function PasajerosRuta({ rutaId }) {
  const [confirmados, setConfirmados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const { reservas } = await reservasDeRuta(rutaId);
        setConfirmados(reservas.filter((r) => r.estado === 'confirmada'));
      } catch {
        setConfirmados([]);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, [rutaId]);

  if (cargando || confirmados.length === 0) return null;

  return (
    <div style={{ padding: '0 var(--sp5) var(--sp5)' }}>
      <p style={{ fontWeight: 700, fontSize: '.8rem', marginBottom: 'var(--sp2)' }}>
        Pasajeros confirmados:
      </p>
      {confirmados.map((r) => (
        <div key={r.id} style={{ fontSize: '.85rem', marginBottom: 'var(--sp1)' }}>
          {r.pasajero?.nombre ?? 'No disponible'} · {r.puestosReservados} puesto(s)
          {r.pasajero?.telefono && ` · Tel: ${r.pasajero.telefono}`}
        </div>
      ))}
    </div>
  );
}

export default PasajerosRuta;