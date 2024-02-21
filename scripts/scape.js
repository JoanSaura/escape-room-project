document.addEventListener("DOMContentLoaded", function () {
    //Capturamos los elementos del DOM
    const subirNumerosBotones = document.querySelectorAll(".subir-numero");
    const bajarNumerosBotones = document.querySelectorAll(".bajar-numero");
    const numerosElementos = document.querySelectorAll(".numero");
    const spanContrasena = document.getElementById("contraseña");
    const comprobacionBtn = document.getElementById("comprobacion");
    const pasarNota = document.getElementById('pasarNota');
    const divNota = document.getElementById('nota');
    const divContra = document.getElementById('contra');
    //Generar aletoraiemnte la contraseña
    function generarContrasena() {
        const contrasena = Array.from({ length: 3 }, () => Math.floor(Math.random() * 9) + 1);
        // Actualiza el elemento <span> con la contraseña generada
        spanContrasena.textContent = contrasena.join("");
        console.log("La contaseña es : ",contrasena.join(""));
    }
    //Para que funcione los clicks al subir los nombres
    function subirNumeros(index) {
        let numeroActual = parseInt(numerosElementos[index].textContent);
        if (numeroActual < 9) {
            numeroActual++;
        }
        numerosElementos[index].textContent = numeroActual;
    }
     //Para que funcione los clicks al bajar los nombres
    function bajarNumeros(index) {
        let numeroActual = parseInt(numerosElementos[index].textContent);
        if (numeroActual > 0) {
            numeroActual--;
        }
        numerosElementos[index].textContent = numeroActual;
    }
    

    //Generar contraseña
    generarContrasena();

    pasarNota.addEventListener('click',function() {
        divNota.style.display = 'none';
        divContra.style.display = 'flex'
    })
    comprobacionBtn.addEventListener("click", function () {

    });

    //Para que los numeros suban
    subirNumerosBotones.forEach((boton, index) => {
        boton.addEventListener("click", function () {
            subirNumeros(index);
        });
    });
    //Para que los numeros bajen
    bajarNumerosBotones.forEach((boton, index) => {
        boton.addEventListener("click", function () {
            bajarNumeros(index);
        });
    });
});
