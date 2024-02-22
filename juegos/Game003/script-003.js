document.addEventListener("DOMContentLoaded", function () {
  //Capturamos elementos del HTML
  const panelDificultad = document.getElementById("selector-dificultad");
  const DificultadFacil = document.getElementById("Principiante");
  const DificultadMedia = document.getElementById("Avanzado");
  const DificultadDificil = document.getElementById("Locura");
  const nombreUser = document.getElementById("user");
  const cronometro = document.getElementById("cronometro");
  const juegoGanado = document.getElementById("juego-ganado");
  const juegoPerdido = document.getElementById("juego-perdido");
  const fondoSelector = document.querySelector(".fondo-selector");
  const VolverHaIntentarlo = document.querySelectorAll("#volver-ha-intentarlo");
  const InterfazJuego = document.getElementById("interfaz-juego");
  const PuntosUser = document.getElementById("puntos-usuario");
  const tableroSudoku = document.getElementById("tablero-sudoku");
  const MinutosRestantes = document.getElementById("minutos-restantes");
  // Cargamos los usuarios
  const usuarioActual = obtenerUsuarioActual();
  // Mostrar nombre del usuario o Anonimo si no hay usuario actual
  if (usuarioActual) {
    mostrarNombreUsuario(usuarioActual);
    console.log(usuarioActual);
  }
  //Declaramos los sonidos
  let casillaSelecionada = new Audio();
  casillaSelecionada.src = '/src/sfx/Casilla.mp3';
  let casillaCorrecta = new Audio();
  casillaCorrecta.src = '/src/sfx/Correcto.mp3';
  let WinSound = new Audio();
  WinSound.src = '/src/sfx/Victoria.mp3';
  //Variables globales
  let tiempoTranscurrido = 0;
  let intervalo;
  let puntos = 0;
  let dificultadElegida = "";

  // Función para mostrar el nombre del usuario
  function mostrarNombreUsuario(usuario) {
    nombreUser.textContent = usuario.nombre;
  }

  // Obtener usuario actual del almacenamiento local
  function obtenerUsuarioActual() {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    return usuarioActual || "Anonimo";
  }

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
    // Limpia cualquier contenido existente
    tableroSudoku.innerHTML = "";
    const tamano = 9;
    const tablero = Array.from({ length: tamano }, () => Array(tamano).fill(0));
    llenarTablero(tablero);
    const rutaImagenes = "img/";
    for (let i = 0; i < tamano; i++) {
      const fila = document.createElement("tr");

      for (let j = 0; j < tamano; j++) {
        const celda = document.createElement("td");
        const img = document.createElement("img");
        const numero = tablero[i][j];
        img.src = `${rutaImagenes}${numero}.png`;
        img.classList.add("imagen-sudoku");

        // Añade la clase .numero-vacio a ciertas celdas según la dificultad
        if (dificultadElegida === "facil" && Math.random() < 0.5) {
          celda.classList.add("numero-vacio");
          img.classList.add("oculto-visualmente");
        } else if (dificultadElegida === "normal" && Math.random() < 0.7) {
          celda.classList.add("numero-vacio");
          img.classList.add("oculto-visualmente");
        } else if (dificultadElegida === "dificil" && Math.random() < 0.9) {
          celda.classList.add("numero-vacio");
          img.classList.add("oculto-visualmente");
        }

        // Añade un evento de clic a la celda
        celda.addEventListener("click", function () {
          if (celda.classList.contains("numero-vacio")) {
            casillaSelecionada.play();
            manejarEntradaUsuario(celda);
          }
        });

        celda.appendChild(img);
        fila.appendChild(celda);
      }
      tableroSudoku.appendChild(fila);
    }
  }

  // Función para llenar el tablero de manera válida
  function llenarTablero(tablero) {
    const tamano = tablero.length;

    for (let i = 0; i < tamano; i++) {
      for (let j = 0; j < tamano; j++) {
        // Intenta colocar un número válido en la celda
        let intentos = 0;
        do {
          tablero[i][j] = getRandomInt(1, tamano);
          intentos++;
        } while (!esNumeroValido(tablero, i, j) && intentos < 10);
        if (intentos === 10) {
          tablero[i][j] = 0;
          j -= 2;
        }
      }
    }
  }

  // Función para verificar si un número es válido en la posición dada
  function esNumeroValido(tablero, fila, columna) {
    const numero = tablero[fila][columna];

    // Verifica la fila y columna
    for (let i = 0; i < tablero.length; i++) {
      if (
        (i !== fila && tablero[i][columna] === numero) ||
        (i !== columna && tablero[fila][i] === numero)
      ) {
        return false;
      }
    }

    // Verifica el cuadrante 3x3
    const cuadranteFilaInicio = Math.floor(fila / 3) * 3;
    const cuadranteColumnaInicio = Math.floor(columna / 3) * 3;

    for (let i = cuadranteFilaInicio; i < cuadranteFilaInicio + 3; i++) {
      for (
        let j = cuadranteColumnaInicio;
        j < cuadranteColumnaInicio + 3;
        j++
      ) {
        if (!(i === fila && j === columna) && tablero[i][j] === numero) {
          return false;
        }
      }
    }

    return true;
  }

  // Función para manejar la entrada del usuario
  function manejarEntradaUsuario(celda) {
    const numeroIngresado = prompt("Ingresa un número del 1 al 9:");
    if (numeroIngresado && /^[1-9]$/.test(numeroIngresado)) {
      const img = celda.querySelector("img");
      if (
        parseInt(numeroIngresado) ===
        parseInt(img.src.split("/").pop().split(".")[0])
      ) {
        img.classList.remove("oculto-visualmente");
        celda.classList.remove("numero-vacio");
        casillaCorrecta.play();
        puntos += 5;
        PuntosUser.innerHTML = `${puntos}`;
        const celdasOcultas = document.querySelectorAll(".numero-vacio");
        if (celdasOcultas.length === 0) {
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

    // Verificar límite de tiempo según la dificultad
    switch (dificultadElegida) {
      case "facil":
        MinutosRestantes.innerText = "Tienes 5 minutos";
        if (minutos >= 5) {
          LanzarGameOver();
        }
        break;
      case "normal":
        MinutosRestantes.innerText = "Tienes 6 minutos";
        if (minutos >= 6) {
          LanzarGameOver();
        }
        break;
      case "dificil":
        MinutosRestantes.innerText = "Tienes 7 minutos";
        if (minutos >= 7) {
          LanzarGameOver();
        }
        break;
    }
  }

  //Recargue la pagina para volver a interntarlo
  VolverHaIntentarlo.forEach((button) => {
    button.addEventListener("click", function () {
      location.reload();
    });
  });

  //Mostrar pantalla de derrota
  function LanzarGameOver() {
    detenerCronometro();
    InterfazJuego.style.display = "none";
    juegoPerdido.style.display = "flex";
  }

  //Mostrar pantalla de victoria
  function LanzarWin() {
    WinSound.play();
    detenerCronometro();
    InterfazJuego.style.display = "none";
    juegoGanado.style.display = "flex";

    // Actualizar el estado del juego en el usuario actual
    if (usuarioActual) {
      const juegoGanado = {
        dificultad: dificultadElegida,
        puntos: puntos,
        superado: true,
        tiempo: tiempoTranscurrido,
      };
      actualizarJuego(usuarioActual, dificultadElegida, juegoGanado);
      localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
    }
    const JuegosSuperados =
    usuarioActual.juegos["Juego1"].superado ||
    usuarioActual.juegos["Juego2"].superado ||
    usuarioActual.juegos["Juego3"].superado;
  
  if (JuegosSuperados === true) {
    window.location.href = "/htmls/scape.html";
  }
  }
  //Actualiza la informacion de los datos del juego que tiene el propio usuario
  function actualizarJuego(usuario, dificultad, nuevoEstado) {
    if (usuario && usuario.juegos) {
      // Verificar si el juego para la dificultad ya existe
      if (usuario.juegos[`Juego3`]) {
        const juego = usuario.juegos[`Juego3`];
        // Si se encuentra el juego, actualizar sus datos directamente
        juego.dificultad = dificultad;
        juego.tiempo = nuevoEstado.tiempo;
        juego.puntos = nuevoEstado.puntos;
        juego.superado = nuevoEstado.superado;
      } else {
        // Si no se encuentra el juego, crear un nuevo objeto de juego y agregarlo al usuario
        usuario.juegos[`Juego3`] = {
          dificultad: dificultad,
          tiempo: nuevoEstado.tiempo,
          puntos: nuevoEstado.puntos,
          superado: nuevoEstado.superado,
        };
      }
      console.log("Usuario después de la actualización:", usuario);
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
});
