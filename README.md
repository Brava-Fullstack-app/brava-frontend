
![Brava](public/Simbol%20brava%201.svg)

# Brava — Frontend

Aplicación web progresiva diseñada para **acompañar a pacientes oncológicos** durante su tratamiento. Permite registrar medicamentos, visualizar un calendario de dosis, marcar tomas y recibir recordatorios en tiempo real.

---

## ✨ Funcionalidades

- **Autenticación**: registro e inicio de sesión con JWT, sesión persistente y protección de rutas.
- **Calendario mensual**: vista interactiva con indicadores visuales de dosis pendientes y completadas.
- **Gestión de medicamentos**: registro multi-paso con tipo de tratamiento, dosificación, horario y recordatorio.
- **Dosis diarias**: listado de medicamentos del día con estado (tomado/pendiente) y código de colores por categoría.
- **Tomar medicamento**: modal con TimePicker para registrar la hora exacta de la toma.
- **Próxima dosis**: widget con cuenta regresiva hasta la siguiente toma programada.
- **Notificaciones in-app**: sondeo automático cada 10 segundos con alertas 5 minutos antes y a la hora exacta, con sonido.
- **Editar y eliminar**: modificación y eliminación de medicamentos con confirmación.
- **Perfil de usuario**: visualización de datos personales y cierre de sesión.
- **Onboarding**: pantalla de bienvenida con descripción de la app y acceso a registro/login.

---

## 🧱 Stack Tecnológico

| Tecnología | Versión |
|-----------|---------|
| [React](https://react.dev) | ^19.2.7 |
| [Vite](https://vite.dev) | ^8.1.1 |
| [react-router-dom](https://reactrouter.com) | ^7.18.1 |
| [Axios](https://axios-http.com) | ^1.18.1 |
| [Bootstrap 5](https://getbootstrap.com) | ^5.3.8 |
| [Bootstrap Icons](https://icons.getbootstrap.com) | ^1.13.1 |
| [Sass](https://sass-lang.com) (SCSS Modules) | ^1.101.0 |
| [react-day-picker](https://react-day-picker.js.org) | ^10.0.1 |
| [date-fns](https://date-fns.org) | ^4.4.0 |
| [ESLint](https://eslint.org) | ^10.6.0 |

---

## 📁 Estructura del Proyecto

```
brava-frontend/
├── public/                          # Archivos estáticos (logo, sonido, imagen 404)
├── src/
│   ├── app/                         # Componente raíz, providers y router
│   ├── assets/images/               # Imágenes de la app
│   ├── features/                    # Módulos funcionales
│   │   ├── auth/                    #   Autenticación (login, registro)
│   │   ├── calendar/                #   Calendario y dosis diarias
│   │   ├── medication/              #   CRUD de medicamentos
│   │   ├── notifications/           #   Notificaciones en tiempo real
│   │   ├── welcome/                 #   Página de bienvenida
│   │   ├── ProfilePage/             #   Perfil de usuario
│   │   └── NotFoundPage/            #   Página 404
│   ├── services/                    # Cliente HTTP centralizado (Axios)
│   ├── shared/components/           # Sistema de diseño (Atomic Design)
│   │   ├── atoms/                   #   Button, Input, Select, Toggle, Stepper, TimePicker
│   │   ├── molecules/               #   FormCard, Autocomplete
│   │   ├── organisms/               #   Header, Modal, Toast
│   │   └── layout/                  #   AppLayout, ProtectedRoute
│   ├── store/                       # Contextos globales (AuthContext)
│   └── styles/                      # Estilos globales SCSS
│       ├── abstracts/               #   Variables, mixins
│       └── base/                    #   Reset CSS
```

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
```

---

## 🔌 Endpoints del Backend

La app se comunica con un backend REST en `http://localhost:8080` (configurable en `.env`):

| Método | Endpoint | Propósito |
|--------|----------|-----------|
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/register` | Registrar usuario |
| GET | `/api/auth/me` | Obtener usuario autenticado |
| GET | `/api/calendar?year=&month=` | Resumen mensual del calendario |
| GET | `/api/calendar/next-dose` | Próxima dosis |
| GET | `/api/medications` | Listar medicamentos |
| GET | `/api/medications/today` | Dosis de hoy |
| GET | `/api/medications/date?date=` | Dosis por fecha específica |
| GET | `/api/medications/next-dose` | Próxima dosis desde medicamentos |
| POST | `/api/medications` | Crear medicamento |
| PUT | `/api/medications/:id` | Actualizar medicamento |
| DELETE | `/api/medications/:id` | Eliminar medicamento |
| POST | `/api/medications/:id/doses` | Registrar dosis como tomada |
| GET | `/api/medication-catalog?category=` | Catálogo de medicamentos por categoría |

---

## 🗺️ Rutas

| Ruta | Página | Acceso |
|------|--------|--------|
| `/` | WelcomePage (onboarding) | Público |
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

Proyecto privado — uso académico.
