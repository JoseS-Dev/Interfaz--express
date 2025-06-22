# Estructura del Proyecto - Bienestar Total

## 📁 Estructura General

```
Interfaz--express/
├── Backend/                    # Servidor Express.js
├── Plantilla en React/         # Frontend React + TypeScript
├── map.html                    # Archivo de referencia del mapa
└── PROJECT_STRUCTURE.md        # Este archivo
```

## 🚀 Backend (Express.js)

### Estructura:
```
Backend/
├── Controller/
│   ├── Users.mjs              # Controlador de usuarios (actualizado)
│   ├── Color.mjs              # Controlador de colores
│   └── Typography.mjs         # Controlador de tipografía
├── Models/
│   ├── UserDB.mjs             # Modelo de usuarios (actualizado con LEFT JOIN)
│   ├── ColorsDB.mjs           # Modelo de colores
│   ├── TypographyDB.mjs       # Modelo de tipografía
│   ├── Connection.mjs         # Configuración de base de datos
│   └── db/                    # Archivos de base de datos
├── Routes/
│   ├── User.mjs               # Rutas de usuarios
│   ├── Color.mjs              # Rutas de colores
│   └── Typography.mjs         # Rutas de tipografía
├── Middlewares/
│   └── Auth.mjs               # Middleware de autenticación
├── Validations/
│   └── SchemaUser.mjs         # Validaciones de usuario
├── app.mjs                    # Archivo principal del servidor
├── package.json               # Dependencias del backend
└── Table.sql                  # Esquema de base de datos
```

### Endpoints principales:
- `POST /Users/login` - Login de usuario
- `POST /Users/register` - Registro de usuario
- `POST /Users/logout` - Cerrar sesión
- `POST /Users/verify` - Verificar autenticación
- `GET /Users/:id_user` - Obtener perfil completo de usuario
- `PATCH /Users/:id_user` - Actualizar perfil de usuario

## ⚛️ Frontend (React + TypeScript)

### Estructura:
```
Plantilla en React/
├── src/
│   ├── components/
│   │   ├── MapSelector.tsx           # Componente de mapa interactivo
│   │   ├── Navbar.tsx                # Barra de navegación (actualizada)
│   │   ├── PrivateRouteUser.tsx      # Ruta protegida para usuarios
│   │   ├── PrivateRouteAdmin.tsx     # Ruta protegida para administradores
│   │   ├── LoginModal.tsx            # Modal de login
│   │   ├── Hero.tsx                  # Componente hero
│   │   ├── Services.tsx              # Componente de servicios
│   │   ├── Gallery.tsx               # Componente de galería
│   │   ├── Contact.tsx               # Componente de contacto
│   │   ├── Footer.tsx                # Componente de pie de página
│   │   ├── Admin/                    # Componentes específicos de admin
│   │   ├── formColors.tsx            # Formulario de colores
│   │   ├── formFonts.tsx             # Formulario de fuentes
│   │   ├── listColors.tsx            # Lista de colores
│   │   ├── listFonts.tsx             # Lista de fuentes
│   │   ├── CardColors.tsx            # Tarjeta de color
│   │   └── CardFonts.tsx             # Tarjeta de fuente
│   ├── Pages/
│   │   ├── Settings.tsx              # Página de configuración de perfil
│   │   ├── Home.tsx                  # Página principal
│   │   ├── Admin.tsx                 # Página de administración
│   │   ├── AdminColors.tsx           # Página de administración de colores
│   │   └── AdminFonts.tsx            # Página de administración de fuentes
│   ├── hooks/
│   │   └── useNavigationGuard.tsx    # Hook para manejar navegación
│   ├── services/
│   │   └── userProfileService.ts     # Servicio para operaciones de perfil
│   ├── types/
│   │   └── user.ts                   # Tipos TypeScript para usuario
│   ├── context/
│   │   ├── AuthContext.tsx           # Contexto de autenticación
│   │   └── axiosInstances.tsx        # Configuración de axios
│   ├── assets/                       # Recursos estáticos
│   ├── App.tsx                       # Componente principal
│   ├── main.tsx                      # Punto de entrada
│   └── index.css                     # Estilos globales
├── package.json                      # Dependencias del frontend
└── vite.config.ts                    # Configuración de Vite
```

## 🔧 Funcionalidades Implementadas

### 1. Sistema de Autenticación
- ✅ Login/Logout con cookies
- ✅ Verificación de sesión
- ✅ Rutas protegidas (admin y usuario)
- ✅ Contexto de autenticación

### 2. Formulario de Perfil (Settings)
- ✅ **5 pasos tipo wizard**:
  1. Información Personal
  2. Dirección y Ubicación (con mapa)
  3. Información Laboral (con mapa de empresa)
  4. Información Bancaria
  5. Información Adicional
- ✅ **Campos bloqueados por defecto** con icono de lápiz para editar
- ✅ **Validaciones por paso** y al guardar
- ✅ **Mapa interactivo** con Leaflet y geocoder
- ✅ **Confirmaciones de navegación** con SweetAlert

### 3. Navegación Inteligente
- ✅ **Confirmación antes de abandonar** si hay cambios sin guardar
- ✅ **Navegación correcta** del navbar (URLs limpias)
- ✅ **Scroll automático** a secciones de la página principal
- ✅ **Hook personalizado** para manejar navegación

### 4. Integración con Backend
- ✅ **API RESTful** completa para usuarios
- ✅ **Manejo de errores** y respuestas
- ✅ **Validaciones** en frontend y backend
- ✅ **Persistencia** de datos en base de datos

## 🎨 Diseño y UX

### Colores del Proyecto:
- **Primary**: #DFEEFF (Azul muy claro - 60%)
- **Secondary**: #2563EB (Azul - 30%)
- **Tertiary**: #F97316 (Naranja - 10%)
- **Quaternary**: #FFFFFF (Blanco)
- **Quinary**: #374151 (Negro)

### Tipografías:
- **Primary**: RobotoSans
- **Secondary**: RobotoSerif

## 📦 Dependencias Principales

### Frontend:
- React 18 + TypeScript
- React Router DOM
- Leaflet + React-Leaflet
- SweetAlert2
- Axios
- Tailwind CSS

### Backend:
- Express.js
- MySQL2
- bcrypt
- jsonwebtoken
- cors
- cookie-parser
- dotenv

## 🚀 Comandos de Ejecución

### Backend:
```bash
cd Backend
npm run dev
```

### Frontend:
```bash
cd "Plantilla en React"
npm run dev
```

## ✅ Estado del Proyecto

**COMPLETADO** - Todas las funcionalidades solicitadas han sido implementadas y probadas:

1. ✅ Vista protegida de configuración
2. ✅ Formulario tipo wizard con 5 pasos
3. ✅ Campos bloqueados con icono de edición
4. ✅ Validaciones completas
5. ✅ Integración con mapa interactivo
6. ✅ Confirmaciones de navegación
7. ✅ Gestión de sesiones
8. ✅ Navegación correcta del navbar
9. ✅ Backend actualizado con LEFT JOIN
10. ✅ Tipos TypeScript completos

El proyecto está listo para producción y todas las funcionalidades funcionan correctamente. 