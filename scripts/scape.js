document.addEventListener("DOMContentLoaded", function () {
  const subirNumerosBotones = document.querySelectorAll(".subir-numero");
  const bajarNumerosBotones = document.querySelectorAll(".bajar-numero");
  const numerosElementos = document.querySelectorAll(".numero");
  const body = document.querySelector("body");
  const spanContrasena = document.getElementById("contraseña");
  const comprobacionBtn = document.getElementById("comprobacion");
  const pasarNota = document.getElementById("pasarNota");
  const divNota = document.getElementById("nota");
  const divContra = document.getElementById("contra");
  const divFin = document.getElementById("fin");
  //Declaramos los sonidos
  let InteractCasilla = new Audio();
  InteractCasilla.src = '/src/sfx/Casilla.mp3';
  let QuitarNota = new Audio();
  QuitarNota.src = '/src/sfx/Correcto.mp3';
  //Declaramos la contraseña
  const contrasena = Array.from(
    { length: 3 },
    () => Math.floor(Math.random() * 9) + 1
  );
  //Para que aplique la contraseña dentro del HTML
  function generarContrasena() {
    spanContrasena.textContent = contrasena.join("");
    console.log("La contraseña es: ", contrasena.join(""));
  }
  //Para que cuando se clicka en subir numero se aumente el valor
  function subirNumeros(index) {
    let numeroActual = parseInt(numerosElementos[index].textContent);
    if (numeroActual < 9) {
      numeroActual++;
    }
    numerosElementos[index].textContent = numeroActual;
  }
  //Para que cuando se clicka en bajar numero se disminuya el valor
  function bajarNumeros(index) {
    let numeroActual = parseInt(numerosElementos[index].textContent);
    if (numeroActual > 0) {
      numeroActual--;
    }
    numerosElementos[index].textContent = numeroActual;
  }
  //Generamos/Mostramos la contraseña
  generarContrasena();
  //Que se quite la nota del final y se puede insertar la contraseña
  pasarNota.addEventListener("click", function () {
    QuitarNota.play();
    divNota.style.display = "none";
    divContra.style.display = "flex";
  });
  //Evento que comprueba si los numeros insertados en las celdas son iguales que la contraseña
  comprobacionBtn.addEventListener("click", function () {
    const numerosIngresados = Array.from(numerosElementos, (el) => parseInt(el.textContent));

    if (JSON.stringify(numerosIngresados) === JSON.stringify(contrasena)) {
      divContra.style.display = "none";

      // Espera unos segundos antes de agregar la clase sueño
      setTimeout(function () {
        // Transición a fondo sueño
        body.classList.add("sueño");

        // Mostrar el div final después de unos segundos
        setTimeout(function () {
          divFin.classList.add("mostrar");
        }, 1000);
      }, 1000);
    }
  });
  
  //Para poder subir los numeros
  subirNumerosBotones.forEach((boton, index) => {
    boton.addEventListener("click", function () {
      InteractCasilla.play();
      subirNumeros(index);
    });
  });
  //Para poder bajar los numeros
  bajarNumerosBotones.forEach((boton, index) => {
    boton.addEventListener("click", function () {
      InteractCasilla.play();
      bajarNumeros(index);
    });
  });
});
