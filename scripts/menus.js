const botonUsuarios = document.querySelector('.gestion-usuarios');
const menuUsuarios = document.getElementById('menu-usuarios');
const cerrar = document.getElementById('Cerrar');

botonUsuarios.addEventListener('click', function() {
    const menuEstaOculto = parseInt(getComputedStyle(menuUsuarios).right) < 0;

    menuUsuarios.style.right = menuEstaOculto ? '0' : '-250px';
});

cerrar.addEventListener('click', function() {
    if (window.opener) {
        window.close();
    }
});