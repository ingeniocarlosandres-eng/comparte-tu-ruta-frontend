/**
 * Tarjeta de ruta reutilizable.
 * Muestra los datos de una ruta individual (origen, destino, fecha,
 * hora, precio, cupos disponibles).
 */
function RutaCard({ ruta, children }) {
  const fecha = new Date(`${ruta.fechaSalida}T${ruta.horaSalida}`);
  const fechaTexto = fecha.toLocaleDateString('es-CO', { day: '2-digit', month: 'short' });

  return (
    <div className="route-card">
      <div className="route-card__top">
        <span className="route-card__time">{ruta.horaSalida.slice(0, 5)}</span>
        <span className="route-card__chip">{fechaTexto}</span>
      </div>
      <div className="route-card__body">
        <div className="route-line">
          <span className="route-point">{ruta.barrioOrigen}</span>
          <span className="route-point route-point--fin">{ruta.barrioDestino}</span>
        </div>
      </div>
      <div className="route-card__footer">
        <span>{ruta.puestosDisponibles} puesto(s) disponibles</span>
        <span className="route-card__price">
          ${ruta.precioPorPuesto.toLocaleString('es-CO')}
        </span>
      </div>
      {children}
    </div>
  );
}

export default RutaCard;