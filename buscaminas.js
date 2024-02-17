window.addEventListener("load", inicio);

let bombasMarcadasCorrectamente = 0; // Variable para almacenar la cantidad de bombas marcadas correctamente

let celdaReveladas = 0;// Variable para contar el número de celdas reveladas

let botonInicio = document.getElementById("bt_inicio"); // Seleccionar el botón de inicio del juego

let intervaloCronometro;// Variable para almacenar el identificador del intervalo del cronómetro

let contadorFormateado;// Variable para almacenar el contador de tiempo formateado

let juegoIniciado = false;// Variable para seguir el estado del juego (si está iniciado o no)

//Funcion para iniciar la partida
function inicio() {
  botonInicio.addEventListener("click", function() {
    if (juegoIniciado) {
      // Si el juego ya está en curso, reinicia el contador y el juego
      reiniciarJuego();
    } else {
      // Si el juego aún no ha comenzado, inicia el juego
      iniciarJuego();
      juegoIniciado = true;
    }
  });
}


//Funcion para que cuando se le da muchas veces al boton de iniciar el contador no se lie

function reiniciarJuego() {
  // Detener el cronómetro y restablecer el contador
  pararCronometro();
  cronometro();
  // Restablecer el juego
  bombasMarcadasCorrectamente = 0;
  celdaReveladas = 0;
  botonInicio.innerHTML = "Iniciar juego";
  crearTablero();
  colocarBombas();
  asignarEventosCeldas();
  ganarPartida();
}
function iniciarJuego() {
  bombasMarcadasCorrectamente = 0;
  celdaReveladas =0;
  botonInicio.innerHTML="Iniciar juego";
  crearTablero();
  colocarBombas();
  cronometro();
  asignarEventosCeldas();
  ganarPartida();
  
}

function cronometro() {
  let contador = 0;
  document.getElementById("cronometro").innerHTML="Contador: 000" ;
  intervaloCronometro = setInterval(function() {
    contador++;
    if (contador > 999) {
      contador = 0;
    }
    // Formatear el contador a 3 dígitos (agregando ceros a la izquierda si es necesario)
    contadorFormateado = contador.toString().padStart(3, '0');
    // Actualizar el contenido del elemento HTML con el contador
    // Suponiendo que tienes un elemento con id "contador" donde mostrar el tiempo
    document.getElementById('cronometro').innerHTML = "Contador: " + contadorFormateado;
  }, 1000); // El intervalo se ejecuta cada segundo (1000 milisegundos)
}

function pararCronometro(){
  clearInterval(intervaloCronometro);
}

function asignarEventosCeldas() {
  let tamanoSeleccionado = document.getElementById("tamanoTablero").value;
  for (let i = 0; i < tamanoSeleccionado; i++) {
      for (let j = 0; j < tamanoSeleccionado; j++) {
          let celda = document.getElementById(i + "-" + j);
          celda.addEventListener("click", manejarClicCelda);
          celda.addEventListener("contextmenu", manejarClicDerecho)
      }
  }
}

function revelarBombas(){
  
  let tamanoSeleccionado = document.getElementById("tamanoTablero").value;
  for (let i = 0; i < tamanoSeleccionado; i++) {
      for (let j = 0; j < tamanoSeleccionado; j++) {
          let celda = document.getElementById(i + "-" + j);
          if(celda.classList.contains("bomba") && !celda.classList.contains("marcada")){
            celda.innerHTML = "💣";
            celda.classList.add("bloqueadaBomba"); 
          }
          celda.classList.add("bloqueada");
      }
  }
  pararCronometro();

}

function crearTablero() {
  let tamanoSeleccionado = document.getElementById("tamanoTablero").value;
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
  let tamanoSeleccionado = document.getElementById("tamanoTablero").value;
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

  if (celda.classList.contains("bloqueada")) {
    return; // No hacer nada si la celda ya ha sido revelada
  }
  if (celda.classList.contains("bloqueadaBomba")) {
    return; // No hacer nada si la celda ya ha sido revelada
  }
  if (celda.classList.contains("revelada")){
    return;
  }

  // Cambiar el estado de la celda entre marcada y no marcada (para simular la bandera)
  if (celda.classList.contains("marcada")) {
    celda.classList.remove("marcada");
    celda.classList.remove("revelada");
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

  if (celda.classList.contains("bloqueada")) {
    return; // No hacer nada si la celda ya ha sido bloqueada
  }

  if (celda.classList.contains("bloqueadaBomba")) {
    return; // No hacer nada si la celda ya ha sido bloqueada
  }

  // Lógica para revelar el contenido de la celda
  if (celda.classList.contains("bomba")) {
    alert("¡Has encontrado una bomba! Fin de la partida / Tiempo: " + contadorFormateado);
    pararCronometro();
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
  let tamanoSeleccionado = document.getElementById("tamanoTablero").value;
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
  let tamanoSeleccionado = document.getElementById("tamanoTablero").value;
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
  let tamanoSeleccionado = document.getElementById("tamanoTablero").value;
    for (let i = 0; i < tamanoSeleccionado; i++) {
        for (let j = 0; j < tamanoSeleccionado; j++) {
          let celda = document.getElementById(i + "-" + j);
            celda.classList.add("revelada");
        }
    }
  
  
}

function ganarPartida() {
  let tamanoSeleccionado = document.getElementById("tamanoTablero").value;
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
    alert("¡Has ganado en " + contadorFormateado + " segundos!");
    pararCronometro();
    boton.innerHTML = "Reiniciar partida";
    inhabilitar();
  }
}