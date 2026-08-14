import { useState } from 'react';

/**
 * Filtro de búsqueda de rutas.
 * Componente controlado que emite el evento onBuscar con los criterios.
 */
function FiltroBusqueda({ onBuscar, cargando }) {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSubmit = (evento) => {
    evento.preventDefault();
    onBuscar({ origen, destino, fecha });
  };

  return (
    <form className="filtro-busqueda" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="origen">Origen</label>
        <input
          id="origen"
          type="text"
          className="form-input"
          placeholder="Ej: Poblado Campestre"
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="destino">Destino</label>
        <input
          id="destino"
          type="text"
          className="form-input"
          placeholder="Ej: Ciudad Córdoba"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="fecha">Fecha</label>
        <input
          id="fecha"
          type="date"
          className="form-input"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-blue" disabled={cargando}>
        {cargando ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  );
}

export default FiltroBusqueda;