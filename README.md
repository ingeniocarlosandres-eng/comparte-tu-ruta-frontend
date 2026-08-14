# Comparte Tu Ruta — Frontend

Frontend en React del proyecto formativo **Comparte Tu Ruta**, una plataforma de carpooling comunitario para barrios periféricos de Cali (SENA — Tecnólogo en Análisis y Desarrollo de Software).

Conecta conductores y pasajeros de barrios como Poblado Campestre, Juanchito, Floralia, Terrón Colorado, Ciudad Córdoba y Charco Azul para compartir trayectos cotidianos de forma segura y económica.

## Stack tecnológico

- **React 18** + **Vite** — librería de UI y build tool
- **React Router DOM** — enrutamiento y navegación
- **Axios** — cliente HTTP para consumir la API
- **Context API** — manejo de estado global de autenticación
- **CSS puro** — sistema de diseño propio basado en tokens (sin frameworks de UI)

## Requisitos previos

- Node.js 18 o superior
- El backend de Comparte Tu Ruta corriendo en `http://localhost:3000` ([repositorio del backend](https://github.com/ingeniocarlosandres-eng/comparte-tu-ruta-backend))

## Instalación

```bash
git clone https://github.com/ingeniocarlosandres-eng/comparte-tu-ruta-frontend.git
cd comparte-tu-ruta-frontend
npm install
```

Crea un archivo `.env` en la raíz del proyecto con:
VITE_API_URL=http://localhost:3000/api
## Uso

```bash
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

## Estructura del proyecto
src/
├── pages/ # Vistas de la aplicación (una por ruta)
├── components/ # Componentes reutilizables
├── services/ # Cliente Axios y funciones de consumo de la API
├── context/ # Contexto de autenticación (sesión global)
├── routes/ # Configuración de rutas y protección por rol
└── assets/ # Logo e imágenes estáticas
## Funcionalidades implementadas

- **Autenticación**: registro e inicio de sesión con JWT, persistencia de sesión
- **Roles de usuario**: pasajero, conductor o ambos, con rutas protegidas según el rol
- **Búsqueda de rutas**: filtro por origen, destino y fecha
- **Gestión de rutas** (conductor): publicar, editar, cancelar y eliminar rutas propias
- **Gestión de vehículos** (conductor): registro de vehículos propios
- **Reservas**: solicitud de puestos por parte del pasajero, y confirmación/rechazo por parte del conductor

## Componentes principales

| Componente | Descripción |
|---|---|
| `Navbar` | Navegación persistente, adaptada al estado de sesión y rol |
| `LoginForm` / `RegistroForm` | Formularios controlados de autenticación |
| `RutaCard` | Tarjeta reutilizable para mostrar una ruta (búsqueda y dashboard) |
| `RutaForm` | Formulario reutilizable para publicar/editar rutas |
| `VehiculoForm` | Formulario de registro de vehículos |
| `ReservaForm` | Formulario de solicitud de reserva de puestos |
| `FiltroBusqueda` | Filtro de búsqueda de rutas |
| `PrivateRoute` | Protección de rutas según autenticación y rol |

## Backend relacionado

Este frontend consume la API REST de [comparte-tu-ruta-backend](https://github.com/ingeniocarlosandres-eng/comparte-tu-ruta-backend) (Node.js, Express, MySQL).

## Autor

Carlos Andrés Bolaños Arbeláez — Aprendiz SENA, Tecnólogo en Análisis y Desarrollo de Software.