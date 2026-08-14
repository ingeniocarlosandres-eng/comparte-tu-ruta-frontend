import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegistroForm from '../components/RegistroForm';
import logo from '../assets/logo.png';

function Registro() {
  const { registrarUsuario } = useAuth();
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleRegistro = async (datosFormulario) => {
    setError('');
    setCargando(true);
    try {
      await registrarUsuario(datosFormulario);
      navigate('/rutas/buscar');
    } catch (err) {
      const mensaje = err.response?.data?.mensaje || 'No se pudo completar el registro';
      setError(mensaje);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-layout">
      <aside className="auth-panel">
        <img src={logo} alt="Comparte Tu Ruta" />
        <h1>Únete a la<br /><em>comunidad</em></h1>
        <p>Regístrate en minutos y empieza a compartir rutas hoy mismo.</p>
      </aside>
      <section className="auth-form-panel">
        <div className="auth-page">
          <h1 style={{ fontSize: '1.9rem' }}>Crear cuenta</h1>
          <RegistroForm onSubmit={handleRegistro} cargando={cargando} error={error} />
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </div>
      </section>
    </div>
  );
}

export default Registro;