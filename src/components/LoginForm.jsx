import { useState } from 'react';

/**
 * Formulario de inicio de sesión.
 * Componente controlado: cada input está ligado al state,
 * y el evento onSubmit delega la lógica de autenticación al padre (page).
 */
function LoginForm({ onSubmit, cargando, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evento) => {
    evento.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="auth-alert err">{error}</div>}

      <div className="form-group">
        <label className="form-label req" htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label req" htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-blue btn-full" disabled={cargando}>
        {cargando ? 'Ingresando...' : 'Iniciar sesión'}
      </button>
    </form>
  );
}

export default LoginForm;