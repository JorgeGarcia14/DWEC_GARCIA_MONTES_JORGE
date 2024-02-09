window.addEventListener("load", inicio);
let bombasMarcadasCorrectamente = 0;
let celdaReveladas =0;
let botonInicio = document.getElementById("bt_inicio");
let tamanoSeleccionado = document.getElementById("tamanoTablero").value;

function inicio() {
  botonInicio.addEventListener("click", iniciarJuego);

}

function iniciarJuego() {
  bombasMarcadasCorrectamente = 0;
  celdaReveladas =0;
  botonInicio.innerHTML="Iniciar juego";
  crearTablero();
  colocarBombas();
  asignarEventosCeldas();
  ganarPartida();
}

function asignarEventosCeldas() {

  for (let i = 0; i < tamanoSeleccionado; i++) {
      for (let j = 0; j < tamanoSeleccionado; j++) {
          let celda = document.getElementById(i + "-" + j);
          celda.addEventListener("click", manejarClicCelda);
          celda.addEventListener("contextmenu", manejarClicDerecho)
          
      }
  }
}

function revelarBombas(){
  

  for (let i = 0; i < tamanoSeleccionado; i++) {
      for (let j = 0; j < tamanoSeleccionado; j++) {
          let celda = document.getElementById(i + "-" + j);
          if(celda.classList.contains("bomba") && !celda.classList.contains("marcada")){
            celda.innerHTML = "💣";
            celda.classList.add("revelada"); 
          }
          celda.classList.add("revelada");
      }
  }

}

function crearTablero() {

  // Crear el tablero
  let tablero = document.getElementById("tableroJuego");
  tablero.innerHTML = ""; // Limpiar el tablero antes de crear uno nuevo

  let tabla = document.createElement("table");
  for (let i = 0; i < tamanoSeleccionado; i++) {
    let fila = document.createElement("tr");
    for (let j = 0; j < tamanoSeleccionado; j++) {
      let celda = document.createElement("td");
      celda.id = i + "-" + j; // Asignar un ID único a cada celda
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }

  tablero.appendChild(tabla);
}

function colocarBombas() {
 
  let nivelSeleccionado = "";

  if (tamanoSeleccionado == 8) {
    nivelSeleccionado = "facil";
  } else if (tamanoSeleccionado == 12) {
    nivelSeleccionado = "medio";
  } else {
    nivelSeleccionado = "dificil";
  }
  let numBombas = 1;

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
  let bombPositions = [];

  // Colocar bombas aleatoriamente
  while (bombPositions.length < numBombas) {
    let fila = Math.floor(Math.random() * tamanoSeleccionado);
    let columna = Math.floor(Math.random() * tamanoSeleccionado);
    let posicion = fila + "-" + columna;

    // Verificar si la posición ya tiene una bomba
    if (!bombPositions.includes(posicion)) {
      // Guardar la posición de la bomba en el array
      bombPositions.push(posicion);

      // Aquí podrías actualizar visualmente el tablero para mostrar las bombas, por ejemplo:
      let celda = document.getElementById(fila + "-" + columna);
      celda.className = "bomba"; 
    }
  }
}

function manejarClicDerecho(event) {
  event.preventDefault(); // Evitar que aparezca el menú contextual

  let celda = event.target;

  if (celda.classList.contains("bomba")) {
    if (celda.classList.contains("marcada")) {
      bombasMarcadasCorrectamente--;
    } else {
      bombasMarcadasCorrectamente++;
    }
    console.log(bombasMarcadasCorrectamente);
  }

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

  // Llamar a ganarPartida después de marcar/desmarcar la celda
  ganarPartida();
}
function manejarClicCelda(event) {
  event.preventDefault();
  let boton = document.getElementById("bt_inicio");
  let celda = event.target;

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
    boton.innerHTML="Reiniciar partida";
    revelarBombas();
  } else {
    let idCelda = celda.id.split("-");
    let fila = parseInt(idCelda[0]);
    let columna = parseInt(idCelda[1]);
    destaparCelda(fila, columna);
    ganarPartida();
  }
  
}

function destaparCelda(fila, columna) {

  // Recorrer las celdas adyacentes a la celda clickeada
  for (let i = Math.max(0, fila - 1); i <= Math.min(tamanoSeleccionado - 1, fila + 1); i++) {
    for (let j = Math.max(0, columna - 1); j <= Math.min(tamanoSeleccionado - 1, columna + 1); j++) {
      let celda = document.getElementById(i + "-" + j);

      // Verificar si la celda no ha sido revelada aún y no es una bomba
      if (!celda.classList.contains("revelada") && !celda.classList.contains("bomba")) {
        // Marcar la celda como revelada
        celda.classList.add("revelada");
        
        // Contar el número de bombas adyacentes
        let numBombas = contarBombasAdyacentes(i, j);
        
        // Si la celda no tiene bombas adyacentes, seguir destapando celdas vacías recursivamente
        if (numBombas === 0) 
        {
          destaparCelda(i, j);
        } 
        else {
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
  let count = 0;

  // Recorrer las celdas adyacentes a la celda dada
  for (let i = Math.max(0, fila - 1); i <= Math.min(tamanoSeleccionado - 1, fila + 1); i++) {
    for (let j = Math.max(0, columna - 1); j <= Math.min(tamanoSeleccionado - 1, columna + 1); j++) {
      let celda = document.getElementById(i + "-" + j);
      if (celda.classList.contains("bomba")) {
        count++;
      }
    }
  }

  return count;
}

function inhabilitar(){
  
    for (let i = 0; i < tamanoSeleccionado; i++) {
        for (let j = 0; j < tamanoSeleccionado; j++) {
          let celda = document.getElementById(i + "-" + j);
            celda.classList.add("revelada");
        }
    }
  
  
}

function ganarPartida() {
 
  let numBombas = 0;
  let boton = document.getElementById("bt_inicio");
  // Contar el número total de bombas colocadas
  for (let i = 0; i < tamanoSeleccionado; i++) {
    for (let j = 0; j < tamanoSeleccionado; j++) {
      let celda = document.getElementById(i + "-" + j);
      if (celda.classList.contains("bomba")) {
        numBombas++;
      }
    }
  }

  // Contar el número de celdas no bomba reveladas
  let celdasReveladasNoBombas = 0;
  for (let i = 0; i < tamanoSeleccionado; i++) {
    for (let j = 0; j < tamanoSeleccionado; j++) {
      let celda = document.getElementById(i + "-" + j);
      if (!celda.classList.contains("bomba") && celda.classList.contains("revelada")) {
        celdasReveladasNoBombas++;
      }
    }
  }

  // Verificar si todas las celdas no bomba están reveladas
  if (celdasReveladasNoBombas === (tamanoSeleccionado * tamanoSeleccionado - numBombas)) {
    alert("¡Has ganado!");
    boton.innerHTML = "Reiniciar partida";
    inhabilitar();
  }
}