![Brava](public/Logo%20Brava.svg)

# Brava — Frontend

Aplicación web progresiva diseñada para **acompañar a pacientes oncológicos** durante su tratamiento. Permite registrar medicamentos, visualizar un calendario de dosis, marcar tomas y recibir recordatorios en tiempo real.

---

## Estado del proyecto

MVP desarrollado en el marco de un TFG, siguiendo una planificación de sprints con metodología ágil. El núcleo funcional (autenticación, CRUD de medicación, calendario mensual, notificaciones in-app) está priorizado como parte comprometida del MVP; funcionalidades como el seguimiento de síntomas y emociones quedan documentadas como trabajo futuro.

---

## ✨ Funcionalidades

- **Autenticación**: registro e inicio de sesión con JWT, sesión persistente y protección de rutas.
- **Pantalla de bienvenida**: primera pantalla que ve la usuaria sin sesión activa, con acceso a registro e inicio de sesión.
- **Calendario mensual**: vista interactiva con indicadores visuales de dosis pendientes y completadas.
- **Detalle de día**: vista específica de los medicamentos programados para una fecha concreta del calendario.
- **Gestión de medicamentos**: registro multi-paso con tipo de tratamiento, dosificación, horario y recordatorio.
- **Dosis diarias**: listado de medicamentos del día con estado (tomado/pendiente) y código de colores por categoría de tratamiento.
- **Tomar medicamento**: modal con selector de hora para registrar el momento exacto de la toma, incluso si no coincide con la hora programada.
- **Próxima dosis**: widget con cuenta atrás hasta la siguiente toma programada.
- **Notificaciones in-app**: sondeo automático con alertas antes y en el momento de la toma programada, con aviso sonoro.
- **Editar y eliminar**: modificación y eliminación de medicamentos con confirmación.
- **Perfil de usuario**: visualización de datos personales y cierre de sesión.

---

## 🧱 Stack Tecnológico

| Tecnología | Versión |
|-----------|---------|
| [React](https://react.dev) | ^19.2.7 |
| [React DOM](https://react.dev) | ^19.2.7 |
| [Vite](https://vite.dev) | ^8.1.1 |
| [react-router-dom](https://reactrouter.com) | ^7.18.1 |
| [Axios](https://axios-http.com) | ^1.18.1 |
| [Bootstrap 5](https://getbootstrap.com) | ^5.3.8 |
| [Bootstrap Icons](https://icons.getbootstrap.com) | ^1.13.1 |
| [Sass](https://sass-lang.com) (SCSS Modules) | ^1.101.0 |
| [react-day-picker](https://react-day-picker.js.org) | ^10.0.1 |
| [date-fns](https://date-fns.org) | ^4.4.0 |
| [Vitest](https://vitest.dev) | ^4.1.10 |
| [Testing Library (React)](https://testing-library.com/react) | ^16.3.2 |
| [ESLint](https://eslint.org) | ^10.6.0 |

---

## 📁 Estructura del Proyecto
```
brava-frontend/
├── public/ # Archivos estáticos (logo, sonido, imagen 404)
├── src/
│ ├── app/ # Componente raíz, providers y router
│ ├── assets/images/ # Imágenes de la app
│ ├── features/ # Módulos funcionales
│ │ ├── auth/ # Autenticación (login, registro)
│ │ ├── calendar/ # Calendario, detalle de día y dosis diarias
│ │ ├── medication/ # CRUD de medicamentos
│ │ ├── notifications/ # Notificaciones en tiempo real
│ │ ├── welcome/ # Pantalla de bienvenida
│ │ ├── ProfilePage/ # Perfil de usuario
│ │ └── NotFoundPage/ # Página 404
│ ├── services/ # Cliente HTTP centralizado (Axios)
│ ├── shared/components/ # Sistema de diseño (Atomic Design)
│ │ ├── atoms/ # Button, Input, Select, Toggle, Stepper, TimePicker
│ │ ├── molecules/ # FormCard, Autocomplete
│ │ ├── organisms/ # Header, Modal, Toast
│ │ └── layout/ # AppLayout, ProtectedRoute
│ ├── store/ # Contextos globales (AuthContext)
│ └── styles/ # Estilos globales SCSS
│ ├── abstracts/ # Variables, mixins
│ └── base/ # Reset CSS
```
---

## ⚙️ Configuración

### Prerrequisitos

Este frontend requiere que el backend **brava-backend** esté corriendo (por defecto en `http://localhost:8080`), con su base de datos PostgreSQL conectada. Consulta el README de ese repositorio para las instrucciones de arranque.

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Esta variable define la URL base que usa el cliente HTTP (Axios) para todas las peticiones al backend.

---

## 🚀 Comandos

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de la compilación
npm run preview

# Ejecutar linter
npm run lint

# Ejecutar tests
npm run test
```

---

## 🗺️ Rutas

| Ruta | Página | Acceso |
|------|--------|--------|
| `/` | WelcomePage | Público |
| `/login` | LoginPage | Público |
| `/register` | RegisterPage | Público |
| `/calendar` | HomePage (calendario + dosis) | Protegido |
| `/calendar/:date` | DayDetailPage | Protegido |
| `/medications/register` | RegisterMedication | Protegido |
| `/profile` | ProfilePage | Protegido |
| `*` | NotFoundPage (404) | Público |

---

## 🏗️ Arquitectura

- **Organización por features**: cada funcionalidad agrupa sus páginas, componentes, hooks, servicios y constantes.
- **Atomic Design**: sistema de componentes en 3 niveles (átomos, moléculas, organismos) más layouts.
- **Context API**: estado global de autenticación (`AuthContext`) y notificaciones (`NotificationContext`).
- **Eventos personalizados del DOM**: comunicación entre componentes no relacionados (ej: `dose-registered`).
- **Interceptor HTTP**: inyección automática del token JWT y manejo global de errores 401/403.
- **SCSS Modules**: estilos encapsulados por componente con variables semánticas globales.

---

## 🎨 Sistema de Estilos

- **Color de marca**: rosa (`#D71672`) como color primario.
- **Tipografía**: Inter desde Google Fonts.
- **Paleta completa**: neutros, rosa, naranja, verde (éxito) y rojo (error) con 10 tonos cada uno.
- **Escala de espaciado**: 24 valores desde 0px hasta 224px.
- **Breakpoints**: tablet (768px) y desktop (1024px).
- **Mixins**: utilidades de flexbox, botones, enfoque, responsive y transiciones.

---

## 📄 Licencia

Reconocimiento - Compartir Igual (CC BY-SA)