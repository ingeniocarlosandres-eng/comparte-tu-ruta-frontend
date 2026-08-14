import { useState, useEffect } from 'react';
import {
  misRutas, publicarRuta, actualizarRuta, cancelarRuta, eliminarRuta,
} from '../services/rutasService';
import { misVehiculos } from '../services/vehiculosService';
import RutaForm from '../components/RutaForm';
import RutaCard from '../components/RutaCard';

function MisRutas() {
  const [rutas, setRutas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [errorForm, setErrorForm] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [rutaEditando, setRutaEditando] = useState(null);

  const cargarDatos = async () => {
    setCargando(true);
    setError('');
    try {
      const [datosRutas, datosVehiculos] = await Promise.all([
        misRutas(),
        misVehiculos(),
      ]);
      setRutas(datosRutas.rutas);
      setVehiculos(datosVehiculos.vehiculos);
    } catch (err) {
      setError('No se pudieron cargar tus rutas. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleNuevaRuta = () => {
    setRutaEditando(null);
    setErrorForm('');
    setMostrarForm(true);
  };

  const handleEditar = (ruta) => {
    setRutaEditando(ruta);
    setErrorForm('');
    setMostrarForm(true);
  };

  const handleSubmitForm = async (datosFormulario) => {
    setErrorForm('');
    setGuardando(true);
    try {
      if (rutaEditando) {
        await actualizarRuta(rutaEditando.id, datosFormulario);
      } else {
        await publicarRuta(datosFormulario);
      }
      setMostrarForm(false);
      setRutaEditando(null);
      await cargarDatos();
    } catch (err) {
      const mensaje = err.response?.data?.mensaje || 'No se pudo guardar la ruta';
      setErrorForm(mensaje);
    } finally {
      setGuardando(false);
    }
  };

  const handleCancelarRuta = async (id) => {
    if (!window.confirm('¿Cancelar esta ruta? Los pasajeros con reserva serán notificados.')) return;
    try {
      await cancelarRuta(id);
      await cargarDatos();
    } catch (err) {
      alert(err.response?.data?.mensaje || 'No se pudo cancelar la ruta');
    }
  };

  const handleEliminarRuta = async (id) => {
    if (!window.confirm('¿Eliminar esta ruta permanentemente? Esta acción no se puede deshacer.')) return;
    try {
      await eliminarRuta(id);
      await cargarDatos();
    } catch (err) {
      alert(err.response?.data?.mensaje || 'No se pudo eliminar la ruta');
    }
  };

  if (vehiculos.length === 0 && !cargando && !mostrarForm) {
    return (
      <div className="container" style={{ paddingBlock: 'var(--sp6)' }}>
        <h1 style={{ fontSize: '1.6rem', marginBottom: 'var(--sp4)' }}>Mis rutas</h1>
        <div className="empty-state">
          <p>Necesitas registrar un vehículo antes de publicar rutas.</p>
          <p style={{ marginTop: 'var(--sp3)' }}>
            Ve a <strong>Mis vehículos</strong> en el menú para registrar uno.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBlock: 'var(--sp6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp5)', flexWrap: 'wrap', gap: 'var(--sp3)' }}>
        <h1 style={{ fontSize: '1.6rem' }}>Mis rutas</h1>
        {!mostrarForm && (
          <button type="button" className="btn btn-blue" onClick={handleNuevaRuta}>
            + Publicar nueva ruta
          </button>
        )}
      </div>

      {error && <div className="auth-alert err">{error}</div>}

      {mostrarForm && (
        <div className="card" style={{ padding: 'var(--sp5)', marginBottom: 'var(--sp6)' }}>
          <h3 style={{ marginBottom: 'var(--sp4)' }}>
            {rutaEditando ? 'Editar ruta' : 'Publicar nueva ruta'}
          </h3>
          <RutaForm
            rutaInicial={rutaEditando}
            vehiculos={vehiculos}
            onSubmit={handleSubmitForm}
            onCancelar={() => { setMostrarForm(false); setRutaEditando(null); }}
            cargando={guardando}
            error={errorForm}
          />
        </div>
      )}

      {!cargando && rutas.length === 0 && !mostrarForm && (
        <div className="empty-state">
          <p>Todavía no has publicado ninguna ruta.</p>
        </div>
      )}

      <div className="grid-cards">
        {rutas.map((ruta) => (
          <RutaCard key={ruta.id} ruta={ruta}>
            <div style={{ padding: '0 var(--sp5) var(--sp5)', display: 'flex', gap: 'var(--sp2)', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => handleEditar(ruta)}>
                Editar
              </button>
              {ruta.estado === 'activa' && (
                <button type="button" className="btn btn-outline btn-sm" onClick={() => handleCancelarRuta(ruta.id)}>
                  Cancelar
                </button>
              )}
              <button type="button" className="btn btn-outline btn-sm" onClick={() => handleEliminarRuta(ruta.id)}>
                Eliminar
              </button>
            </div>
          </RutaCard>
        ))}
      </div>
    </div>
  );
}

export default MisRutas;