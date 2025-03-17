
// Inicializar Firebase (asegurándote de tener tu configuración de Firebase correcta)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCaT5kxDZStfoGPJQzs4UBK9Se6gPZhdq0",
  authDomain: "codempanama-f20a0.firebaseapp.com",
  projectId: "codempanama-f20a0",
  storageBucket: "codempanama-f20a0.firebasestorage.app",
  messagingSenderId: "145115637688",
  appId: "1:145115637688:web:b72eca1441ca72f8b4d14d",
  measurementId: "G-LPV3ZQKXCF"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Recuperar el nombre de usuario (supongamos que tienes el nombre del usuario al iniciar sesión)
const username = "NombreDeUsuario"; // Deberías reemplazarlo con el nombre real del usuario.

// Agregar comentario
document.getElementById("comentarioForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  const comentario = document.getElementById("comentario").value;

  if (comentario.trim() !== "") {
    try {
      // Guardar el comentario en Firebase
      const docRef = await addDoc(collection(db, "comentarios"), {
        nombre: username, // El nombre del usuario que hizo el comentario
        comentario: comentario,
        fecha: Timestamp.fromDate(new Date()) // Fecha en que se hizo el comentario
      });
      console.log("Comentario guardado con ID: ", docRef.id);
      
      // Limpiar el campo de comentario
      document.getElementById("comentario").value = "";

    } catch (e) {
      console.error("Error al agregar comentario: ", e);
    }
  } else {
    alert("Por favor ingresa un comentario.");
  }
});























