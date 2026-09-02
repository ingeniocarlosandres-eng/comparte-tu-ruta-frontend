import { useState } from 'react';
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
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuAbierto(false);
    navigate('/login');
  };

  const cerrarMenu = () => setMenuAbierto(false);

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
          <button
            type="button"
            className="topnav__toggle"
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto((abierto) => !abierto)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className={`topnav__links ${menuAbierto ? 'topnav__links--abierto' : ''}`}>
            <Link to="/rutas/buscar" onClick={cerrarMenu}>Buscar rutas</Link>
            <Link to="/reservas/mis-reservas" onClick={cerrarMenu}>Mis reservas</Link>
            {esConductor() && (
              <>
                <Link to="/rutas/mis-rutas" onClick={cerrarMenu}>Mis rutas</Link>
                <Link to="/reservas/solicitudes" onClick={cerrarMenu}>Solicitudes</Link>
                <Link to="/vehiculos" onClick={cerrarMenu}>Mis vehículos</Link>
              </>
            )}
            <button type="button" className="btn btn-outline btn-sm topnav__logout-mobile" onClick={handleLogout}>
              Cerrar sesión
            </button>
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