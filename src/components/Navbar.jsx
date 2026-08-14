import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

/**
 * Barra de navegación persistente.
 * Muestra enlaces distintos según si hay sesión activa y el rol del usuario.
 */
function Navbar() {
  const { usuario, logout, esConductor } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="topnav">
      <Link to="/" className="topnav__brand">
        <img src={logo} alt="Comparte Tu Ruta" className="topnav__logo-img" />
        <span className="topnav__brand-text">
          <strong>Comparte Tu Ruta</strong>
          <span>Cali</span>
        </span>
      </Link>

      {usuario ? (
        <>
          <div className="topnav__links">
            <Link to="/rutas/buscar">Buscar rutas</Link>
            <Link to="/reservas/mis-reservas">Mis reservas</Link>
            {esConductor() && (
              <>
                <Link to="/rutas/mis-rutas">Mis rutas</Link>
                <Link to="/reservas/solicitudes">Solicitudes</Link>
                <Link to="/vehiculos">Mis vehículos</Link>
              </>
            )}
          </div>
          <div className="topnav__actions">
            <span className="topnav__user">Hola, {usuario.nombre.split(' ')[0]}</span>
            <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </>
      ) : (
        <div className="topnav__actions">
          <Link to="/login" className="btn btn-outline btn-sm">Iniciar sesión</Link>
          <Link to="/registro" className="btn btn-blue btn-sm">Registrarse</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;