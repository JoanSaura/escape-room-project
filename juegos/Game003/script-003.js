document.addEventListener("DOMContentLoaded", function () {
  const panelDificultad = document.getElementById("selector-dificultad");
  const DificultadFacil = document.getElementById("Principiante");
  const DificultadMedia = document.getElementById("Avanzado");
  const DificultadDificil = document.getElementById("Locura");
  const cronometro = document.getElementById("cronometro");
  const juegoGanado = document.getElementById("juego-ganado");
  const juegoPerdido = document.getElementById("juego-perdido");
  const fondoSelector = document.querySelector(".fondo-selector");
  const VolverHaIntentarlo = document.getElementById("volver-ha-intentarlo");
  const erroresContainer = document.getElementById("contenedor-errores");
  const InterfazJuego = document.getElementById("interfaz-juego");
  const PuntosUser = document.getElementById("puntos-usuario");
  //Capturamos los elementos del DOM
  const usuarioActual = localStorage.getItem("usuarioActual");
  if (usuarioActual) {
    console.log("Usuario cargado:", usuarioActual);
  } else {
    console.log("No hay usuario cargado. Iniciar sesión para jugar.");
  }
  //Variables globales
  let tiempoTranscurrido = 0;
  let intervalo;
  let puntos = 0;
  let dificultadElegida = "";
  let palabraSeleccionada = "";
  let cantidadErrores = 0;

  // Función para mostrar el interfaz de juego
  function mostrarInterfazJuego() {
    InterfazJuego.style.display = "block";
  }

  // Para cerrar el panel de dificultad y borrar el fondo
  function ocultarPanelDificultad() {
    panelDificultad.style.display = "none";
    fondoSelector.remove();
    mostrarInterfazJuego();
  }

  function iniciarCronometro() {
    intervalo = setInterval(function () {
      tiempoTranscurrido++;
      actualizarCronometro();
    }, 1000);
  }

  function detenerCronometro() {
    clearInterval(intervalo);
  }

  function reiniciarCronometro() {
    detenerCronometro();
    tiempoTranscurrido = 0;
    actualizarCronometro();
  }

  // Función para generar números aleatorios en un rango
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarTableroSudoku() {
  const tableroSudoku = document.getElementById("tablero-sudoku");

  // Limpia cualquier contenido existente
  tableroSudoku.innerHTML = "";

  // Tamaño del tablero (en este caso, un Sudoku de 9x9)
  const tamano = 9;

  // Genera las filas y columnas de la cuadrícula
  for (let i = 0; i < tamano; i++) {
    const fila = document.createElement("tr");

    for (let j = 0; j < tamano; j++) {
      const celda = document.createElement("td");

      // Genera un número aleatorio del 1 al 9
      const numeroAleatorio = getRandomInt(1, 9);

      // Determina la probabilidad de mantener el número en la celda según la dificultad
      let probabilidadMantener;

      switch (dificultadElegida) {
        case "facil":
          probabilidadMantener = 0.8; // 80% de probabilidad de mantener el número
          break;
        case "normal":
          probabilidadMantener = 0.5; // 50% de probabilidad de mantener el número
          break;
        case "dificil":
          probabilidadMantener = 0.2; // 20% de probabilidad de mantener el número
          break;
        default:
          probabilidadMantener = 0.8;
      }

      // Determina si se mantiene el número en la celda o se deja vacía
      if (Math.random() < probabilidadMantener) {
        celda.textContent = numeroAleatorio;
      }

      fila.appendChild(celda);
    }

    tableroSudoku.appendChild(fila);
  }
}


  // Actualizar el texto del cronometro
  function actualizarCronometro() {
    const horas = Math.floor(tiempoTranscurrido / 3600);
    const minutos = Math.floor((tiempoTranscurrido % 3600) / 60);
    const segundos = tiempoTranscurrido % 60;
    cronometro.textContent = `${horas < 10 ? "0" + horas : horas}:${
      minutos < 10 ? "0" + minutos : minutos
    }:${segundos < 10 ? "0" + segundos : segundos}`;
  }

  //Recargue la pagina para volver a interntarlo
  VolverHaIntentarlo.addEventListener("click", function () {
    location.reload();
  });

  //Mostrar pantalla de victoria
  function LanzarWin() {
    detenerCronometro();
    InterfazJuego.style.display = "none";
    juegoGanado.style.display = "block";
  }

 //Mostrar pantalla de victoria
 function LanzarWin() {
  detenerCronometro();
  InterfazJuego.style.display = "none";
  menuVictoria.style.display = "block";
  
  // Actualizar el objeto usuario
  if (usuarioActual) {
    const juegoGanado = {
      dificultad: dificultadElegida,
      puntos: puntos,
      superado: true,
      tiempo: tiempoTranscurrido
    };

    // Identificar y actualizar el juego según la dificultad
    switch (dificultadElegida) {
      case "facil":
        usuarioActual.Juego3[0] = juegoGanado;
        break;
      case "normal":
        usuarioActual.Juego3[0] = juegoGanado;
        break;
      case "dificil":
        usuarioActual.Juego3[0] = juegoGanado;
        break;
    }
  }
}
  // Eventos click con generación de cartas y errores según la dificultad
  DificultadFacil.addEventListener("click", function () {
    dificultadElegida = "facil";
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    generarTableroSudoku();


  });

  DificultadMedia.addEventListener("click", function () {
    dificultadElegida = "normal";
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    generarTableroSudoku();

  });

  DificultadDificil.addEventListener("click", function () {
    dificultadElegida = "dificil";
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    generarTableroSudoku();

  });
  localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
});
