document.addEventListener("DOMContentLoaded", function () {
  // Obtener elementos del DOM
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
  const InteractMusica = document.getElementById('mutear');
  const VolverHaIntentarlo = document.querySelectorAll("#volver-ha-intentarlo");
  //Variables globales
  let tiempoTranscurrido = 0;
  let intervalo;
  let dificultadElegida = "";
  let puntos = 0;
  let cartasSeleccionadas = [];
  let cantidadErrores = 0;
  //Declaramos los audios
  let Selected = new Audio();
  Selected.src = '/src/sfx/Aceptado.mp3';
  let cardFlip = new Audio();
  cardFlip.src = '/src/sfx/Carta.mp3';
  let correctoS = new Audio();
  correctoS.src = '/src/sfx/Correcto.mp3';  
  let WinSound = new Audio();
  WinSound.src = '/src/sfx/Victoria.mp3';
  let DefeatSound = new Audio();
  DefeatSound.src = '/src/sfx/Derrota.mp3';
  let Fallo = new Audio();
  Fallo.src = '/src/sfx/Fallo.mp3';
  let Musica = new Audio();
  Musica.src = '/src/bgm/Musica1.mp3';
  Musica.loop = true;
  //Capturamos el usuario si esta previamente dado de alta
  const usuarioActual = obtenerUsuarioActual();
  // Mostrar nombre del usuario
  if (usuarioActual) {
    mostrarNombreUsuario(usuarioActual);
    console.log(usuarioActual);
  }

  // Función para mostrar el nombre del usuario
  function mostrarNombreUsuario(usuario) {
    nombreUser.textContent = usuario.nombre;
  }

  // Obtener usuario actual del almacenamiento local
  function obtenerUsuarioActual() {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    return usuarioActual || "Jugando de forma anonima";
  }

  // Mostrar la interfaz del juego
  function mostrarInterfazJuego() {
    InterfazJuego.style.display = "block";
  }

  // Ocultar el panel de dificultad
  function ocultarPanelDificultad() {
    panelDificultad.style.display = "none";
    fondoSelector.remove();
    mostrarInterfazJuego();
  }

  // Iniciar el cronómetro
  function iniciarCronometro() {
    intervalo = setInterval(function () {
      tiempoTranscurrido++;
      actualizarCronometro();
    }, 1000);
  }

  // Detener el cronómetro
  function detenerCronometro() {
    clearInterval(intervalo);
  }

  // Reiniciar el cronómetro
  function reiniciarCronometro() {
    detenerCronometro();
    tiempoTranscurrido = 0;
    actualizarCronometro();
  }

  // Actualizar la visualización del cronómetro
  function actualizarCronometro() {
    const horas = Math.floor(tiempoTranscurrido / 3600);
    const minutos = Math.floor((tiempoTranscurrido % 3600) / 60);
    const segundos = tiempoTranscurrido % 60;
    cronometro.textContent = `${horas < 10 ? "0" + horas : horas}:${
      minutos < 10 ? "0" + minutos : minutos
    }:${segundos < 10 ? "0" + segundos : segundos}`;
  }

  // Nombres de las imágenes del juego de memoria
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

  // Generar pares de imágenes para el juego de memoria
  function generarParesImagenes(numPares) {
    const imagenes = nombresImagenes.slice(0, numPares);
    return [...imagenes, ...imagenes].sort(() => Math.random() - 0.5);
  }

  // Agregar eventos a las cartas del juego
  function agregarEventosCartas() {
    const cartas = document.querySelectorAll(".carta");
    cartas.forEach((carta) => {
      // Evento al hacer clic en una carta
      carta.addEventListener("click", function () {
        cardFlip.play();
        // Verificar si la carta ya está acertada o ya está seleccionada
        if (!this.classList.contains("acertada") && !this.classList.contains("seleccionada") && cartasSeleccionadas.length < 2) {
            cartasSeleccionadas.push(this);
            this.style.backgroundImage = `url('img/${this.dataset.imagen}')`;
            this.classList.add("seleccionada"); // Marcar la carta como seleccionada
            if (cartasSeleccionadas.length === 2) {
                setTimeout(verificarCartasSeleccionadas, 1000);
            }
        }
    });

      // Evento al quitar el mouse de una carta
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

  // Verificar las cartas seleccionadas por el jugador
  function verificarCartasSeleccionadas() {
    const [carta1, carta2] = cartasSeleccionadas;
  
    if (carta1.dataset.imagen === carta2.dataset.imagen) {
      cartasSeleccionadas.forEach((carta) => {
        correctoS.play();
        carta.classList.add("acertada");
        puntos += 10;
        PuntosUser.innerHTML = `${puntos}`;
      });
    } else {
      Fallo.play();
      cantidadErrores++;
      erroresContainer.children[cantidadErrores - 1].classList.add("errado");
    }
  
    // Ocultar las cartas después de un breve período
    setTimeout(() => {
      cartasSeleccionadas.forEach((carta) => {
        carta.style.backgroundImage = `url('img/Reverso.png')`;
        carta.classList.remove("seleccionada");
      });
      cartasSeleccionadas = []; // Limpiar las cartas seleccionadas
  
      // Comprobar condiciones de victoria o derrota después de ocultar las cartas
      if (verificarVictoria()) {
        lanzarWin();
      } else if (verificarDerrota()) {
        lanzarGameOver();
      }
    }, 100); 
  }

  // Verificar condiciones de victoria
  function verificarVictoria() {
    return (
      (dificultadElegida == "facil" && puntos === 100) ||
      (dificultadElegida == "medio" && puntos === 160) ||
      (dificultadElegida == "dificil" && puntos === 200)
    );
  }

  // Verificar condiciones de derrota
  function verificarDerrota() {
    return (
      (dificultadElegida == "facil" && cantidadErrores === 5) ||
      (dificultadElegida == "medio" && cantidadErrores === 4) ||
      (dificultadElegida == "dificil" && cantidadErrores === 3)
    );
  }
  // Generar el tablero de cartas y errores
  function generarCartasYErrores(numCartas, numErrores) {
    tablero.innerHTML = "";
    const paresImagenes = generarParesImagenes(numCartas / 2);

    for (let i = 0; i < numCartas; i++) {
      const carta = document.createElement("div");
      carta.className = "carta";
      carta.dataset.imagen =
        i < paresImagenes.length ? paresImagenes[i] : "Reverso.png";
      carta.style.backgroundImage = `url('img/Reverso.png')`;
      tablero.appendChild(carta);
    }

    for (let i = 0; i < numErrores; i++) {
      const error = document.createElement("div");
      error.className = "error";
      erroresContainer.appendChild(error);
    }
    agregarEventosCartas();
  }

  // Función para mostrar el menú de juego perdido
  function lanzarGameOver() {
    DefeatSound.play();
    detenerCronometro();
    InterfazJuego.style.display = "none";
    menuGameOver.style.display = "flex";
  }

  // Función para mostrar el menú de juego ganado
  function lanzarWin() {
    WinSound.play();
    detenerCronometro();
    InterfazJuego.style.display = "none";
    menuVictoria.style.display = "flex";

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
  }

  //Actualiza la informacion de los datos del juego que tiene el propio usuario
  function actualizarJuego(usuario, dificultad, nuevoEstado) {
    if (usuario && usuario.juegos) {
      // Verificar si el juego para la dificultad ya existe
      if (usuario.juegos[`Juego1`]) {
        const juego = usuario.juegos[`Juego1`];
        // Si se encuentra el juego, actualizar sus datos directamente
        juego.dificultad = dificultad;
        juego.tiempo = nuevoEstado.tiempo;
        juego.puntos = nuevoEstado.puntos;
        juego.superado = nuevoEstado.superado;
      } else {
        // Si no se encuentra el juego, crear un nuevo objeto de juego y agregarlo al usuario
        usuario.juegos[`Juego1`] = {
          dificultad: dificultad,
          tiempo: nuevoEstado.tiempo,
          puntos: nuevoEstado.puntos,
          superado: nuevoEstado.superado,
        };
      }
      console.log("Usuario después de la actualización:", usuario);
    }
  }

    // Para interactuar con la canción
InteractMusica.addEventListener('click', function () {
  if (InteractMusica.textContent === 'Silenciar') {
      Musica.muted = true;  // Silenciar la música
      InteractMusica.textContent = 'Volver a poner música';
  } else {
      Musica.muted = false;  // Volver a reproducir la música
      InteractMusica.textContent = 'Silenciar';
  }
});

  // Agregar eventos al botón de volver a intentarlo
  VolverHaIntentarlo.forEach((button) => {
    button.addEventListener("click", function () {
      location.reload();
    });
  });

  // Evento al hacer clic en la dificultad fácil
  DificultadFacil.addEventListener("click", function () {
    Selected.play();
    Musica.play();
    dificultadElegida = "facil";
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    generarCartasYErrores(10, 5);
  });

  // Evento al hacer clic en la dificultad media
  DificultadMedia.addEventListener("click", function () {
    Selected.play();
    Musica.play();
    dificultadElegida = "medio";
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    generarCartasYErrores(16, 5);
  });

  // Evento al hacer clic en la dificultad difícil
  DificultadDificil.addEventListener("click", function () {
    Selected.play();
    Musica.play();
    dificultadElegida = "dificil";
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    generarCartasYErrores(20, 6);
  });
});
