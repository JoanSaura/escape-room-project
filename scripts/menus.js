document.addEventListener("DOMContentLoaded", function () {
  // Elementos del menú principal
  const nuevoJuegoBtn = document.getElementById("nuevo-juego");
  const botonUsuarios = document.querySelector(".gestion-usuarios");
  const menuUsuarios = document.getElementById("menu-usuarios");
  const mostrarCrearUsuarioBtn = document.getElementById("crear-usuario-btn");
  const crearUsuarioDiv = document.getElementById("crear-usuario");
  const usuarioRegistradoText = document.getElementById("user");
  // Elementos de Crear usuario
  const cerrarCrearUsuarioBtn = document.getElementById("cerrar-crear-usuario");
  const cerrarMenuUsuarios = document.getElementById("cerrar-menu-usuarios");
  const guardarUsuarioBtn = document.getElementById("guardar-usuario");
  const nombreUsuarioInput = document.getElementById("nombre-usuario");
  const contraseñaInput = document.getElementById("contrasena-usuario");
  // Elementos de inicio de sesión
  const BtninicioSesion = document.getElementById("inicio-sesion-btn");
  const cerrarInicioSesion = document.getElementById("cerrar-inicio-sesion");
  const menuInicioSesion = document.getElementById("iniciar-sesion-menu");

  //Declaramos los sonidos
  let BotonSeleciondo =  new Audio();
  BotonSeleciondo.src = '/src/sfx/Casilla.mp3';
  let Exitoso = new Audio();
  Exitoso.src = '/src/sfx/Correcto.mp3';
  let Pop = new Audio();
  Pop.src = '/src/sfx/Carta.mp3';
   // Para mostrar los diferentes pop-ups
  let popupVisible = null;
  function mostrarPopup(popup) {
    if (popupVisible) {
      popupVisible.style.display = "none";
    }
    popup.style.display = "flex";
    popupVisible = popup;
  }
  // Para cerrar los pop-ups
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
    BotonSeleciondo.play();
    menuUsuarios.style.right = menuEstaOculto ? "0" : "-250px";
  });

  // Cerrar menu de usuarios
  cerrarMenuUsuarios.addEventListener("click", function () {
    BotonSeleciondo.play();
    cerrarPopup();
    const menuEstaOculto = parseInt(getComputedStyle(menuUsuarios).right) < 0;
    menuUsuarios.style.right = menuEstaOculto ? "0" : "-250px";
  });

  // Mostrar Creación de usuarios
  mostrarCrearUsuarioBtn.addEventListener("click", function () {
    Pop.play();
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
        juegos: {
          Juego1: {
            dificultad: null,
            tiempo: null,
            puntos: null,
            superado: false,
          },
          Juego2: {
            dificultad: null,
            tiempo: null,
            puntos: null,
            superado: false,
          },
          Juego3: {
            dificultad: null,
            tiempo: null,
            puntos: null,
            superado: false,
          },
        },
      };

      if (!nuevoUsuario.nombre || nuevoUsuario.nombre.trim() === "") {
        alert("Inserte un nombre, por favor");
      }

      usuariosGuardados.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
      localStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario));

      // Cierra el formulario después de guardar
      crearUsuarioDiv.style.display = "none";
      Exitoso.play();
      alert("Usuario creado exitosamente.");
      cerrarPopup();
    }
  });

  // Mostrar Menu de inicio de sesion
  BtninicioSesion.addEventListener("click", function () {
    Pop.play();
    // Obtener la lista de usuarios desde el almacenamiento local
    const usuariosGuardados =
      JSON.parse(localStorage.getItem("usuarios")) || [];
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
        Exitoso.play();
        // Puedes realizar acciones adicionales aquí, como iniciar sesión con el usuario seleccionado
        alert("Iniciar sesión como " + usuario.nombre);
        cerrarPopup();
        // Muestra que usuario esta dado de alta ya en el menu
        usuarioRegistradoText.innerText = "Hola " + usuario.nombre;
        // Después de guardar el nuevo usuario
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
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

  nuevoJuegoBtn.addEventListener("click", function () {
    // Obtener el usuario actual del localStorage
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    // Verificar si hay un usuario elegido
    if (
      usuarioActual === null ||
      usuarioActual === "No hay ninguna sesión activa"
    ) {
      alert("No se puede jugar sin ningún usuario elegido");
    } else {
      // Redirigir a la página del juego
      window.location.href = "/juegos/Game001/index-001.html";
    }
  });
});
