window.onload = iniciar;

function iniciar() {
    document.getElementById("enviar").addEventListener("click", validar, false);
    document.getElementById("borrar").addEventListener("click", borrarTodo);
}
function borrarTodo(){
   document.getElementById("mensajeError").textContent="";
   document.getElementById("error").style.border = "2px solid black";
}

function validarNombre() {
    var elemento = document.getElementById("nombre");
    if (!elemento.checkValidity()) {
        if(elemento.validity.valueMissing){
            error2(elemento, "El " + elemento.id + " no puede estar vacío") 
        }
        if (elemento.validity.patternMismatch){
            error2(elemento, "El " + elemento.id + " debe contener entre 2 y 15 caracteres")
        }
       
        return false;
    }
    borrarError();
    return true;
}

function validarTelefono() {
    var elemento = document.getElementById("telefono");
    if (!elemento.checkValidity()) {
        if(elemento.validity.valueMissing){
            error2(elemento, "El " + elemento.id + " no puede estar vacío") 
        }
        if (elemento.validity.patternMismatch){
            error2(elemento, "El " + elemento.id + " debe contener entre 9 digitos")
        }
        
        return false;
    }
    borrarError();
    return true;
}

function validarEdad() {
    var elemento = document.getElementById("edad");
    if (!elemento.checkValidity()) {
        if(elemento.validity.valueMissing){
            error2(elemento, "El " + elemento.id + " no puede estar vacío") 
        }
        if (elemento.validity.rangeOverflow){
            error2(elemento, "El " + elemento.id + " debe ser menor de 100 años")
        }
        if (elemento.validity.rangeUnderflow){
            error2(elemento, "El " + elemento.id + " debe ser mayor de 18 años")
        }
        return false;
    }
    borrarError();
    return true;
}

function validar(e) {
    if (validarNombre() && validarEdad() && validarTelefono() && confirm("¿Estás seguro que quieres enviar el formulario?")) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

function borrarError(){
    var formulario = document.forms[0];
    for (let i =0; i< formulario.length; i++){
        formulario.elements[i].className="";
    }
}

function error2(elemento, mensaje){
    document.getElementById("mensajeError").innerHTML = mensaje;
    elemento.className = "error";
    elemento.focus();
}