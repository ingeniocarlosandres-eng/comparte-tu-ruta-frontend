import { useState } from 'react';

/**
 * Formulario de registro.
 * Componente controlado con los campos validados por el backend
 * (nombre, email, password, telefono, barrio, tipoUsuario).
 */
function RegistroForm({ onSubmit, cargando, error }) {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    barrio: '',
    tipoUsuario: 'pasajero',
  });

  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();
    onSubmit(formulario);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="auth-alert err">{error}</div>}

      <div className="form-group">
        <label className="form-label req" htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          className="form-input"
          value={formulario.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label req" htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-input"
          value={formulario.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label req" htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          className="form-input"
          value={formulario.password}
          onChange={handleChange}
          minLength={6}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label req" htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          className="form-input"
          value={formulario.telefono}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label req" htmlFor="barrio">Barrio</label>
        <input
          id="barrio"
          name="barrio"
          type="text"
          className="form-input"
          value={formulario.barrio}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="tipoUsuario">Quiero registrarme como</label>
        <select
          id="tipoUsuario"
          name="tipoUsuario"
          className="form-input"
          value={formulario.tipoUsuario}
          onChange={handleChange}
        >
          <option value="pasajero">Pasajero</option>
          <option value="conductor">Conductor</option>
          <option value="ambos">Ambos</option>
        </select>
      </div>

      <button type="submit" className="btn btn-orange btn-full" disabled={cargando}>
        {cargando ? 'Registrando...' : 'Registrarme'}
      </button>
    </form>
  );
}

export default RegistroForm;