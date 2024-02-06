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
      }
  }
}

function revelarBombas(fila, columna){
  
  var tamanoSeleccionado = document.getElementById("tamanoTablero").value;

  for (var i = 0; i < tamanoSeleccionado; i++) {
      for (var j = 0; j < tamanoSeleccionado; j++) {
          var celda = document.getElementById(i + "-" + j);
          if(celda.className=="bomba"){
            celda.innerHTML = "💣";
          }
      }
  }

}


function manejarClicCelda(event) {
  // Aquí puedes agregar la lógica que deseas ejecutar cuando se hace clic en una celda
  if(event.target.className == "bomba"){
    alert("Fin de la partida");
    revelarBombas();
  }
  else{

  }
  console.log("Celda clickeada:", event.target.className);
  // Por ejemplo, puedes revelar el contenido de la celda o realizar alguna otra acción
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
      numBombas = 24;
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
      celda.className = "bomba"; // Mostrar una 'B' en la celda para representar una bomba
    }
  }
}


