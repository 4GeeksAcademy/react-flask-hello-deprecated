<h1 align="center">🔐 Proyecto de Autenticación con Página Privada</h1>

<p align="center">
  Un proyecto simple de autenticación donde los usuarios pueden registrarse, iniciar sesión y acceder a una página privada protegida.
</p>

---

### 🚀 Tecnologías utilizadas
- **Node.js**
- **Express.js**
- **Passport.js** (para la autenticación)
- **JWT (JSON Web Token)** (para la gestión de sesiones)
- **bcryptjs** (para el hashing de contraseñas)
- **EJS** (para la renderización de vistas)
- **MongoDB con Mongoose** (para la base de datos)

---

### 📌 Instalación y Configuración
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/nombre-del-repo.git
   cd nombre-del-repo
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Configurar las variables de entorno:
   - Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
     ```env
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/autenticacion
     JWT_SECRET=tu_secreto_super_seguro
     ```
4. Iniciar la base de datos (si usas MongoDB localmente):
   ```sh
   mongod
   ```
5. Ejecutar la aplicación:
   ```sh
   npm start
   ```
   La aplicación estará disponible en `http://localhost:3000`

---

### 🔑 Rutas Principales
- **`GET /`** → Página de inicio
- **`GET /login`** → Formulario de inicio de sesión
- **`POST /login`** → Procesa el inicio de sesión y genera un JWT
- **`GET /register`** → Formulario de registro
- **`POST /register`** → Crea un nuevo usuario
- **`GET /private`** → Página privada (solo accesible con sesión iniciada)
- **`GET /logout`** → Cierra sesión del usuario

---

### 🔐 Autenticación con JWT
Cada usuario autenticado recibirá un **token JWT**, que deberá enviarse en las peticiones a rutas protegidas mediante el encabezado:
```sh
Authorization: Bearer <token>
```

---

### 📂 Estructura del Proyecto
```
.
├── config
│   ├── passport.js       # Configuración de Passport.js
│   ├── database.js       # Conexión a MongoDB
├── models
│   ├── User.js           # Modelo de usuario
├── routes
│   ├── auth.js           # Rutas de autenticación
│   ├── private.js        # Ruta protegida
├── views                 # Plantillas EJS
├── public                # Archivos estáticos
├── .env                  # Variables de entorno
├── server.js             # Archivo principal
├── package.json          # Dependencias
```

---

### 🔮 Mejoras Futuras
- Implementar autenticación con Google/Facebook.
- Mejorar la interfaz con Bootstrap o TailwindCSS.
- Agregar confirmación de correo electrónico.

---

### 📞 Contacto
💬 Si tienes dudas o sugerencias, no dudes en contactarme. 🚀


