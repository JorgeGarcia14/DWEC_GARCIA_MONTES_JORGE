window.addEventListener("load", inicio);

        function inicio() {

            document.getElementById("miForm").addEventListener("submit", validar); // FORMULARIO

            document.getElementById("nombre").addEventListener("input", validarNombre); // NOMBRE

            document.getElementById("dni").addEventListener('input', validarDNI); // DNI
            
            document.getElementById("nuevoCursoAcademico").addEventListener("input", function() {
                let nuevoCursoValue = this.value.trim(); // Obtener el valor del campo de entrada y eliminar espacios en blanco
                validarCurso(nuevoCursoValue); // Llamar a la función validarCurso con el valor del campo de entrada
            });

            let arrayFechas = document.querySelectorAll("input[name='fecha']");
            arrayFechas.forEach(function (fecha){
                fecha.addEventListener("input", validarFecha)
            }); // FECHA

            document.getElementById("mensaje").addEventListener("input", validarMensaje); // MENSAJE

            document.getElementById("seleccionarTodos").addEventListener("change", seleccionarTodo); //SELECCIONAR TODOS

            document.getElementById("añadirCurso").addEventListener("click", añadirCurso); // AÑADIR CURSOS

            let checkboxes = document.querySelectorAll("input[type='checkbox']"); 

            checkboxes.forEach(function (checkbox) {
                checkbox.addEventListener("change", validarCheckbox);
            }); // CHECKBOX VALIDACION

            document.getElementById("botonGoogle").addEventListener("click", irAGoogle); //IR A GOOGLE

            document.getElementById("reinicio").addEventListener("click", reiniciarForm); // RESET FORMULARIO

        }


function validar(event) {
    

    let dniValido = validarDNI(); // Validar el DNI
    let fechaValida = validarFecha(); // Validar la fecha
    let checkboxValido = validarCheckbox(); // Validar los checkboxes
    let nombreValido = validarNombre(); // Validar el nombre
    let mensajeValido = validarMensaje(); // Validar el mensaje

    if (dniValido && fechaValida && checkboxValido && nombreValido && mensajeValido) {
        alert("Formulario enviado con éxito");
    } else {
        event.preventDefault(); // Evitar el reinicio del formulario por defecto
        alert("Formulario no enviado, contiene errores");
    }
}

function comprobarDNI(dni) {
    var numero;
    var letra;
    var letraCorrecta;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni = dni.toUpperCase(); // Aseguramos que el DNI esté en mayúsculas

    if(expresion_regular_dni.test(dni) === true) {
        numero = dni.substr(0, dni.length-1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        letra = dni.substr(dni.length-1, 1);
        numero = numero % 23;
        letraCorrecta = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letraCorrecta = letraCorrecta.substring(numero, numero+1);
        return letraCorrecta === letra; // Devolvemos directamente el resultado de la comparación
    } else {
        return false;
    }
}


function validarDNI() {
    var dni = document.getElementById("dni").value; // Obtener el valor del campo de entrada del DNI
    var valido = comprobarDNI(dni); // Validar el DNI
    
    if (valido) {
        document.getElementById("validoDNI").innerHTML ="DNI válido";
        document.getElementById("errorDNI").innerHTML ="";
    } else {
        document.getElementById("errorDNI").innerHTML ="DNI no válido";
        document.getElementById("validoDNI").innerHTML ="";
    }

    return valido; // Devolver el resultado de la validación
}

function validarFecha() {
    var dia = document.getElementById('fechaMatriculacionDia');
    var mes =  document.getElementById('fechaMatriculacionMes');
    var año = document.getElementById('fechaMatriculacionAnio');
    
    // Verificar si los valores son válidos según los patrones
    var fechaValida = dia.checkValidity() && mes.checkValidity() && año.checkValidity();
    
    if (fechaValida) {
        document.getElementById("validoFecha").innerHTML = "Fecha correcta";
        document.getElementById("errorFecha").innerHTML = "";
    } else {
        document.getElementById("validoFecha").innerHTML = "";
        document.getElementById("errorFecha").innerHTML = "Fecha incorrecta";
    }

    return fechaValida; // Devolver el resultado de la validación
}

function seleccionarTodo() {
    let seleccionador = document.getElementById("seleccionarTodos");
    let arrayDias = document.querySelectorAll("input[name=dia]");
    let mensajeSeleccionador = document.getElementById("mensajeSeleccionador");


    if (seleccionador.checked) {
        // Marcar todos los checkboxes
        for (let i = 0; i < arrayDias.length; i++) {
            arrayDias[i].checked = true;
        }
        mensajeSeleccionador.innerHTML = "Deseleccionar todo";
    } else {
        // Desmarcar todos los checkboxes
        for (let i = 0; i < arrayDias.length; i++) {
            arrayDias[i].checked = false;
        }
        mensajeSeleccionador.innerHTML = "Seleccionar todo";
    }

}

// Función para validar los checkboxes
function validarCheckbox() {
    let arrayDias = document.querySelectorAll("input[type=checkbox]"); // Obtener todos los checkboxes
    let mensajeErrorCheckbox = document.getElementById("mensajeErrorCheckbox"); // Elemento para mostrar mensajes de error
    let mensajeValidoCheckbox = document.getElementById("mensajeValidoCheckbox"); // Elemento para mostrar mensajes de validación
    let checkboxesMarcados = 0; // Contador para contar cuántos checkboxes están marcados

    // Iterar sobre todos los checkboxes
    for (let i = 0; i < arrayDias.length; i++) {
        if (arrayDias[i].checked) {
            checkboxesMarcados++; // Incrementar el contador si el checkbox está marcado
        }
    }

    // Verificar si hay al menos dos checkboxes marcados
    if (checkboxesMarcados < 2) {
        mensajeErrorCheckbox.innerHTML = "Debes marcar al menos dos opciones"; // Mostrar mensaje de error si no hay suficientes checkboxes marcados
        mensajeValidoCheckbox.innerHTML = ""; // Limpiar mensaje de validación
        return false; // Devolver false si la validación falla
    } else {
        mensajeValidoCheckbox.innerHTML = "Marcado correctamente"; // Mostrar mensaje de validación si hay suficientes checkboxes marcados
        mensajeErrorCheckbox.innerHTML = ""; // Limpiar mensaje de error
        return true; // Devolver true si la validación es exitosa
    }
}

// Función para validar el campo de entrada del nombre
function validarNombre() {
    let nombreInput = document.getElementById('nombre'); // Obtener el campo de entrada del nombre
    let nombreValido = nombreInput.checkValidity(); // Verificar la validez del nombre utilizando las validaciones nativas del navegador
    
    // Mostrar mensajes de error o validación dependiendo del resultado de la validación
    if (nombreValido) {
        document.getElementById("validoNombre").innerHTML = "Nombre válido"; // Mostrar mensaje de validación si el nombre es válido
        document.getElementById("errorNombre").innerHTML = ""; // Limpiar mensaje de error
    } else {
        document.getElementById("validoNombre").innerHTML = ""; // Limpiar mensaje de validación
        document.getElementById("errorNombre").innerHTML = "Nombre no válido"; // Mostrar mensaje de error si el nombre no es válido
    }

    return nombreValido; // Devolver el resultado de la validación
}

// Función para validar el campo de entrada del mensaje
function validarMensaje() {
    let mensaje = document.getElementById("mensaje"); // Obtener el campo de entrada del mensaje
    let contador = document.getElementById("contador"); // Elemento para mostrar el contador de caracteres restantes
    let mensajeError = document.getElementById("errorMensaje"); // Elemento para mostrar mensajes de error
    const longitudMax = mensaje.getAttribute("maxlength"); // Obtener la longitud máxima permitida del mensaje
    let mensajeValido = mensaje.checkValidity(); // Verificar la validez del mensaje utilizando las validaciones nativas del navegador

    // Mostrar mensajes de error o validación dependiendo del resultado de la validación
    if (!mensajeValido) {
        mensajeError.innerHTML = "Mensaje no válido"; // Mostrar mensaje de error si el mensaje no es válido
        contador.innerHTML = ""; // Limpiar contador de caracteres restantes
    } else {
        contador.innerHTML = `Caracteres restantes: ${longitudMax - mensaje.value.length}`; // Mostrar contador de caracteres restantes
        mensajeError.innerHTML = ""; // Limpiar mensaje de error
    }

    return mensajeValido; // Devolver el resultado de la validación
}

function validarCurso(nuevoCursoValue) {
    let mensajeErrorAñadirCurso = document.getElementById("mensajeErrorAñadirCurso");
    let mensajeValidoAñadirCurso = document.getElementById("mensajeValidoAñadirCurso");
    let cursosSelect = document.getElementById("cursosAcademicos");
    let opcionesExistentes = cursosSelect.options;

    // Verificar si el formato del nuevo curso es válido
    let formatoValido = /^(\d{2}-\d{2})$/.test(nuevoCursoValue); 

    if (formatoValido) {
        // Obtener el año más pequeño y el más grande del rango
        let [inicio, fin] = nuevoCursoValue.split('-').map(Number);
        
        // Verificar si hay una diferencia de un año entre el curso más pequeño y el más grande
        let diferenciaValida = fin - inicio === 1;

        if (diferenciaValida) {
            // Verificar si el curso ya existe en la lista
            for (let i = 0; i < opcionesExistentes.length; i++) {
                if (opcionesExistentes[i].value === nuevoCursoValue) {
                    mensajeErrorAñadirCurso.innerHTML = "El curso ya existe en la lista.";
                    mensajeValidoAñadirCurso.innerHTML = "";
                    return false;
                }
            }

            // Limpiar mensajes de error y de validación
            mensajeErrorAñadirCurso.innerHTML = "";
            mensajeValidoAñadirCurso.innerHTML = "Formato correcto";
            return true; // Devolver true si la validación es exitosa
        } else {
            mensajeErrorAñadirCurso.innerHTML = "El rango de cursos debe tener una diferencia de un año";
            mensajeValidoAñadirCurso.innerHTML = "";
        }
    } else {
        mensajeErrorAñadirCurso.innerHTML= "El formato del curso académico no es válido. Debe ser en el formato 'YY-YY'";
        mensajeValidoAñadirCurso.innerHTML = "";
    }
    return false; // Devolver false si la validación falla
}

function añadirCurso() {
    let mensajeErrorAñadirCurso = document.getElementById("mensajeErrorAñadirCurso");
    let mensajeValidoAñadirCurso = document.getElementById("mensajeValidoAñadirCurso");
    let nuevoCursoInput = document.getElementById("nuevoCursoAcademico");
    let nuevoCursoValue = nuevoCursoInput.value.trim(); // Se quitan espacios con trim para que no falle si se pone 19-20*espacio*
    
    if (validarCurso(nuevoCursoValue)) {
        let cursosSelect = document.getElementById("cursosAcademicos");
        
        let nuevaOpcion = document.createElement("option");
        nuevaOpcion.value = nuevoCursoValue;
        nuevaOpcion.text = nuevoCursoValue;

        cursosSelect.add(nuevaOpcion);
        ordenarCursos(cursosSelect);
        nuevoCursoInput.value = "";
        mensajeErrorAñadirCurso.innerHTML = "";
        mensajeValidoAñadirCurso.innerHTML = "";
    }
}

function ordenarCursos(selectElement) {
    let opciones = Array.from(selectElement.options);

    opciones.sort((a, b) => a.value.localeCompare(b.value));

    // Limpiar el select
    while (selectElement.options.length > 0) {
        selectElement.options.remove(0);
    }

    // Añadir las opciones ordenadas de nuevo al select
    opciones.forEach(opcion => {
        selectElement.add(opcion);
    });
    
}
function irAGoogle(){
    window.location.href = "https://www.google.com"; 
}

function reiniciarForm(){

    let mensajesError = document.querySelectorAll(".error"); //METEMOS EN ARRAY TODOS LSO ELEMENTOS CON CLASS = ERROR
    
    mensajesError.forEach(mensaje => { //RECORREMOS TODOS Y LOS PONEMOS VACIOS PARA QUE AL REINICIAR NO SE QUEDEN
        mensaje.innerHTML = "";
    });

    let mensajesValido = document.querySelectorAll(".valido"); //METEMOS EN ARRAY TODOS LSO ELEMENTOS CON CLASS = VALIDO
    mensajesValido.forEach(mensaje => {
        mensaje.innerHTML = "";
    });
}