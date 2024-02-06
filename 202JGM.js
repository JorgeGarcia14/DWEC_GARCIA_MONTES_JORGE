window.addEventListener("load", inicio);

        function inicio() {
            
            document.getElementById("mensaje").addEventListener("input", contadorCaracteres);

            document.getElementById("seleccionarTodos").addEventListener("change", seleccionarTodo);

            document.getElementById("añadirCurso").addEventListener("click", añadirCurso);

            let checkboxes = document.querySelectorAll("input[type='checkbox']");

            checkboxes.forEach(function (checkbox) {
                checkbox.addEventListener("change", validacionCheckbox);
            });

            document.getElementById("botonGoogle").addEventListener("click", function () 
            { 
                window.location.href = "https://www.google.com"; 
            });

            document.getElementById('dni').addEventListener('input', function() {
                var dni = this.value; // Obtener el valor del campo de entrada del DNI
                var valido = validarDNI(dni); // Validar el DNI
                
                if (valido) {
                    document.getElementById("validoDNI").innerHTML ="DNI válido";
                    document.getElementById("errorDNI").innerHTML ="";
                    // Aquí puedes realizar cualquier acción adicional si el DNI es válido
                } else {
                    document.getElementById("errorDNI").innerHTML ="DNI no válido";
                    document.getElementById("validoDNI").innerHTML ="";
                    // Aquí puedes realizar cualquier acción adicional si el DNI es inválido
                }
            });

            document.getElementById('nombre').addEventListener('input', function() {
                if (this.checkValidity()) {
                  document.getElementById("validoNombre").innerHTML="Nombre válido";
                  document.getElementById("errorNombre").innerHTML="";
                } else {
                    document.getElementById("validoNombre").innerHTML="";
                    document.getElementById("errorNombre").innerHTML="Nombre no válido";
                }
              });
            
              document.getElementById('fechaMatriculacionDia').addEventListener('input', validarFecha);
              document.getElementById('fechaMatriculacionMes').addEventListener('input', validarFecha);
              document.getElementById('fechaMatriculacionAnio').addEventListener('input', validarFecha);
          }
            
        

        function validarFecha() {
            var dia = document.getElementById('fechaMatriculacionDia');
            var mes =  document.getElementById('fechaMatriculacionMes');
            var año = document.getElementById('fechaMatriculacionAnio');
        
            // Verificar si los valores son válidos según los patrones
            if (dia.checkValidity()) {
              document.getElementById("validoDia").innerHTML = "Dia válido";
              document.getElementById("errorDia").innerHTML = "";
              // Aquí puedes realizar cualquier acción adicional si la fecha es válida
            } else {
                document.getElementById("errorDia").innerHTML = "Dia no válido";
                document.getElementById("validoDia").innerHTML = "";
              // Aquí puedes realizar cualquier acción adicional si la fecha es inválida
            }
            if (mes.checkValidity()) {
                document.getElementById("validoMes").innerHTML = "Mes válido";
                document.getElementById("errorMes").innerHTML = "";
                // Aquí puedes realizar cualquier acción adicional si la fecha es válida
              } else {
                  document.getElementById("errorMes").innerHTML = "Mes no válido";
                  document.getElementById("validoMes").innerHTML = "";
                // Aquí puedes realizar cualquier acción adicional si la fecha es inválida
              }
              if (año.checkValidity()) {
                document.getElementById("validoAño").innerHTML = "Año válido";
                document.getElementById("errorAño").innerHTML = "";
                // Aquí puedes realizar cualquier acción adicional si la fecha es válida
              } else {
                  document.getElementById("errorAño").innerHTML = "Año no válido";
                  document.getElementById("validoAño").innerHTML = "";
                // Aquí puedes realizar cualquier acción adicional si la fecha es inválida
              }
          }

        function validarDNI(dni) {
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


        function validacionCheckbox() {
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



        function contadorCaracteres() {
            let mensaje = document.getElementById("mensaje");
            let contador = document.getElementById("contador");
            const longitudMax = mensaje.getAttribute("maxlength");
            contador.innerHTML = `Caracteres restantes: ${longitudMax - mensaje.value.length}`;
            if (mensaje.value.length == 0) {
                contador.innerHTML = "";
            }
        }