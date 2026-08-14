import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import logo from '../assets/logo.png';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (credenciales) => {
    setError('');
    setCargando(true);
    try {
      await login(credenciales);
      navigate('/rutas/buscar');
    } catch (err) {
      const mensaje = err.response?.data?.mensaje || 'Credenciales inválidas';
      setError(mensaje);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-layout">
      <aside className="auth-panel">
        <img src={logo} alt="Comparte Tu Ruta" />
        <h1>Viaja seguro,<br />viaja <em>juntos</em></h1>
        <p>Conductores y pasajeros de los barrios de Cali compartiendo rutas cotidianas.</p>
      </aside>
      <section className="auth-form-panel">
        <div className="auth-page">
          <h1 style={{ fontSize: '1.9rem' }}>Iniciar sesión</h1>
          <LoginForm onSubmit={handleLogin} cargando={cargando} error={error} />
          <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
        </div>
      </section>
    </div>
  );
}

export default Login;