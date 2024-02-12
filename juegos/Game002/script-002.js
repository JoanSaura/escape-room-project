document.addEventListener("DOMContentLoaded", function () {
  const panelDificultad = document.getElementById("selector-dificultad");
  const DificultadFacil = document.getElementById("Principiante");
  const DificultadMedia = document.getElementById("Avanzado");
  const DificultadDificil = document.getElementById("Locura");
  const cronometro = document.getElementById("cronometro");
  const InterfazJuego = document.getElementById("interfaz-juego");
  const PuntosUser = document.getElementById("puntos-usuario");
  const fondoSelector = document.querySelector(".fondo-selector");
  const palabraAdivinar = document.getElementById("palabra-adivinar");

  let tiempoTranscurrido = 0;
  let intervalo;
  let puntos = 0;
  let dificultadElegida = "";
  let palabraSeleccionada = "";

  //Palabras para adivinar en base a la dificultad
  const fobiasFacil = [
    "Aracnofobia",
    "Agorafobia",
    "Acrofobia",
    "Claustrofobia",
    "Socialfobia",
    "Aerofobia",
  ];
  const fobiasMedio = [
    "Nomofobia",
    "Coulrofobia",
    "Dentofobia",
    "Enoclofobia",
    "Ablutofobia",
    "Somnifobia",
  ];
  const fobiasDificil = [
    "Xantofobia",
    "Pogonofobia",
    "Sesquipedaliofobia",
    "Arachibutyrofobia",
    "Pteronofobia",
    "Consecotaleofobia",
  ];

  document.addEventListener('keydown', manejarTeclado);


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

  // Actualizar el texto del cronometro
  function actualizarCronometro() {
    const horas = Math.floor(tiempoTranscurrido / 3600);
    const minutos = Math.floor((tiempoTranscurrido % 3600) / 60);
    const segundos = tiempoTranscurrido % 60;
    cronometro.textContent = `${horas < 10 ? "0" + horas : horas}:${
      minutos < 10 ? "0" + minutos : minutos
    }:${segundos < 10 ? "0" + segundos : segundos}`;
  }

  // Función para seleccionar una palabra aleatoria según la dificultad
  function seleccionarPalabra(dificultad) {
    let palabras;
    switch (dificultad) {
      case "facil":
        palabras = fobiasFacil;
        break;
      case "normal":
        palabras = fobiasMedio;
        break;
      case "dificil":
        palabras = fobiasDificil;
        break;
      default:
        palabras = fobiasFacil;
    }
    return palabras[Math.floor(Math.random() * palabras.length)];
  }

  // Función para generar los elementos div correspondientes a cada letra de la palabra seleccionada
  function generarLetrasPalabra(palabra) {
    palabraSeleccionada = palabra;
    console.log(palabra);
     palabraAdivinar.innerHTML = ""; // Limpiamos el contenedor antes de agregar nuevas letras
    for (let i = 0; i < palabra.length; i++) {
      const divLetra = document.createElement("div");
      if (i < palabra.length - 5) { // Mantener las últimas cuatro letras ocultas
        divLetra.textContent = '*'; // Ocultar la letra
      } else {
        divLetra.textContent = palabra[i]; // Mostrar la letra
      }
      divLetra.classList.add("letra");
      palabraAdivinar.appendChild(divLetra);
    }
  }

  // Función para manejar el evento de teclado
  function manejarTeclado(event) {
    const letraPresionada = event.key.toUpperCase(); 
    const letrasPalabra = palabraSeleccionada.toUpperCase().split('');
    const divsLetras = palabraAdivinar.querySelectorAll('.letra');
    let letraCorrecta = false;

    letrasPalabra.forEach((letra, index) => {
      if (letra === letraPresionada) {
        letraCorrecta = true;
        divsLetras[index].textContent = letra; 
        divsLetras[index].classList.add('correcta');
      }
    });

    if (!letraCorrecta) {
      palabraAdivinar.classList.add('erroneo');
    }
  }

  // Eventos click con generación de cartas y errores según la dificultad
  DificultadFacil.addEventListener("click", function () {
    dificultadElegida = "facil";
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    const palabra = seleccionarPalabra(dificultadElegida);
    generarLetrasPalabra(palabra);
  });

  DificultadMedia.addEventListener("click", function () {
    dificultadElegida = "normal";
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    const palabra = seleccionarPalabra(dificultadElegida);
    generarLetrasPalabra(palabra);
  });

  DificultadDificil.addEventListener("click", function () {
    dificultadElegida = "dificil";
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    const palabra = seleccionarPalabra(dificultadElegida);
    generarLetrasPalabra(palabra);
  });
});
