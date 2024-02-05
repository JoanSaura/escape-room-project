document.addEventListener("DOMContentLoaded", function () {
  //Elementos del menu principal
  const selectorJuego = document.getElementById('selector-juego');
  const cerrarSelectorJuego = document.getElementById('cerrar-selector-juego');
  const nuevoJuegoBtn = document.getElementById('nuevo-juego');
  const botonUsuarios = document.querySelector(".gestion-usuarios");
  const menuUsuarios = document.getElementById("menu-usuarios");
  const mostrarCrearUsuarioBtn = document.getElementById("crear-usuario-btn");
  const crearUsuarioDiv = document.getElementById("crear-usuario");
  const usuarioRegistradoText = document.getElementById("user");
  //Elemnos de Crear usuario
  const cerrarCrearUsuarioBtn = document.getElementById("cerrar-crear-usuario");
  const cerrarMenuUsuarios = document.getElementById("cerrar-menu-usuarios");
  const guardarUsuarioBtn = document.getElementById("guardar-usuario");
  const nombreUsuarioInput = document.getElementById("nombre-usuario");
  const contraseñaInput = document.getElementById("contrasena-usuario");
  // Elementos de inicio de sesion
  const BtninicioSesion = document.getElementById('inicio-sesion-btn');
  const cerrarInicioSesion = document.getElementById('cerrar-inicio-sesion');
  const menuInicioSesion = document.getElementById('iniciar-sesion-menu');



  let popupVisible = null;
  //Para mostrar los diferentes pop-ups
  function mostrarPopup(popup) {
    if (popupVisible) {
      popupVisible.style.display = "none";
    }
    popup.style.display = "flex";
    popupVisible = popup;
  }
  //Para cerrar los pop-ups
  function cerrarPopup() {
    if (popupVisible) {
      popupVisible.style.display = "none";
      popupVisible = null;
    }
  }

  // Menu desplegable de Gestión de usuarios
  botonUsuarios.addEventListener("click", function () {
    cerrarPopup();
    const menuEstaOculto = parseInt(getComputedStyle(menuUsuarios).right) < 0;
    menuUsuarios.style.right = menuEstaOculto ? "0" : "-250px";
  });

  // Cerrar menu de usuarios
  cerrarMenuUsuarios.addEventListener("click", function () {
    cerrarPopup();
    const menuEstaOculto = parseInt(getComputedStyle(menuUsuarios).right) < 0;
    menuUsuarios.style.right = menuEstaOculto ? "0" : "-250px";
  });

  // Mostrar Creación de usuarios
  mostrarCrearUsuarioBtn.addEventListener("click", function () {
    mostrarPopup(crearUsuarioDiv);
  });

  // Cerrar Creación de usuarios
  cerrarCrearUsuarioBtn.addEventListener("click", function () {
    cerrarPopup();
  });

  // Evento para guardar la información del usuario en el almacenamiento local
  guardarUsuarioBtn.addEventListener("click", function () {
    const nombreUsuario = nombreUsuarioInput.value;
    const contraseña = contraseñaInput.value;

    // Verifica si el usuario ya existe en el almacenamiento local
    const usuariosGuardados =
      JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioExistente = usuariosGuardados.find(
      (u) => u.nombre === nombreUsuario
    );

    if (usuarioExistente) {
      alert("El usuario ya existe. Por favor, elige otro nombre de usuario.");
    } else {
      // Agrega el nuevo usuario al almacenamiento local
      const nuevoUsuario = {
        nombre: nombreUsuario,
        contraseña: contraseña,
        Juego1 : [
          {
            "tiempo" : null,
            "puntos" : null,
          }
        ],
        Juego2: [
          {
            "tiempo" : null,
            "puntos" : null,
          }
        ],
        Juego3: [
          {
            "tiempo" : null,
            "puntos" : null,
          }
        ],
        Juego4 :[
          {
            "tiempo" : null,
            "puntos" : null,
          }
        ],
        Juego4: [
          {
            "tiempo" : null,
            "puntos" : null,
          }
        ]
      };
      if (!nuevoUsuario.nombre || nuevoUsuario.nombre.trim() === "") {
        alert("Inserte un nombre, por favor");
      }      

      usuariosGuardados.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

      // Cierra el formulario después de guardar
      crearUsuarioDiv.style.display = "none";
      alert("Usuario creado exitosamente.");
      cerrarPopup();
    }
  });

// Mostrar Menu de inicio de sesion
BtninicioSesion.addEventListener("click", function () {
  // Obtener la lista de usuarios desde el almacenamiento local
  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
  // Obtener el elemento de la lista de usuarios
  const listaUsuarios = document.getElementById("lista-usuarios");
  // Limpiar la lista antes de agregar los usuarios
  listaUsuarios.innerHTML = "";
  // Agregar cada usuario a la lista
  usuariosGuardados.forEach((usuario) => {
    const listItem = document.createElement("li");
    listItem.textContent = usuario.nombre;
    // Agregar un evento al hacer clic en un usuario para realizar acciones adicionales si es necesario
    listItem.addEventListener("click", function () {
      // Puedes realizar acciones adicionales aquí, como iniciar sesión con el usuario seleccionado
      alert("Iniciar sesión como " + usuario.nombre);
      cerrarPopup();
      // Muestra que usuario esta dado de alta ya en el menu
      usuarioRegistradoText.innerText = "Hola " +usuario.nombre;
      // Después de guardar el nuevo usuario
localStorage.setItem("usuarioActual", nuevoUsuario.nombre);

    });
    // Agregar el elemento de la lista al elemento ul
    listaUsuarios.appendChild(listItem);
  });
  // Mostrar el menú de inicio de sesión
  mostrarPopup(menuInicioSesion);
});
  // Cerrar Inicio de sesion
  cerrarInicioSesion.addEventListener("click", function () {
    cerrarPopup();
  });
 nuevoJuegoBtn.addEventListener('click', function () {
    if (usuarioRegistradoText.innerText === "No hay ninguna sesión activa") {
      alert("No se puede jugar sin ningún usuario elegido");
    } else {
       mostrarPopup(selectorJuego);
    }
  });
});
