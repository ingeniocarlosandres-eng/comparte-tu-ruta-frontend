import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import BuscarRutas from '../pages/BuscarRutas';
import MisRutas from '../pages/MisRutas';
import MisReservas from '../pages/MisReservas';
import SolicitudesPendientes from '../pages/SolicitudesPendientes';
import GestionVehiculos from '../pages/GestionVehiculos';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      <Route
        path="/rutas/buscar"
        element={<PrivateRoute><BuscarRutas /></PrivateRoute>}
      />
      <Route
        path="/rutas/mis-rutas"
        element={<PrivateRoute soloConductor><MisRutas /></PrivateRoute>}
      />
      <Route
        path="/reservas/mis-reservas"
        element={<PrivateRoute><MisReservas /></PrivateRoute>}
      />
      <Route
        path="/reservas/solicitudes"
        element={<PrivateRoute soloConductor><SolicitudesPendientes /></PrivateRoute>}
      />
      <Route
        path="/vehiculos"
        element={<PrivateRoute soloConductor><GestionVehiculos /></PrivateRoute>}
      />

      <Route path="/" element={<Navigate to="/rutas/buscar" replace />} />
      <Route path="*" element={<Navigate to="/rutas/buscar" replace />} />
    </Routes>
  );
}

export default AppRoutes;