//Capturamos las dificultades
const DificultadFacil = document.getElementById('Principiante');
const DificultadMedia = document.getElementById('Avanzado');
const DificultadDificil = document.getElementById('Locura');
const cronometro = document.getElementById('cronometro')
const panelDificultad = document.getElementById('selector-dificultad');
const InterfazJuego = document.getElementById('interfaz-juego');
const fondoSelector = document.querySelector('.fondo-selector'); 

//Variables para el cronometro
let tiempoTranscurrido = 0;
let intervalo;

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
// Función para generar cartas y errores según la dificultad
function generarCartasYErrores(numCartas, numErrores) {
  const tablero = document.getElementById('tablero');
  const erroresContainer = document.getElementById('errores');

  // Limpiar contenido actual
  tablero.innerHTML = '';
  erroresContainer.innerHTML = '';

  // Generar cartas
  for (let i = 0; i < numCartas; i++) {
    const carta = document.createElement('div');
    carta.className = 'carta';
    tablero.appendChild(carta);
  }

  // Generar errores
  for (let i = 0; i < numErrores; i++) {
    const error = document.createElement('div');
    error.className = 'error';
    erroresContainer.appendChild(error);
  }
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

