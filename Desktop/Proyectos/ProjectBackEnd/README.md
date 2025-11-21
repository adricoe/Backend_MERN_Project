### Proyecto Backend (Gestion de Usuarios y Posts)
Este es el backend desarrollado para mi proyecto, utilizando la arquitectura MERN stack (MongoDB, Express, Node.js).
El objetivo principal es gestionar un sistema para usuarios y contenido (posts), garantizando la integridad y seguridad de los datos
mediante la autenticación por token.

----------------------------------------------------------------------------------------------
### Cumplimiento de Requisitos

[x] Creación de al menos 2 modelos: Se han creado los modelos Usuario y Post.
[x] Al menos 1 punto de datos relacionado: Relación 1: Una post pertenece a un usuario (autor). Relación 2: Un usuario tiene muchos posts en Favoritos.
[x] Diferentes roles de usuario + middleware de autenticación: Roles implementados: usuario y administrador. Middlewares: isAuth (verifica el token) y checkRole (verifica si el usuario es administrador).
[x] Carga de archivos con Cloudinary + eliminación: Las imágenes se pueden cargar al actualizar el perfil (PUT /profile). Extra: Si se elimina un usuario, su post se elimina automáticamente de Cloudinary.
[x] Semilla para una colección: se ha creado el archivo src/seeders/postSeeder.js. Genera un usuario administrador y posts de prueba.
[x] Evitar duplicados y pérdida de datos: uso de $addToSet en Favoritos para evitar que el mismo post se añada dos veces. Validaciones en el esquema para garantizar la integridad de los datos.
[x] CRUD completo para todas las colecciones: rutas para leer, crear, editar y eliminar tanto para usuarios como para posts.

----------------------------------------------------------------------------------------------

## Cómo iniciar el proyecto

# 1. Instalación
Instala todas las dependencias del proyecto.
# Bash: npm install


# 2. Configuración (.env)
Crea un archivo .env en el directorio raíz con tus claves:

PlaintextPORT=4000
MONGODB_URI=[TU_MONGO_URI]
JWT_SECRET=[TU_CLAVE_SECRETA_COMPLEJA]
CLOUDINARY_CLOUD_NAME=[TU_NOMBRE_DE_LA_NUBE]
CLOUDINARY_API_KEY=[TU_CLAVE_DE_API]
CLOUDINARY_API_SECRET=[TU_SECRETO_DE_API]


# 3. Carga de datos (seed)
Para crear el usuario administrador y los datos de prueba: 
## Bash: node src/seeders/postSeeder.js

# 4. Iniciar el servidor 
# Bash: npm run dev
----------------------------------------------------------------------------------------------

### Rutas Principales (API)

# Usuarios

POST /api/auth/register - Registrarse
POST /api/auth/login - Entrar (Login)
PUT /api/users/profile - Subir foto / Editar perfil
GET /api/users - Ver todos (Solo Admin)
DELETE /api/users/:id - Borrar usuario

# Posts

GET /api/posts - Ver posts
POST /api/posts - Crear post
PUT /api/posts/:id - Editar post
DELETE /api/posts/:id - Borrar post