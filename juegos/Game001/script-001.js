document.addEventListener("DOMContentLoaded", function () {
  //Capturamos los elementos del HTML
  const DificultadFacil = document.getElementById("Principiante");
  const DificultadMedia = document.getElementById("Avanzado");
  const DificultadDificil = document.getElementById("Locura");
  const cronometro = document.getElementById("cronometro");
  const panelDificultad = document.getElementById("selector-dificultad");
  const InterfazJuego = document.getElementById("interfaz-juego");
  const nombreUser = document.getElementById("user");
  const PuntosUser = document.getElementById("puntos-usuario");
  const fondoSelector = document.querySelector(".fondo-selector");
  const tablero = document.getElementById("tablero");
  const erroresContainer = document.getElementById("errores");
  const menuGameOver = document.getElementById("juego-perdido");
  const menuVictoria = document.getElementById("juego-ganado");
  const GuardarYSalir = document.getElementById("guardar-salir");
  const VolverHaIntentarlo = document.getElementById("volver-ha-intentarlo");
  //Variables para el cronometro
  let tiempoTranscurrido = 0;
  let intervalo;
  let dificultadElegida = "";
  let puntos = 0;
  //Capturamos los elementos del DOM
  const usuarioActual = localStorage.getItem("usuarioActual");
  if (usuarioActual) {
    console.log("Usuario cargado:", usuarioActual);
  } else {
    console.log("No hay usuario cargado. Iniciar sesión para jugar.");
  }
  //Para implementar la logica del juego
  let cartasSeleccionadas = [];
  let cantidadErrores = 0;

  // Función para mostrar el interfaz de juego
  function mostrarInterfazJuego() {
    InterfazJuego.style.display = "block";
  }

  //Para cerrar el panel de dificultad y borrar el fondo
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
  //Actualizar el texto del cronometro
  function actualizarCronometro() {
    const horas = Math.floor(tiempoTranscurrido / 3600);
    const minutos = Math.floor((tiempoTranscurrido % 3600) / 60);
    const segundos = tiempoTranscurrido % 60;
    cronometro.textContent = `${horas < 10 ? "0" + horas : horas}:${
      minutos < 10 ? "0" + minutos : minutos
    }:${segundos < 10 ? "0" + segundos : segundos}`;
  }
  // Array de nombres de las imágenes
  const nombresImagenes = [
    "El Ahorcado.png",
    "El Bufon.png",
    "El Demonio.png",
    "El Hermitaño.png",
    "El Sol.png",
    "La gran sacerdotica.png",
    "La Luna.png",
    "La rueda de la fortuna.png",
    "La Torre.png",
    "Muerte.png",
  ];

  // Función para obtener una lista de pares de imágenes aleatorias
  function generarParesImagenes(numPares) {
    const imagenes = nombresImagenes.slice(0, numPares);
    return [...imagenes, ...imagenes].sort(() => Math.random() - 0.5);
  }

  // Función para agregar eventos de clic a las cartas y revelar las imágenes
  function agregarEventosCartas() {
    const cartas = document.querySelectorAll(".carta");
    cartas.forEach((carta) => {
      carta.addEventListener("click", function () {
        // Verificar si la carta ya ha sido acertada
        if (
          !this.classList.contains("acertada") &&
          cartasSeleccionadas.length < 2
        ) {
          cartasSeleccionadas.push(this);
          this.style.backgroundImage = `url('img/${this.dataset.imagen}')`;

          if (cartasSeleccionadas.length === 2) {
            setTimeout(verificarCartasSeleccionadas, 1000);
          }
        }
      });

      // Agregar evento para ocultar la imagen al hacer clic fuera de la carta
      carta.addEventListener("mouseleave", function () {
        if (
          this.style.backgroundImage.includes("Reverso.png") &&
          !this.classList.contains("acertada")
        ) {
          this.style.backgroundImage = `url('img/Reverso.png')`;
        }
      });
    });
  }

  function verificarCartasSeleccionadas() {
    const [carta1, carta2] = cartasSeleccionadas;

    if (carta1.dataset.imagen == carta2.dataset.imagen) {
      // Si las cartas son iguales, agregar la clase 'acertada'
      cartasSeleccionadas.forEach((carta) => {
        carta.classList.add("acertada");
        puntos = puntos + 10;
        PuntosUser.innerHTML = `${puntos}`;
      });
    } else {
      // Si las cartas no son iguales, aumentar la cantidad de errores y agregar la clase 'erroneo'
      cantidadErrores++;
      erroresContainer.children[cantidadErrores - 1].classList.add("errado");
    }
    //Condicionales para mostrar el menu de victoria
    if ((dificultadElegida == "facil" && puntos == 100) || 
    (dificultadElegida == "normal" && puntos == 160) ||
    (dificultadElegida == "dificil" && puntos == 200)) {
  LanzarWin();
}

    //Condicionales para mostrar el menu de derrota
    if ((dificultadElegida == "facil" && cantidadErrores == 5) || 
    (dificultadElegida == "normal" && cantidadErrores == 4) ||
    (dificultadElegida == "dificil" && cantidadErrores == 3)) {
  LanzarGameOver();
}


    // Ocultar las imágenes de las cartas después de verificar
    cartasSeleccionadas.forEach((carta) => {
      carta.style.backgroundImage = `url('img/Reverso.png')`;
    });

    // Limpiar el array de cartas seleccionadas
    cartasSeleccionadas = [];
  }

  // Función para generar cartas y errores según la dificultad
  function generarCartasYErrores(numCartas, numErrores) {
    // Limpiar contenido actual
    tablero.innerHTML = "";
    // Generar pares de imágenes aleatorias
    const paresImagenes = generarParesImagenes(numCartas / 2);

    // Generar cartas con imágenes y reverso
    for (let i = 0; i < numCartas; i++) {
      const carta = document.createElement("div");
      carta.className = "carta";
      carta.dataset.imagen =
        i < paresImagenes.length ? paresImagenes[i] : "Reverso.png";
      carta.style.backgroundImage = `url('img/Reverso.png')`;
      tablero.appendChild(carta);
    }

    // Generar errores
    for (let i = 0; i < numErrores; i++) {
      const error = document.createElement("div");
      error.className = "error";
      erroresContainer.appendChild(error);
    }

    // Agregar eventos de clic a las cartas
    agregarEventosCartas();
  }

  //Mostrar pantalla de derrota
  function LanzarGameOver() {
    detenerCronometro();
    InterfazJuego.style.display = "none";
    menuGameOver.style.display = "block";
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
          usuarioActual.Juego1[0] = juegoGanado;
          break;
        case "normal":
          usuarioActual.Juego1[0] = juegoGanado;
          break;
        case "dificil":
          usuarioActual.Juego1[0] = juegoGanado;
          break;
        // Puedes agregar más casos según la cantidad de juegos que tengas
      }
  
      localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
    }
  }
  
  

  GuardarYSalir.addEventListener("click", function () {
    
  });

  //Recargue la pagina para volver a interntarlo 
  VolverHaIntentarlo.addEventListener("click", function () {
    location.reload();
  });

  // Eventos click con generación de cartas y errores según la dificultad
  DificultadFacil.addEventListener("click", function () {
    dificultadElegida = "facil";
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    generarCartasYErrores(10, 5);
  });

  DificultadMedia.addEventListener("click", function () {
    dificultadElegida = "normal";
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    generarCartasYErrores(16, 4);
  });

  DificultadDificil.addEventListener("click", function () {
    dificultadElegida = "dificil";
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    generarCartasYErrores(20, 3);
  })
  nombreUser.textContent = `${usuarioActual}`
});
