import { useState, useEffect } from 'react';
import { buscarRutas } from '../services/rutasService';
import { solicitarReserva } from '../services/reservasService';
import FiltroBusqueda from '../components/FiltroBusqueda';
import RutaCard from '../components/RutaCard';
import ReservaForm from '../components/ReservaForm';

function BuscarRutas() {
  const [rutas, setRutas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [buscado, setBuscado] = useState(false);
  const [reservando, setReservando] = useState(null);
  const [mensajesReserva, setMensajesReserva] = useState({});

  const ejecutarBusqueda = async (criterios) => {
    setError('');
    setCargando(true);
    setBuscado(true);
    try {
      const data = await buscarRutas(criterios);
      setRutas(data.rutas);
    } catch (err) {
      setError('No se pudieron cargar las rutas. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    ejecutarBusqueda({});
  }, []);

  const handleReservar = async ({ rutaId, puestosReservados }) => {
    setReservando(rutaId);
    try {
      await solicitarReserva({ rutaId, puestosReservados });
      setMensajesReserva((anterior) => ({ ...anterior, [rutaId]: '¡Solicitud enviada! Espera la confirmación del conductor.' }));
    } catch (err) {
      const mensaje = err.response?.data?.mensaje || 'No se pudo enviar la solicitud';
      alert(mensaje);
    } finally {
      setReservando(null);
    }
  };

  return (
    <div className="container" style={{ paddingBlock: 'var(--sp6)' }}>
      <h1 style={{ fontSize: '1.6rem', marginBottom: 'var(--sp5)' }}>Buscar rutas</h1>

      <FiltroBusqueda onBuscar={ejecutarBusqueda} cargando={cargando} />

      {error && <div className="auth-alert err">{error}</div>}

      {!cargando && buscado && rutas.length === 0 && !error && (
        <div className="empty-state">
          <p>No se encontraron rutas con esos criterios.</p>
        </div>
      )}

      <div className="grid-cards">
        {rutas.map((ruta) => (
          <RutaCard key={ruta.id} ruta={ruta}>
            <ReservaForm
              ruta={ruta}
              onReservar={handleReservar}
              cargando={reservando === ruta.id}
              mensaje={mensajesReserva[ruta.id]}
            />
          </RutaCard>
        ))}
      </div>
    </div>
  );
}

export default BuscarRutas;