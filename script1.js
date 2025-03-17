document.addEventListener("DOMContentLoaded", function () {
    const mascota = document.getElementById("mascota");
    const mensaje = document.getElementById("mensaje");

    // Datos que se mostrarán (incluyendo el mensaje de bienvenida como uno más)
    const datos = [
        "Soy Codito, tu compañero en CODEM. Mi misión es hacer que el aprendizaje sea más entretenido, ¡y te voy a sorprender con datos curiosos en cada paso del camino!",
        "La democracia significa 'poder del pueblo' en griego.",
        "En Suiza, los ciudadanos pueden votar hasta cuatro veces al año sobre diferentes temas.",
        "El voto femenino se logró en Panamá en 1946.",
        "Algunas democracias permiten el voto a partir de los 16 años, como en Argentina y Brasil.",
        "El sistema electoral en los Estados Unidos es el del voto indirecto para elegir al presidente.",
        "En algunas democracias, el voto es obligatorio, como en Australia.",
        "La Asamblea General de la ONU tiene 193 miembros, todos los países soberanos del mundo.",
        "En Finlandia, la educación cívica es una parte fundamental del currículo escolar desde temprana edad.",
        "En Costa Rica, las elecciones se realizan en febrero y los resultados son generalmente decididos por una sola vuelta electoral.",
        "El primer país en adoptar el sufragio universal fue Nueva Zelanda, en 1893.",
        "El concepto de 'democracia participativa' implica la participación activa de los ciudadanos más allá del voto.",
        "La democracia representativa permite a los ciudadanos elegir a sus representantes, pero también a veces pueden revocar su mandato.",
        "La libertad de expresión es uno de los pilares fundamentales de cualquier democracia sana.",
        "En muchos países, la democracia se define como un gobierno basado en el respeto a los derechos humanos y la justicia social."
    ];

    // Muestra un dato aleatorio de los datos
    const datoAleatorio = datos[Math.floor(Math.random() * datos.length)];
    mensaje.textContent = datoAleatorio;
    mensaje.classList.add("visible");

    // Después de 10 segundos, el mensaje se oculta
    setTimeout(() => {
        mensaje.classList.remove("visible");
    }, 10000);

    // Al hacer clic, cambia el dato
    mascota.addEventListener("click", () => {
        const datoAleatorio = datos[Math.floor(Math.random() * datos.length)];
        mensaje.textContent = datoAleatorio;
        mensaje.classList.add("visible");

        // Desaparece después de 10 segundos
        setTimeout(() => {
            mensaje.classList.remove("visible");
        }, 10000); // Desaparece después de 10 segundos
    });
});


