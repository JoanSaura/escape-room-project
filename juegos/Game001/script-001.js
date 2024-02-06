document.addEventListener("DOMContentLoaded", function () {
    //Capturamos los elementos del HTML
  const DificultadFacil = document.getElementById('Principiante');
  const DificultadMedia = document.getElementById('Avanzado');
  const DificultadDificil = document.getElementById('Locura');
  const cronometro = document.getElementById('cronometro')
  const panelDificultad = document.getElementById('selector-dificultad');
  const InterfazJuego = document.getElementById('interfaz-juego');
  const PuntosUser = document.getElementById('puntos-usuario');
  const fondoSelector = document.querySelector('.fondo-selector'); 
  const tablero = document.getElementById('tablero');
  const erroresContainer = document.getElementById('errores');
  const menuGameOver = document.getElementById('juego-acabado');
    //Variables para el cronometro
  let tiempoTranscurrido = 0;
  let intervalo;
  let puntos;
  //Para implementar la logica del juego
  let cartasSeleccionadas = [];
  let cantidadErrores = 0;
  

  // Verificar si hay un nombre de usuario almacenado

  // Función para mostrar el interfaz de juego
  function mostrarInterfazJuego() {
    InterfazJuego.style.display = 'block'; 
  } 

  //Para cerrar el panel de dificultad y borrar el fondo
  function ocultarPanelDificultad() {
    panelDificultad.style.display = 'none';
    fondoSelector.remove(); 
    mostrarInterfazJuego(); 
  }

  function iniciarCronometro() {
    intervalo = setInterval(function() {
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
    cronometro.textContent = `${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
  }
  // Array de nombres de las imágenes
  const nombresImagenes = [
    'El Ahorcado.png',
    'El Bufon.png',
    'El Demonio.png',
    'El Hermitaño.png',
    'El Sol.png',
    'La gran sacerdotica.png',
    'La Luna.png',
    'La rueda de la fortuna.png',
    'La Torre.png',
    'Muerte.png'
  ];

  // Función para obtener una lista de pares de imágenes aleatorias
  function generarParesImagenes(numPares) {
    const imagenes = nombresImagenes.slice(0, numPares);
    return [...imagenes, ...imagenes].sort(() => Math.random() - 0.5);
  }

 // Función para agregar eventos de clic a las cartas y revelar las imágenes
 function agregarEventosCartas() {
  const cartas = document.querySelectorAll('.carta');
  cartas.forEach(carta => {
    carta.addEventListener('click', function() {
      if (cartasSeleccionadas.length < 2) {
        cartasSeleccionadas.push(this);
        this.style.backgroundImage = `url('img/${this.dataset.imagen}')`;

        if (cartasSeleccionadas.length === 2) {
          setTimeout(verificarCartasSeleccionadas, 1000); 
        }
      }

      this.removeEventListener('click', arguments.callee);
    });

    // Agregar evento para ocultar la imagen al hacer clic fuera de la carta
    carta.addEventListener('mouseleave', function() {
      if (this.style.backgroundImage.includes('Reverso.png')) {
        this.style.backgroundImage = `url('img/Reverso.png')`;
      }
    });
  });
}

function verificarCartasSeleccionadas() {
  const [carta1, carta2] = cartasSeleccionadas;
  if (carta1.dataset.imagen !== carta2.dataset.imagen) {
    // Si las cartas no son iguales, aumenta la cantidad de errores y agrega la clase 'erroneo'
    cantidadErrores++;
    erroresContainer.children[cantidadErrores - 1].classList.add('erroneo');
  }
  // Oculta las imágenes de las cartas después de verificar
  cartasSeleccionadas.forEach(carta => {
    carta.style.backgroundImage = `url('img/Reverso.png')`;
    carta.addEventListener('click', function() {
      if (cartasSeleccionadas.length < 2) {
        cartasSeleccionadas.push(this);
        this.style.backgroundImage = `url('img/${this.dataset.imagen}')`;

        if (cartasSeleccionadas.length === 2) {
          setTimeout(verificarCartasSeleccionadas, 1000);
        }
      }

      this.removeEventListener('click', arguments.callee);
    });
  });

  // Limpiar el array de cartas seleccionadas
  cartasSeleccionadas = [];
}



// Función para generar cartas y errores según la dificultad
function generarCartasYErrores(numCartas, numErrores) {
  // Limpiar contenido actual
  tablero.innerHTML = '';
  // Generar pares de imágenes aleatorias
  const paresImagenes = generarParesImagenes(numCartas / 2);

  // Generar cartas con imágenes y reverso
  for (let i = 0; i < numCartas; i++) {
    const carta = document.createElement('div');
    carta.className = 'carta';
    carta.dataset.imagen = i < paresImagenes.length ? paresImagenes[i] : 'Reverso.png';
    carta.style.backgroundImage = `url('img/Reverso.png')`; 
    tablero.appendChild(carta);
  }

  // Generar errores
  for (let i = 0; i < numErrores; i++) {
    const error = document.createElement('div');
    error.className = 'error';
    erroresContainer.appendChild(error);
  }

  // Agregar eventos de clic a las cartas
  agregarEventosCartas();
}
function LanzarGameOver(erroresTotales) {
  if (cantidadErrores >= erroresTotales) {
    InterfazJuego.style.display = 'none';
    menuGameOver.style.display= 'block';
  }
}

  // Eventos click con generación de cartas y errores según la dificultad
  DificultadFacil.addEventListener('click', function() {
    ocultarPanelDificultad();
    mostrarInterfazJuego();
    reiniciarCronometro();
    iniciarCronometro();
    generarCartasYErrores(10, 5);
    LanzarGameOver(5);
  });

  DificultadMedia.addEventListener('click', function() {
    ocultarPanelDificultad();
    mostrarInterfazJuego();
    reiniciarCronometro();
    iniciarCronometro();
    generarCartasYErrores(16, 4);
    LanzarGameOver(4);
  });

  DificultadDificil.addEventListener('click', function() {
    mostrarInterfazJuego();
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    generarCartasYErrores(20, 3);
    LanzarGameOver(3);
  });
});