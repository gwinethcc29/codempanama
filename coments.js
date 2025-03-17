import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore();

// Funciones para cursos
function agregarCurso(nombre, descripcion) {
  db.collection('cursos').add({
    nombre: nombre,
    descripcion: descripcion,
    fecha: new Date(),
  })
  .then(() => {
    console.log("Curso agregado correctamente");
  })
  .catch((error) => {
    console.error("Error al agregar curso: ", error);
  });
}

function obtenerCursos() {
  db.collection('cursos').get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  })
  .catch((error) => {
    console.error("Error al obtener cursos: ", error);
  });
}

// Funciones para comentarios
function agregarComentario(cursoId, comentario, usuario) {
  db.collection('comentarios').add({
    cursoId: cursoId,
    comentario: comentario,
    usuario: usuario,
    fecha: new Date(),
  })
  .then(() => {
    console.log("Comentario guardado correctamente");
  })
  .catch((error) => {
    console.error("Error al guardar el comentario: ", error);
  });
}

function obtenerComentarios(cursoId) {
  db.collection('comentarios').where("cursoId", "==", cursoId).get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  })
  .catch((error) => {
    console.error("Error al obtener los comentarios: ", error);
  });
}

// Formulario de comentarios
document.getElementById("comentarioForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const comentario = document.getElementById("comentario").value;
  const usuario = "NombreDelUsuario"; // Aquí deberías obtener el nombre del usuario logueado
  const cursoId = "idDelCurso"; // Debes obtener el id del curso actual

  agregarComentario(cursoId, comentario, usuario);
});
