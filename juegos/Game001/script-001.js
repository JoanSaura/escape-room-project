  //Capturamos las dificultades
  const DificultadFacil = document.getElementById('Principiante');
  const DificultadMedia = document.getElementById('Avanzado');
  const DificultadDificil = document.getElementById('Locura');
  const cronometro = document.getElementById('cronometro')
  const panelDificultad = document.getElementById('selector-dificultad');
  const InterfazJuego = document.getElementById('interfaz-juego');
  const PuntosUser = document.getElementById('puntos-usuario');
  const fondoSelector = document.querySelector('.fondo-selector'); 

  //Variables para el cronometro
  let tiempoTranscurrido = 0;
  let intervalo;
  let errores;
  let puntos;
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
      this.style.backgroundImage = `url('img/${this.dataset.imagen}')`;
      this.removeEventListener('click', arguments.callee);
      if(this.style.backgroundImage == 2 ) {
          puntos =+10;
          PuntosUser.innerHTML = `${puntos}`;
      }
      else {
        errores++;
        
      }
    });
    // Agregar evento para ocultar la imagen al hacer clic fuera de la carta
    carta.addEventListener('mouseleave', function() {
      if (this.style.backgroundImage.includes('Reverso.png')) {
        this.style.backgroundImage = `url('img/Reverso.png')`;
      }
    });
  });
}

// Función para generar cartas y errores según la dificultad
function generarCartasYErrores(numCartas, numErrores) {
  const tablero = document.getElementById('tablero');
  const erroresContainer = document.getElementById('errores');

  // Limpiar contenido actual
  tablero.innerHTML = '';
  erroresContainer.innerHTML = '';

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
  // Eventos click con generación de cartas y errores según la dificultad
  DificultadFacil.addEventListener('click', function() {
    ocultarPanelDificultad();
    mostrarInterfazJuego();
    reiniciarCronometro();
    iniciarCronometro();
    generarCartasYErrores(10, 5);
  });

  DificultadMedia.addEventListener('click', function() {
    ocultarPanelDificultad();
    mostrarInterfazJuego();
    reiniciarCronometro();
    iniciarCronometro();
    generarCartasYErrores(16, 4);
  });

  DificultadDificil.addEventListener('click', function() {
    mostrarInterfazJuego();
    ocultarPanelDificultad();
    reiniciarCronometro();
    iniciarCronometro();
    generarCartasYErrores(20, 3);
  });
