//Capturamos las dificultades
const DificultadFacil = document.getElementById('Principiante');
const DificultadMedia = document.getElementById('Avanzado');
const DificultadDificil = document.getElementById('Locura');
const cronometro = document.getElementById('cronometro')
//Variables para el cronometro
let tiempoTranscurrido = 0;
let intervalo;

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

// Ejemplo de uso en el evento click
DificultadFacil.addEventListener('click', function() {
  reiniciarCronometro();
  iniciarCronometro();
});

DificultadMedia.addEventListener('click', function() {
  reiniciarCronometro();
  iniciarCronometro();
});

DificultadDificil.addEventListener('click', function() {
  reiniciarCronometro();
  iniciarCronometro();
});
