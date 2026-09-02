import { useState } from 'react';

/**
 * Formulario de solicitud de reserva.
 * Se muestra dentro de una RutaCard en la vista de búsqueda.
 */
function ReservaForm({ ruta, onReservar, cargando, mensaje }) {
  const [puestos, setPuestos] = useState(1);

  const handleSubmit = (evento) => {
    evento.preventDefault();
    onReservar({ rutaId: ruta.id, puestosReservados: Number(puestos) });
  };

  if (mensaje) {
    return (
      <div style={{ padding: '0 var(--sp5) var(--sp5)' }}>
        <div className="auth-alert success">{mensaje}</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '0 var(--sp5) var(--sp5)', display: 'flex', gap: 'var(--sp2)', alignItems: 'center', flexWrap: 'wrap' }}>
      <select
        className="form-input"
        style={{ height: 40, minWidth: 120, flex: '1 1 auto' }}
        value={puestos}
        onChange={(e) => setPuestos(e.target.value)}
      >
        {Array.from({ length: ruta.puestosDisponibles }, (_, i) => i + 1).map((n) => (
          <option key={n} value={n}>{n} puesto{n > 1 ? 's' : ''}</option>
        ))}
      </select>
      <button type="submit" className="btn btn-orange btn-sm" disabled={cargando}>
        {cargando ? 'Enviando...' : 'Reservar'}
      </button>
    </form>
  );
}

export default ReservaForm;