document.addEventListener('DOMContentLoaded', function() {
    const botonUsuarios = document.querySelector('.gestion-usuarios');
    const menuUsuarios = document.getElementById('menu-usuarios');
    const mostrarCrearUsuarioBtn = document.getElementById('crear-usuario-btn');
    const crearUsuarioDiv = document.getElementById('crear-usuario');
    const cerrarCrearUsuarioBtn = document.getElementById('cerrar-crear-usuario');
    const cerrarMenuUsuarios = document.getElementById('cerrar-menu-usuarios');

    //Menu desplegable de Gestión de usuarios
    botonUsuarios.addEventListener('click', function() {
      const menuEstaOculto = parseInt(getComputedStyle(menuUsuarios).right) < 0;
      menuUsuarios.style.right = menuEstaOculto ? '0' : '-250px';
    });
  
    //Cerrar menu de usuarios
    cerrarMenuUsuarios.addEventListener('click' ,function() {
        const menuEstaOculto = parseInt(getComputedStyle(menuUsuarios).right) < 0;
        menuUsuarios.style.right = menuEstaOculto ? '0' : '-250px';
    });

    //Mostrar Creación de usuarios
    mostrarCrearUsuarioBtn.addEventListener('click', function() {
      crearUsuarioDiv.style.display = 'flex';
    });
    
    //Cerrar Creación de usuarios
    cerrarCrearUsuarioBtn.addEventListener('click', function() {
      crearUsuarioDiv.style.display = 'none';
    });
  });
  