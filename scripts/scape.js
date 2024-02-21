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
  const contrasena = Array.from(
    { length: 3 },
    () => Math.floor(Math.random() * 9) + 1
  );

  function generarContrasena() {
    spanContrasena.textContent = contrasena.join("");
    console.log("La contraseña es: ", contrasena.join(""));
  }

  function subirNumeros(index) {
    let numeroActual = parseInt(numerosElementos[index].textContent);
    if (numeroActual < 9) {
      numeroActual++;
    }
    numerosElementos[index].textContent = numeroActual;
  }

  function bajarNumeros(index) {
    let numeroActual = parseInt(numerosElementos[index].textContent);
    if (numeroActual > 0) {
      numeroActual--;
    }
    numerosElementos[index].textContent = numeroActual;
  }

  generarContrasena();

  pasarNota.addEventListener("click", function () {
    divNota.style.display = "none";
    divContra.style.display = "flex";
  });

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
  

  subirNumerosBotones.forEach((boton, index) => {
    boton.addEventListener("click", function () {
      subirNumeros(index);
    });
  });

  bajarNumerosBotones.forEach((boton, index) => {
    boton.addEventListener("click", function () {
      bajarNumeros(index);
    });
  });
});
