document.addEventListener("DOMContentLoaded", function () {
  const panelDificultad = document.getElementById("selector-dificultad");
  const DificultadFacil = document.getElementById("Principiante");
  const DificultadMedia = document.getElementById("Avanzado");
  const DificultadDificil = document.getElementById("Locura");
  const cronometro = document.getElementById("cronometro");
  const juegoGanado = document.getElementById("juego-ganado");
  const juegoPerdido = document.getElementById("juego-perdido");
  const fondoSelector = document.querySelector(".fondo-selector");
  const VolverHaIntentarlo = document.querySelectorAll(".volver-ha-intentarlo");
  const erroresContainer = document.getElementById("contenedor-errores");
  const InterfazJuego = document.getElementById("interfaz-juego");
  const PuntosUser = document.getElementById("puntos-usuario");
  const menuVictoria = document.getElementById("menu-victoria");
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
        const span = document.createElement("span");

        // Genera un número aleatorio del 1 al 9
        const numeroAleatorio = getRandomInt(1, 9);

        // Determina la probabilidad de aplicar la clase "numero-vacio" a la celda según la dificultad
        let probabilidadNumeroVacio;

        switch (dificultadElegida) {
          case "facil":
            probabilidadNumeroVacio = 0.3; // Ajusta según desees
            break;
          case "normal":
            probabilidadNumeroVacio = 0.2; // Ajusta según desees
            break;
          case "dificil":
            probabilidadNumeroVacio = 0.1; // Ajusta según desees
            break;
          default:
            probabilidadNumeroVacio = 0.3;
        }

        // Determina si se aplica la clase "numero-vacio" a la celda
        if (Math.random() < probabilidadNumeroVacio) {
          // Si se aplica la clase "numero-vacio", muestra el número y aplica la clase
          span.textContent = numeroAleatorio;
          celda.classList.add("numero-vacio");
          span.classList.add("oculto-visualmente");
        } else {
          // Si no se aplica la clase "numero-vacio", muestra el número sin la clase
          span.textContent = numeroAleatorio;
        }

        // Añade el span a la celda
        celda.appendChild(span);

        // Añade la celda a la fila
        fila.appendChild(celda);
      }

      // Añade la fila al tablero
      tableroSudoku.appendChild(fila);
    }

    // Itera sobre las filas y columnas para agregar eventos de escucha
    for (let i = 0; i < tamano; i++) {
      for (let j = 0; j < tamano; j++) {
        const celda = tableroSudoku.rows[i].cells[j];

        // Verifica si la celda tiene la clase "numero-vacio"
        if (celda.classList.contains("numero-vacio")) {
          // Agrega un evento de escucha para el evento "click"
          celda.addEventListener("click", function () {
            // Llama a la función para manejar la entrada del usuario
            manejarEntradaUsuario(celda);
          });
        }
      }
    }
  }

// Función para manejar la entrada del usuario
function manejarEntradaUsuario(celda) {
  // Pregunta al usuario por el número a insertar
  const numeroIngresado = prompt("Ingresa un número del 1 al 9:");

  // Verifica si el número ingresado es válido
  if (numeroIngresado && /^[1-9]$/.test(numeroIngresado)) {
    const span = celda.querySelector("span");

    // Verifica si el número ingresado coincide con el número oculto
    if (span.textContent === numeroIngresado) {
      // Actualiza el contenido de la celda con el número ingresado
      span.textContent = numeroIngresado;
      celda.classList.add("cassila-acertada");
      celda.classList.remove("numero-vacio");
      span.classList.remove("oculto-visualmente");

      // Verifica si quedan celdas ocultas
      const celdasOcultas = document.querySelectorAll(".numero-vacio");
      if (celdasOcultas.length === 0) {
        // Si no quedan celdas ocultas, lanza la victoria
        LanzarWin();
      }
    }
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
    menuVictoria.style.display = "block";

    // Actualizar el objeto usuario
    if (usuarioActual) {
      const juegoGanado = {
        dificultad: dificultadElegida,
        puntos: puntos,
        superado: true,
        tiempo: tiempoTranscurrido,
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
