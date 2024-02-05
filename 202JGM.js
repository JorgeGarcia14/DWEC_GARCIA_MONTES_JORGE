window.addEventListener("load", inicio);

        function inicio() {
            document.getElementById("mensaje").addEventListener("input", contadorCaracteres);
            document.getElementById("seleccionarTodos").addEventListener("change", seleccionarTodo);
            document.getElementById("añadirCurso").addEventListener("click", añadirCurso);
            let checkboxes = document.querySelectorAll("input[type='checkbox']");
            checkboxes.forEach(function (checkbox) {
                checkbox.addEventListener("change", validacionCheckbox);
            });
            document.getElementById("botonGoogle").addEventListener("click", function () { window.location.href = "https://www.google.com"; });
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