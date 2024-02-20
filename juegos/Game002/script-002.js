document.addEventListener("DOMContentLoaded", function () {
  //Capturamos elementos del HTML
  const panelDificultad = document.getElementById("selector-dificultad");
  const DificultadFacil = document.getElementById("Principiante");
  const DificultadMedia = document.getElementById("Avanzado");
  const DificultadDificil = document.getElementById("Locura");
  const cronometro = document.getElementById("cronometro");
  const InterfazJuego = document.getElementById("interfaz-juego");
  const PuntosUser = document.getElementById("puntos-usuario");
  const nombreUser = document.getElementById("user");
  const fondoSelector = document.querySelector(".fondo-selector");
  const palabraAdivinar = document.getElementById("palabra-adivinar");
  const erroresContainer = document.getElementById("contenedor-errores");
  const teclasJuego = document.querySelectorAll(".tecla");
  const menuVictoria = document.getElementById("juego-ganado");
  const juegoPerdido = document.getElementById("juego-perdido");
  const VolverHaIntentarlo = document.querySelectorAll("#volver-ha-intentarlo");
  // Cargamos los usuarios
  const usuarioActual = obtenerUsuarioActual();
  // Mostrar nombre del usuario o Anonimo si no hay usuario actual
  if (usuarioActual) {
    mostrarNombreUsuario(usuarioActual);
    console.log(usuarioActual);
  } 

  //Variables globales
  let tiempoTranscurrido = 0;
  let intervalo;
  let puntos = 0;
  let dificultadElegida = "";
  let palabraSeleccionada = "";
  let cantidadErrores = 0;
    // Función para mostrar el nombre del usuario
    function mostrarNombreUsuario(usuario) {
      nombreUser.textContent = usuario.nombre;
    }

    // Obtener usuario actual del almacenamiento local
    function obtenerUsuarioActual() {
      const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
      return usuarioActual || "Anonimo";
    }
  
  //Palabras para adivinar en base a la dificultad
  const fobiasFacil = [
    "aracnofobia",
    "agorafobia",
    "acrofobia",
    "claustrofobia",
    "socialfobia",
    "aerofobia",
  ];
  const fobiasMedio = [
    "nomofobia",
    "coulrofobia",
    "dentofobia",
    "enoclofobia",
    "ablutofobia",
    "somnifobia",
  ];
  const fobiasDificil = [
    "xantofobia",
    "pogonofobia",
    "sesquipedaliofobia",
    "arachibutyrofobia",
    "pteronofobia",
    "consecotaleofobia",
  ];

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
  //Funcion para iniciar el cronometro
  function iniciarCronometro() {
    intervalo = setInterval(function () {
      tiempoTranscurrido++;
      actualizarCronometro();
    }, 1000);
  }
  //Funcion para detener el cronometro
  function detenerCronometro() {
    clearInterval(intervalo);
  }
  //Funcion para reiniciar el cronometro
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
    palabraAdivinar.innerHTML = "";
    for (let i = 0; i < palabra.length; i++) {
      const divLetra = document.createElement("div");
      if (i < palabra.length) {
        divLetra.textContent = "*";
      } else {
        divLetra.textContent = palabra[i];
      }
      divLetra.classList.add("letra");
      palabraAdivinar.appendChild(divLetra);
    }
  }
  //Funcion para comprobar si la letra es correcta o incorrecta
  function comprobarLetra(letra, teclaClicada) {
    letra = letra.toLowerCase();
    if (palabraSeleccionada.includes(letra)) {
      // La letra es correcta
      palabraAdivinar.querySelectorAll(".letra").forEach((divLetra, index) => {
        if (palabraSeleccionada[index] === letra) {
          divLetra.textContent = letra;
          puntos += 10;
          PuntosUser.innerText = puntos;
        }
      });
      teclaClicada.classList.add("correcta");
      if (palabraAdivinar.textContent === palabraSeleccionada.toLowerCase()) {
        console.log("Victoria");
        LanzarWin();
      }
    } else {
      teclaClicada.classList.add("erroneo");
      cantidadErrores++;
      if (cantidadErrores <= erroresContainer.children.length) {
        erroresContainer.children[cantidadErrores - 1].classList.add("errado");
      }
      if (cantidadErrores === erroresContainer.children.length) {
        LanzarGameOver();
      }
    }
  }

// Agrega un evento de clic para cada tecla del teclado
teclasJuego.forEach((tecla) => {
  tecla.addEventListener("click", function handleClick() {
    comprobarLetra(tecla.textContent, tecla);
    // Desactiva el evento de clic después de comprobar la letra
    tecla.removeEventListener("click", handleClick);
  });
});



  //Crear el numero de errores maximo
  function generarErrores(MaxErrores) {
    for (let i = 0; i < MaxErrores; i++) {
      const generadorError = document.createElement("div");
      generadorError.className = "error";
      erroresContainer.appendChild(generadorError);
    }
  }

  //Mostrar pantalla de derrota
  function LanzarGameOver() {
    detenerCronometro();
    InterfazJuego.style.display = "none";
    juegoPerdido.style.display = "flex";
  }

  //Mostrar pantalla de victoria
  function LanzarWin() {
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
  
  //Recargue la pagina para volver a interntarlo
 VolverHaIntentarlo.forEach(button => {
  button.addEventListener("click", function () {
    location.reload();
  });
});

function actualizarJuego(usuario, dificultad, nuevoEstado) {
  if (usuario && usuario.juegos) {
    // Verificar si el juego para la dificultad ya existe
    if (usuario.juegos[`Juego2`]) {
      const juego = usuario.juegos[`Juego2`];
      // Si se encuentra el juego, actualizar sus datos directamente
      juego.dificultad = dificultad;
      juego.tiempo = nuevoEstado.tiempo;
      juego.puntos = nuevoEstado.puntos;
      juego.superado = nuevoEstado.superado;
    } else {
      // Si no se encuentra el juego, crear un nuevo objeto de juego y agregarlo al usuario
      usuario.juegos[`Juego2`] = {
        dificultad: dificultad,
        tiempo: nuevoEstado.tiempo,
        puntos: nuevoEstado.puntos,
        superado: nuevoEstado.superado
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
    generarErrores(5);
    const palabra = seleccionarPalabra(dificultadElegida);
    generarLetrasPalabra(palabra);
  });

  DificultadMedia.addEventListener("click", function () {
    dificultadElegida = "normal";
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    generarErrores(4);
    const palabra = seleccionarPalabra(dificultadElegida);
    generarLetrasPalabra(palabra);
  });

  DificultadDificil.addEventListener("click", function () {
    dificultadElegida = "dificil";
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    generarErrores(3);
    const palabra = seleccionarPalabra(dificultadElegida);
    generarLetrasPalabra(palabra);
  });
});
