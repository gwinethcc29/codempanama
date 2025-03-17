document.addEventListener("DOMContentLoaded", function () {
    const mascota = document.getElementById("mascota");
    const mensaje = document.getElementById("mensaje");

    // Aquí puedes colocar los datos específicos de Salomón Natera en el arreglo
    const datos = [
        "¡No te pierdas un solo podcast de The Wonder Podcast!",
        "Salomón Natera es uno de nuestros diez integrantes de CODEM.",
        "¡Aprende con Salomón!"

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
