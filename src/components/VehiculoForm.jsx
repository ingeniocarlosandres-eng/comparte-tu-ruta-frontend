import { useState } from 'react';

/**
 * Formulario de registro de vehículo.
 * Componente controlado usado en la página de gestión de vehículos del conductor.
 */
function VehiculoForm({ onSubmit, cargando, error }) {
  const [formulario, setFormulario] = useState({
    placa: '',
    marca: '',
    modelo: '',
    color: '',
    capacidadMaxima: 4,
  });

  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();
    onSubmit({
      ...formulario,
      placa: formulario.placa.toUpperCase(),
      capacidadMaxima: Number(formulario.capacidadMaxima),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="auth-alert err">{error}</div>}

      <div className="form-group">
        <label className="form-label req" htmlFor="placa">Placa</label>
        <input
          id="placa"
          name="placa"
          type="text"
          className="form-input"
          placeholder="ABC123"
          maxLength={10}
          value={formulario.placa}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label req" htmlFor="marca">Marca</label>
        <input
          id="marca"
          name="marca"
          type="text"
          className="form-input"
          placeholder="Chevrolet"
          value={formulario.marca}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label req" htmlFor="modelo">Modelo</label>
        <input
          id="modelo"
          name="modelo"
          type="text"
          className="form-input"
          placeholder="Spark GT"
          value={formulario.modelo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="color">Color</label>
        <input
          id="color"
          name="color"
          type="text"
          className="form-input"
          placeholder="Blanco"
          value={formulario.color}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label req" htmlFor="capacidadMaxima">Capacidad de puestos</label>
        <input
          id="capacidadMaxima"
          name="capacidadMaxima"
          type="number"
          min={1}
          max={4}
          className="form-input"
          value={formulario.capacidadMaxima}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-blue btn-full" disabled={cargando}>
        {cargando ? 'Registrando...' : 'Registrar vehículo'}
      </button>
    </form>
  );
}

export default VehiculoForm;