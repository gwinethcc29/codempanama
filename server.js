// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const app = express();  // Esta es la instancia de tu servidor Express
app.use(cors());  // Activar CORS para todas las rutas
app.use(bodyParser.json());  // Para poder procesar JSON en las solicitudes

// URI de conexión a MongoDB
const uri = process.env.MONGO_URI;
console.log("URI de MongoDB:", uri);

// Conectar a MongoDB Atlas usando la variable de entorno (el valor se obtiene del archivo .env)
mongoose.connect(uri)
  .then(() => {
    console.log("Conexión exitosa a MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB Atlas:", error);
  });

// Esquema de Usuario
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// Ruta para registrar usuario
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Validación
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "El correo no es válido" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear y guardar el nuevo usuario
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  res.json({ message: "Usuario registrado exitosamente" });
});

// Ruta para iniciar sesión
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ message: "Credenciales incorrectas" });
  }

  // Generar el token JWT
  const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });

  res.json({ message: "Inicio de sesión exitoso", token });
});

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(403).json({ message: "Acceso denegado" });
  }

  jwt.verify(token, 'secreto', (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token no válido" });
    }
    req.user = user;
    next();
  });
};

// Ruta protegida
app.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Perfil del usuario", user: req.user });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
