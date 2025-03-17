const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB Atlas
mongoose.connect('your-mongodb-atlas-connection-string', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB Atlas', err));

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Verificar si el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
  }

  // Verificar la contraseña
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
  }

  // Crear un token JWT
  const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

  res.json({ message: 'Inicio de sesión exitoso', token });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
