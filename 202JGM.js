window.addEventListener("load", inicio);

        function inicio() {

            document.getElementById("miForm").addEventListener("submit", validar); //FORMULARIO

            document.getElementById("nombre").addEventListener("input", validarNombre); //NOMBRE

            document.getElementById("dni").addEventListener('input', validarDNI);
            
            let arrayFechas = document.querySelectorAll("input[name='fecha']");
            arrayFechas.forEach(function (fecha){
                fecha.addEventListener("input", validarFecha)
            }); // FECHA

            document.getElementById("mensaje").addEventListener("input", validarMensaje);

            document.getElementById("seleccionarTodos").addEventListener("change", seleccionarTodo);

            document.getElementById("añadirCurso").addEventListener("click", añadirCurso);

            let checkboxes = document.querySelectorAll("input[type='checkbox']");

            checkboxes.forEach(function (checkbox) {
                checkbox.addEventListener("change", validarCheckbox);
            });

            document.getElementById("botonGoogle").addEventListener("click", irAGoogle);

        }
            
        function validar(){
            if(validarDNI(document.getElementById("dni")) && validarFecha() && validacionCheckbox() && validarNombre() && validarMensaje()){
                alert("Formulario enviado con exito");
            }
            else{
                alert("Formulario no enviado, contiene errores");
            }
        }

        function validarDNI(){
            var dni = document.getElementById("dni").value; // Obtener el valor del campo de entrada del DNI
            var valido = comprobarDNI(dni); // Validar el DNI
            
            if (valido) {
                document.getElementById("validoDNI").innerHTML ="DNI válido";
                document.getElementById("errorDNI").innerHTML ="";
                return true;
                // Aquí puedes realizar cualquier acción adicional si el DNI es válido
            } else {
                document.getElementById("errorDNI").innerHTML ="DNI no válido";
                document.getElementById("validoDNI").innerHTML ="";
                return false;
                // Aquí puedes realizar cualquier acción adicional si el DNI es inválido
            }
        }

        function validarFecha() {
            var dia = document.getElementById('fechaMatriculacionDia');
            var mes =  document.getElementById('fechaMatriculacionMes');
            var año = document.getElementById('fechaMatriculacionAnio');
        
            // Verificar si los valores son válidos según los patrones
            if (dia.checkValidity() && mes.checkValidity() && año.checkValidity()) {
              document.getElementById("validoFecha").innerHTML = "Fecha correcta";
              document.getElementById("errorFecha").innerHTML = "";
              return true;
          }
          else{
            document.getElementById("validoFecha").innerHTML = "";
            document.getElementById("errorFecha").innerHTML = "Fecha incorrecta";
            return false;
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

        function validarCheckbox() {
            let arrayDias = document.querySelectorAll("input[type=checkbox]");
            let mensajeErrorCheckbox = document.getElementById("mensajeErrCheckbox");
            let checkboxesMarcados = 0;

            for (let i = 0; i < arrayDias.length; i++) {
                if (arrayDias[i].checked) {
                    checkboxesMarcados++;
                }
            }

            if (checkboxesMarcados < 2) {
                mensajeErrorCheckbox.innerHTML = "Debes marcar al menos dos opciones";
            } else {
                mensajeErrorCheckbox.innerHTML = "";
            }
        }

        function validarNombre(){
            document.getElementById('nombre').addEventListener('input', function() {
                if (this.checkValidity()) {
                  document.getElementById("validoNombre").innerHTML="Nombre válido";
                  document.getElementById("errorNombre").innerHTML="";
                  return true;
                } else {
                    document.getElementById("validoNombre").innerHTML="";
                    document.getElementById("errorNombre").innerHTML="Nombre no válido";
                    return false;
                }
              });
        }

        function añadirCurso() {

            let nuevoCursoInput = document.getElementById("nuevoCursoAcademico");
            let nuevoCursoValue = nuevoCursoInput.value.trim();

            if (nuevoCursoValue !== "") {
                let cursosSelect = document.getElementById("cursosAcademicos");

                // Crear una nueva opción
                let nuevaOpcion = document.createElement("option");
                nuevaOpcion.value = nuevoCursoValue;
                nuevaOpcion.text = nuevoCursoValue;

                // Añadir la nueva opción al select
                cursosSelect.add(nuevaOpcion);

                // Ordenar las opciones del select
                ordenarCursos(cursosSelect);

                // Limpiar el campo de texto
                nuevoCursoInput.value = "";
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

        function validarMensaje() {
            let mensaje = document.getElementById("mensaje");
            let contador = document.getElementById("contador");
            let mensajeError = document.getElementById("errorMensaje");
            const longitudMax = mensaje.getAttribute("maxlength");

            if(!mensaje.checkValidity()){
                mensajeError.innerHTML="Mensaje no valido";
                contador.innerHTML="";
                return false;
            }
            else{
               contador.innerHTML = `Caracteres restantes: ${longitudMax - mensaje.value.length}`;
                mensajeError.innerHTML="";
                return true;
            }
            
        }

        function irAGoogle(){
            window.location.href = "https://www.google.com"; 
        }