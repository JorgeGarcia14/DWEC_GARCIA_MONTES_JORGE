window.addEventListener("load", inicio);

function inicio() {
  var botonInicio = document.getElementById("bt_inicio");
  botonInicio.addEventListener("click", iniciarJuego);
  
}

function iniciarJuego() {
  crearTablero();
  colocarBombas();
  asignarEventosCeldas();
}

function asignarEventosCeldas() {
  var tamanoSeleccionado = document.getElementById("tamanoTablero").value;

  for (var i = 0; i < tamanoSeleccionado; i++) {
      for (var j = 0; j < tamanoSeleccionado; j++) {
          var celda = document.getElementById(i + "-" + j);
          celda.addEventListener("click", manejarClicCelda);
          celda.addEventListener("contextmenu", manejarClicDerecho)
      }
  }
}

function revelarBombas(){
  
  var tamanoSeleccionado = document.getElementById("tamanoTablero").value;

  for (var i = 0; i < tamanoSeleccionado; i++) {
      for (var j = 0; j < tamanoSeleccionado; j++) {
          var celda = document.getElementById(i + "-" + j);
          if(celda.classList.contains("bomba")){
            celda.innerHTML = "💣";
            celda.classList.add("revelada"); 
          }
          celda.classList.add("revelada");
      }
  }

}

function crearTablero() {
  // Obtener el tamaño seleccionado
  var tamanoSeleccionado = document.getElementById("tamanoTablero").value;

  // Crear el tablero
  var tablero = document.getElementById("tableroJuego");
  tablero.innerHTML = ""; // Limpiar el tablero antes de crear uno nuevo

  var tabla = document.createElement("table");
  for (var i = 0; i < tamanoSeleccionado; i++) {
    var fila = document.createElement("tr");
    for (var j = 0; j < tamanoSeleccionado; j++) {
      var celda = document.createElement("td");
      celda.id = i + "-" + j; // Asignar un ID único a cada celda
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }

  tablero.appendChild(tabla);
}

function colocarBombas() {
  // Obtener el tamaño seleccionado y la dificultad
  var tamanoSeleccionado = document.getElementById("tamanoTablero").value;
  let nivelSeleccionado = "";
  if (tamanoSeleccionado == 8) {
    nivelSeleccionado = "facil";
  } else if (tamanoSeleccionado == 12) {
    nivelSeleccionado = "medio";
  } else {
    nivelSeleccionado = "dificil";
  }
  var numBombas = 1;

  // Determinar la cantidad de bombas según el nivel seleccionado
  switch (nivelSeleccionado) {
    case "facil":
      numBombas = 10;
      break;
    case "medio":
      numBombas = 16;
      break;
    case "dificil":
      numBombas = 40;
      break;
    default:
      numBombas = 10; // Valor por defecto si no se selecciona ningún nivel
      break;
  }

  // Array para almacenar las posiciones de las bombas
  var bombPositions = [];

  // Colocar bombas aleatoriamente
  while (bombPositions.length < numBombas) {
    var fila = Math.floor(Math.random() * tamanoSeleccionado);
    var columna = Math.floor(Math.random() * tamanoSeleccionado);
    var posicion = fila + "-" + columna;

    // Verificar si la posición ya tiene una bomba
    if (!bombPositions.includes(posicion)) {
      // Guardar la posición de la bomba en el array
      bombPositions.push(posicion);

      // Aquí podrías actualizar visualmente el tablero para mostrar las bombas, por ejemplo:
      var celda = document.getElementById(fila + "-" + columna);
      celda.className = "bomba"; 
    }
  }
}

function manejarClicDerecho(event) {
  event.preventDefault(); // Evitar que aparezca el menú contextual

  var celda = event.target;

  // Verificar si la celda ya ha sido revelada
  if (celda.classList.contains("revelada")) {
    return; // No hacer nada si la celda ya ha sido revelada
  }

  // Cambiar el estado de la celda entre marcada y no marcada (para simular la bandera)
  if (celda.classList.contains("marcada")) {
    celda.classList.remove("marcada");
    celda.innerHTML = "";
  } else {
    celda.classList.add("marcada");
    celda.innerHTML = "🚩";
  }
}


function manejarClicCelda(event) {
  event.preventDefault();
  
  var celda = event.target;

  // Verificar si la celda ya ha sido revelada
  if (celda.classList.contains("revelada")) {
    return; // No hacer nada si la celda ya ha sido revelada
  }

  if (celda.classList.contains("marcada")) {
    // Si la celda está marcada, no hacer nada al hacer clic
    return;
  }

  // Lógica para revelar el contenido de la celda
  if (celda.classList.contains("bomba")) {
    alert("¡Has encontrado una bomba! Fin de la partida");
    revelarBombas();
  } else {
    var idCelda = celda.id.split("-");
    var fila = parseInt(idCelda[0]);
    var columna = parseInt(idCelda[1]);
    destaparCelda(fila, columna);
  }
}

function destaparCelda(fila, columna) {
  // Obtener el tamaño seleccionado
  var tamanoSeleccionado = parseInt(document.getElementById("tamanoTablero").value);

  // Recorrer las celdas adyacentes a la celda clickeada
  for (var i = Math.max(0, fila - 1); i <= Math.min(tamanoSeleccionado - 1, fila + 1); i++) {
    for (var j = Math.max(0, columna - 1); j <= Math.min(tamanoSeleccionado - 1, columna + 1); j++) {
      var celda = document.getElementById(i + "-" + j);

      // Verificar si la celda no ha sido revelada aún y no es una bomba
      if (!celda.classList.contains("revelada") && !celda.classList.contains("bomba")) {
        // Marcar la celda como revelada
        celda.classList.add("revelada");

        // Contar el número de bombas adyacentes
        var numBombas = contarBombasAdyacentes(i, j);
        
        // Si la celda no tiene bombas adyacentes, seguir destapando celdas vacías recursivamente
        if (numBombas === 0) {
          destaparCelda(i, j);
        } else {
          // Si la celda tiene bombas adyacentes, mostrar el número de bombas en la celda
          celda.innerHTML = numBombas;
          celda.classList.add("numero-" + numBombas);
        }
        
        // Agregar la clase .vacia-revelada solo a las celdas vacías y no a las que contienen bombas
        if (numBombas === 0) {
          celda.classList.add("vacia-revelada");
        }
      }
    }
  }
}

function contarBombasAdyacentes(fila, columna) {
  var tamanoSeleccionado = parseInt(document.getElementById("tamanoTablero").value);
  var count = 0;

  // Recorrer las celdas adyacentes a la celda dada
  for (var i = Math.max(0, fila - 1); i <= Math.min(tamanoSeleccionado - 1, fila + 1); i++) {
    for (var j = Math.max(0, columna - 1); j <= Math.min(tamanoSeleccionado - 1, columna + 1); j++) {
      var celda = document.getElementById(i + "-" + j);
      if (celda.classList.contains("bomba")) {
        count++;
      }
    }
  }

  return count;
}