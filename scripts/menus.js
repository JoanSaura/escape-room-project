document.addEventListener('DOMContentLoaded', function() {
    const botonUsuarios = document.querySelector('.gestion-usuarios');
    const menuUsuarios = document.getElementById('menu-usuarios');
    const mostrarCrearUsuarioBtn = document.getElementById('crear-usuario-btn');
    const crearUsuarioDiv = document.getElementById('crear-usuario');
    const usuarioRegistradoText = document.getElementById('user');
    const cerrarCrearUsuarioBtn = document.getElementById('cerrar-crear-usuario');
    const cerrarMenuUsuarios = document.getElementById('cerrar-menu-usuarios');
    const guardarUsuarioBtn = document.getElementById('guardar-usuario');
    const nombreUsuarioInput = document.getElementById('nombre-usuario');
    const contraseñaInput = document.getElementById('contrasena-usuario');
    const iniciarSesionDiv = document.getElementById('iniciar-sesion');
    const listaUsuarios = document.getElementById('lista-usuarios');


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

    // Evento para guardar la información del usuario en el almacenamiento local
  guardarUsuarioBtn.addEventListener('click', function() {
    const nombreUsuario = nombreUsuarioInput.value;
    const contraseña = contraseñaInput.value;

    // Verifica si el usuario ya existe en el almacenamiento local
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuariosGuardados.find(u => u.nombre === nombreUsuario);

    if (usuarioExistente) {
      alert('El usuario ya existe. Por favor, elige otro nombre de usuario.');
    } else {
      // Agrega el nuevo usuario al almacenamiento local
      const nuevoUsuario = {
        nombre: nombreUsuario,
        contraseña: contraseña,
        puntajes: [],
        tiempos: []
      };
      if (!nuevoUsuario.nombreUsuario ?? "") {
        alert("Inserte un nombre, por favor");
        
      }
      
      usuariosGuardados.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

      // Cierra el formulario después de guardar
      crearUsuarioDiv.style.display = 'none';
      alert('Usuario creado exitosamente.');
    }

    
  });
  });
  