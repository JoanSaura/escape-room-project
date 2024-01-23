const botonUsuarios = document.querySelector('.boton-usuarios');
const menuUsuarios = document.getElementById('menu-usuarios');

botonUsuarios.addEventListener('click', function() {
    if (parseInt(getComputedStyle(menuUsuarios).right) < 0) {
        menuUsuarios.style.right = '0';
    } else {
        menuUsuarios.style.right = '-250px';
    }
});
