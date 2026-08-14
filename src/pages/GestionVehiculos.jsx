import { useState, useEffect } from 'react';
import { misVehiculos, registrarVehiculo } from '../services/vehiculosService';
import VehiculoForm from '../components/VehiculoForm';

function GestionVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [errorForm, setErrorForm] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);

  const cargarVehiculos = async () => {
    setCargando(true);
    setError('');
    try {
      const data = await misVehiculos();
      setVehiculos(data.vehiculos);
    } catch (err) {
      setError('No se pudieron cargar tus vehículos.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const handleSubmit = async (datosVehiculo) => {
    setErrorForm('');
    setGuardando(true);
    try {
      await registrarVehiculo(datosVehiculo);
      setMostrarForm(false);
      await cargarVehiculos();
    } catch (err) {
      const mensaje = err.response?.data?.mensaje || 'No se pudo registrar el vehículo';
      setErrorForm(mensaje);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="container" style={{ paddingBlock: 'var(--sp6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp5)', flexWrap: 'wrap', gap: 'var(--sp3)' }}>
        <h1 style={{ fontSize: '1.6rem' }}>Mis vehículos</h1>
        {!mostrarForm && (
          <button type="button" className="btn btn-blue" onClick={() => { setErrorForm(''); setMostrarForm(true); }}>
            + Registrar vehículo
          </button>
        )}
      </div>

      {error && <div className="auth-alert err">{error}</div>}

      {mostrarForm && (
        <div className="card" style={{ padding: 'var(--sp5)', marginBottom: 'var(--sp6)', maxWidth: '480px' }}>
          <h3 style={{ marginBottom: 'var(--sp4)' }}>Registrar nuevo vehículo</h3>
          <VehiculoForm onSubmit={handleSubmit} cargando={guardando} error={errorForm} />
          <button type="button" className="btn btn-outline btn-full" style={{ marginTop: 'var(--sp3)' }} onClick={() => setMostrarForm(false)}>
            Cancelar
          </button>
        </div>
      )}

      {!cargando && vehiculos.length === 0 && !mostrarForm && (
        <div className="empty-state">
          <p>Todavía no has registrado ningún vehículo.</p>
        </div>
      )}

      <div className="grid-cards">
        {vehiculos.map((v) => (
          <div key={v.id} className="card" style={{ padding: 'var(--sp5)' }}>
            <h3 style={{ marginBottom: 'var(--sp2)' }}>{v.marca} {v.modelo}</h3>
            <p>Placa: <strong>{v.placa}</strong></p>
            {v.color && <p>Color: {v.color}</p>}
            <p>Capacidad: {v.capacidadMaxima} puestos</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GestionVehiculos;