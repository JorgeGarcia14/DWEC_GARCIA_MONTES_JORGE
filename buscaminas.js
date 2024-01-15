window.addEventListener("load", inicio);

function inicio(){
  var botonInicio = document.getElementById("bt_inicio");
  botonInicio.addEventListener("click", iniciarJuego);
}

function crearTablero(){
  //DUDA PARA JUANJO, QUE LAS BOMBAS SE CREEN AL INICIAR JUEGO O QUE SE DISTRIBUYAN AL DAR EL PRIMER CLICK?
}


function iniciarJuego() {
    // Obtener el tamaño seleccionado
    var tamanoSeleccionado = document.getElementById("tamanoTablero").value;
  
    // Crear el tablero
    var tablero = document.getElementById("tableroJuego");
    tablero.innerHTML = ''; // Limpiar el tablero antes de crear uno nuevo
  
    var tabla = document.createElement("table");
    for (var i = 0; i < tamanoSeleccionado; i++) {
      
        var fila = document.createElement("tr");
        fila.id=i;
        for (var j = 0; j < tamanoSeleccionado; j++) {
        var celda = document.createElement("td");
        celda.id=j;
        fila.appendChild(celda);
      }
      tabla.appendChild(fila);
    }
  
    tablero.appendChild(tabla);
  }
  
