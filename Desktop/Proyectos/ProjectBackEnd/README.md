# Proyecto Backend (Gestión de Usuarios y Posts)

Este es el Backend desarrollado para el proyecto, utilizando la arquitectura **MERN stack** (MongoDB, Express, Node.js). El objetivo principal es gestionar un sistema para usuarios y contenido (**Posts**), garantizando la integridad y seguridad de los datos mediante la autenticación por token.

---

## Cumplimiento de Requisitos

- **Creación de 2 modelos como mínimo**: Modelos User y Post creados.
- **1 dato relacionado como mínimo**: Relación de Autoría y Favoritos.
- **Diferentes roles de usuario + Middleware Auth**: Roles user y admin usando Middlewares isAuth y checkRole.
- **Subida de ficheros con Cloudinary + Eliminación**: Funcionalidad de subida de imagen de perfil. La imagen se borra automáticamente de Cloudinary al eliminar la cuenta.
- **Semilla (Seed) para una colección**: El archivo src/seeders/postSeeder.js genera el usuario administrador inicial y datos de prueba.
- **Evitar duplicados y pérdida de datos**: Se usa $addToSet para evitar que se repitan los Posts en Favoritos.
- **CRUD completo de todas las colecciones**: Rutas de Creación, Lectura, Actualización y Eliminación para Usuarios y Posts.

---

## Cómo iniciar el proyecto

### 1. Instalación
Instala todas las dependencias del proyecto:
npm install

### 2. Configuración (.env)
Debe crear un archivo .env en la raíz del proyecto. Este archivo debe contener las siguientes claves, reemplazando los corchetes con las credenciales correspondientes:

PORT=4000
MONGODB_URI=[SU_URI_DE_MONGO_ATLAS]
JWT_SECRET=[UNA_CLAVE_SECRETA_LARGA]
CLOUDINARY_CLOUD_NAME=[SU_CLOUD_NAME]
CLOUDINARY_API_KEY=[SU_API_KEY]
CLOUDINARY_API_SECRET=[SU_API_SECRET]

### 3. Carga de Datos (Seed)
Para crear el usuario Admin y datos de prueba:
node src/seeders/postSeeder.js

### 4. Arrancar el Servidor
npm run dev

---

## Rutas Principales (API)

Todas las rutas comienzan con el prefijo /api.

**Usuarios y Autenticación**

- POST /api/auth/register - Registrarse
- POST /api/auth/login - Entrar (Login)
- PUT /api/users/profile - Actualizar perfil (soporta imagen)
- GET /api/users - Lista todos los usuarios (Solo Admin)
- DELETE /api/users/:id - Elimina cuenta (Dueño/Admin)

**Posts**

- GET /api/posts - Lista todos los posts
- POST /api/posts - Crea un nuevo post
- PUT /api/posts/:id - Edita un post
- DELETE /api/posts/:id - Elimina un post
