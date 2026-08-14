import { useState, useEffect } from 'react';

/**
 * Formulario de ruta reutilizable.
 * Se usa tanto para crear como para editar una ruta (mismo componente,
 * distinto modo según si se recibe `rutaInicial`).
 */
function RutaForm({ rutaInicial, vehiculos, onSubmit, onCancelar, cargando, error }) {
  const [formulario, setFormulario] = useState({
    vehiculoId: '',
    barrioOrigen: '',
    barrioDestino: '',
    fechaSalida: '',
    horaSalida: '',
    precioPorPuesto: '',
    puestosDisponibles: 4,
  });

  useEffect(() => {
    if (rutaInicial) {
      setFormulario({
        vehiculoId: rutaInicial.vehiculoId,
        barrioOrigen: rutaInicial.barrioOrigen,
        barrioDestino: rutaInicial.barrioDestino,
        fechaSalida: rutaInicial.fechaSalida?.slice(0, 10) || '',
        horaSalida: rutaInicial.horaSalida?.slice(0, 5) || '',
        precioPorPuesto: rutaInicial.precioPorPuesto,
        puestosDisponibles: rutaInicial.puestosDisponibles,
      });
    }
  }, [rutaInicial]);

  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();
    onSubmit({
      ...formulario,
      vehiculoId: Number(formulario.vehiculoId),
      precioPorPuesto: Number(formulario.precioPorPuesto),
      puestosDisponibles: Number(formulario.puestosDisponibles),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="auth-alert err">{error}</div>}

      <div className="form-group">
        <label className="form-label req" htmlFor="vehiculoId">Vehículo</label>
        <select
          id="vehiculoId"
          name="vehiculoId"
          className="form-input"
          value={formulario.vehiculoId}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un vehículo</option>
          {vehiculos.map((v) => (
            <option key={v.id} value={v.id}>{v.marca} - {v.placa}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label req" htmlFor="barrioOrigen">Barrio de origen</label>
        <input
          id="barrioOrigen"
          name="barrioOrigen"
          type="text"
          className="form-input"
          value={formulario.barrioOrigen}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label req" htmlFor="barrioDestino">Barrio de destino</label>
        <input
          id="barrioDestino"
          name="barrioDestino"
          type="text"
          className="form-input"
          value={formulario.barrioDestino}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label req" htmlFor="fechaSalida">Fecha de salida</label>
        <input
          id="fechaSalida"
          name="fechaSalida"
          type="date"
          className="form-input"
          value={formulario.fechaSalida}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label req" htmlFor="horaSalida">Hora de salida</label>
        <input
          id="horaSalida"
          name="horaSalida"
          type="time"
          className="form-input"
          value={formulario.horaSalida}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label req" htmlFor="precioPorPuesto">Precio por puesto (COP)</label>
        <input
          id="precioPorPuesto"
          name="precioPorPuesto"
          type="number"
          min={3000}
          step={500}
          className="form-input"
          value={formulario.precioPorPuesto}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label req" htmlFor="puestosDisponibles">Puestos disponibles</label>
        <input
          id="puestosDisponibles"
          name="puestosDisponibles"
          type="number"
          min={0}
          max={4}
          className="form-input"
          value={formulario.puestosDisponibles}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ display: 'flex', gap: 'var(--sp3)' }}>
        <button type="submit" className="btn btn-blue" disabled={cargando}>
          {cargando ? 'Guardando...' : rutaInicial ? 'Guardar cambios' : 'Publicar ruta'}
        </button>
        {onCancelar && (
          <button type="button" className="btn btn-outline" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default RutaForm;