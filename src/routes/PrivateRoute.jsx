import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Ruta protegida.
 * - Si no hay sesión activa, redirige a /login.
 * - Si se pasa soloConductor=true y el usuario no es conductor/ambos,
 *   redirige a /rutas/buscar (vista por defecto de pasajero).
 */
function PrivateRoute({ children, soloConductor = false }) {
  const { usuario, cargando, esConductor } = useAuth();

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (soloConductor && !esConductor()) {
    return <Navigate to="/rutas/buscar" replace />;
  }

  return children;
}

export default PrivateRoute;