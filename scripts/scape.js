document.addEventListener("DOMContentLoaded", function () {
    const contrasenaElementos = document.querySelectorAll(".numero");
    const subirNumeros = document.querySelectorAll(".subir-numero");
    const bajarNumeros = document.querySelectorAll(".bajar-numero");
    const spanContrasena = document.getElementById("contraseña");
    const comprobacionBtn = document.getElementById("comprobacion");



    function generarContrasena() {
        const contrasena = Array.from({ length: 3 }, () => Math.floor(Math.random() * 9) + 1);
        // Actualiza el elemento <span> con la contraseña generada
        spanContrasena.textContent = contrasena.join("");
    }

    generarContrasena();
    //Comprobacion de que la contraseña es correcta
    comprobacionBtn.addEventListener("click", function() {

    });
});
