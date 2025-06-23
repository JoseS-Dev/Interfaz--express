# 🏥 Bienestar Total - Sistema de Gestión de Perfiles

## 📋 Descripción

Sistema web completo para la gestión de perfiles de usuarios con formulario tipo wizard, autenticación segura, mapas interactivos y panel de administración.

## ✨ Características Principales

### 🔐 Sistema de Autenticación
- Login/Logout seguro con cookies
- Verificación de sesión automática
- Rutas protegidas para usuarios y administradores
- Contexto de autenticación global

### 📝 Formulario de Perfil (Wizard)
- **5 pasos secuenciales**:
  1. Información Personal
  2. Dirección y Ubicación (con mapa interactivo)
  3. Información Laboral (con mapa de empresa)
  4. Información Bancaria
  5. Información Adicional

- **Campos inteligentes**:
  - Bloqueados por defecto
  - Icono de lápiz para editar individualmente
  - Validaciones en tiempo real
  - Confirmaciones antes de abandonar

### 🗺️ Mapas Interactivos
- Integración con Leaflet y React-Leaflet
- Geocoder para búsqueda de direcciones
- Selección de ubicación personal y empresarial
- Guardado de coordenadas y datos de ubicación

### 🎨 Panel de Administración
- Gestión de colores del sistema
- Gestión de tipografías
- Interfaz intuitiva para administradores

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** + **TypeScript**
- **React Router DOM** para navegación
- **Leaflet** + **React-Leaflet** para mapas
- **SweetAlert2** para confirmaciones
- **Axios** para peticiones HTTP
- **Tailwind CSS** para estilos

### Backend
- **Express.js** como servidor
- **MySQL2** para base de datos
- **bcrypt** para encriptación
- **jsonwebtoken** para tokens
- **Zod** para validaciones
- **Multer** para manejo de archivos

## 📁 Estructura del Proyecto

```
Interfaz--express/
├── Backend/                    # Servidor Express.js
│   ├── Controller/            # Controladores de la API
│   ├── Models/                # Modelos de base de datos
│   ├── Routes/                # Rutas de la API
│   ├── Middlewares/           # Middlewares de autenticación
│   └── Validations/           # Esquemas de validación
├── Plantilla en React/        # Frontend React
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── Pages/            # Páginas principales
│   │   ├── hooks/            # Hooks personalizados
│   │   ├── services/         # Servicios de API
│   │   ├── types/            # Tipos TypeScript
│   │   └── context/          # Contextos de React
└── PROJECT_STRUCTURE.md       # Documentación detallada
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- MySQL (versión 8.0 o superior)
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd Interfaz--express
```

### 2. Configurar el Backend
```bash
cd Backend
npm install
```

Crear archivo `.env` en la carpeta `Backend/`:
```env
PORT=8080
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tu_base_de_datos
JWT_SECRET=tu_secreto_jwt
```

### 3. Configurar la Base de Datos
```bash
# Ejecutar el script SQL
mysql -u tu_usuario -p tu_base_de_datos < Table.sql
```

### 4. Configurar el Frontend
```bash
cd "Plantilla en React"
npm install
```

## 🚀 Ejecución del Proyecto

### Iniciar el Backend
```bash
cd Backend
npm run dev
```
El servidor estará disponible en: `http://localhost:8080`

### Iniciar el Frontend
```bash
cd "Plantilla en React"
npm run dev
```
La aplicación estará disponible en: `http://localhost:5173`

## 📖 Uso del Sistema

### 1. Registro y Login
- Accede a la página principal
- Haz clic en "Iniciar Sesión" en el navbar
- Regístrate o inicia sesión con tus credenciales

### 2. Configuración de Perfil
- Una vez autenticado, ve a "Configuración" en el navbar
- Completa el formulario paso a paso
- Usa los mapas para seleccionar ubicaciones
- Guarda cada paso antes de continuar

### 3. Navegación
- El navbar te permite navegar a diferentes secciones
- Las URLs se actualizan correctamente
- Confirmaciones aparecen si intentas abandonar con cambios sin guardar

## 🔧 API Endpoints

### Autenticación
- `POST /Users/login` - Iniciar sesión
- `POST /Users/register` - Registrar usuario
- `POST /Users/logout` - Cerrar sesión
- `POST /Users/verify` - Verificar sesión

### Perfil de Usuario
- `GET /Users/:id_user` - Obtener perfil completo
- `PATCH /Users/:id_user` - Actualizar perfil

### Administración
- `GET /Colors` - Obtener colores
- `POST /Colors` - Crear color
- `GET /Tipography` - Obtener tipografías
- `POST /Tipography` - Crear tipografía

## 🎨 Paleta de Colores

- **Primary**: #DFEEFF (Azul muy claro - 60%)
- **Secondary**: #2563EB (Azul - 30%)
- **Tertiary**: #F97316 (Naranja - 10%)
- **Quaternary**: #FFFFFF (Blanco)
- **Quinary**: #374151 (Negro)

## 📝 Notas Importantes

- El formulario de perfil tiene validaciones completas
- Los mapas requieren conexión a internet para el geocoder
- Las sesiones se mantienen con cookies seguras
- El sistema maneja valores nulos correctamente en la base de datos

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Jose Santana** - [GitHub](https://github.com/JoseS-Dev)

---

⭐ Si este proyecto te ha sido útil, ¡dale una estrella!