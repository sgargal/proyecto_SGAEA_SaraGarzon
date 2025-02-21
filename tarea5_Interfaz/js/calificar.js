document.addEventListener("DOMContentLoaded", () => {
    const selectEstudiante = document.getElementById("elegirEstudiante");
    const selectAsignatura = document.getElementById("elegirAsignatura");
    const inputCalificacion = document.getElementById("calificacion");
    const botonCalificar = document.getElementById("calificarBoton");

    // Recuperar los datos de localStorage
    let listaEstudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
    
    // Función para llenar el select de estudiantes
    function llenarSelectEstudiantes() {
        selectEstudiante.innerHTML = '<option value="">Seleccione un estudiante</option>';
        listaEstudiantes.forEach(estudiante => {
            const option = document.createElement("option");
            option.value = estudiante.id;
            option.textContent = estudiante.nombre;
            selectEstudiante.appendChild(option);
        });
    }

    // Función para llenar el select de asignaturas del estudiante seleccionado
    function llenarSelectAsignaturas() {
        selectAsignatura.innerHTML = '<option value="">Seleccione una asignatura</option>';
        selectAsignatura.disabled = true;
        inputCalificacion.value = "";
        inputCalificacion.disabled = true;
        botonCalificar.disabled = true;

        const idEstudiante = selectEstudiante.value;
        if (!idEstudiante) return;

        const estudiante = listaEstudiantes.find(est => est.id === idEstudiante);
        if (!estudiante || !estudiante.asignaturas || estudiante.asignaturas.length === 0) {
            selectAsignatura.innerHTML = '<option value="">Este estudiante no tiene asignaturas</option>';
            return;
        }

        estudiante.asignaturas.forEach(asignatura => {
            const option = document.createElement("option");
            option.value = asignatura;
            option.textContent = asignatura;
            selectAsignatura.appendChild(option);
        });

        selectAsignatura.disabled = false;
    }

    // Función para calificar a un estudiante
    function calificarEstudiante() {
        const idEstudiante = selectEstudiante.value;
        const nombreAsignatura = selectAsignatura.value;
        const calificacion = parseFloat(inputCalificacion.value);

        if (!idEstudiante || !nombreAsignatura || isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
            alert("Debe seleccionar un estudiante, una asignatura y una calificación válida entre 0 y 10.");
            return;
        }

        const estudiante = listaEstudiantes.find(est => est.id === idEstudiante);
        if (!estudiante) {
            alert("Estudiante no encontrado.");
            return;
        }

        // Asegurar que el estudiante tenga una lista de notas
        if (!Array.isArray(estudiante.notas)) {
            estudiante.notas = [];
        }

        // Verificar si ya tiene una calificación en esta asignatura y actualizarla
        const indiceNota = estudiante.notas.findIndex(nota => nota.asignatura === nombreAsignatura);
        if (indiceNota !== -1) {
            estudiante.notas[indiceNota].calificacion = calificacion;
            estudiante.notas[indiceNota].fecha = new Date().toLocaleDateString("es-ES");
        } else {
            // Agregar nueva calificación
            estudiante.notas.push({
                asignatura: nombreAsignatura,
                calificacion: calificacion,
                fecha: new Date().toLocaleDateString("es-ES")
            });
        }

        // Guardar cambios en localStorage
        localStorage.setItem("estudiantes", JSON.stringify(listaEstudiantes));

        alert(`El estudiante ${estudiante.nombre} ha sido calificado con ${calificacion} en ${nombreAsignatura}`);

        selectEstudiante.value = "";
        selectAsignatura.innerHTML = '<option value="">Seleccione una asignatura</option>';
        selectAsignatura.disabled = true;
        inputCalificacion.value = "";
        inputCalificacion.disabled = true;
        botonCalificar.disabled = true;
    }

    // Eventos
    selectEstudiante.addEventListener("change", () => {
        llenarSelectAsignaturas();
        inputCalificacion.disabled = true;
        botonCalificar.disabled = true;
    });

    selectAsignatura.addEventListener("change", () => {
        inputCalificacion.disabled = false;
        botonCalificar.disabled = false;
    });

    botonCalificar.addEventListener("click", calificarEstudiante);

    // Llenar el select de estudiantes al cargar la página
    llenarSelectEstudiantes();


});
