document.addEventListener("DOMContentLoaded", () => {
    const selectEstudiante = document.getElementById("elegirEstudiantePromedio");
    const btnMostrarPromedio = document.getElementById("btnMostrarPromedio");
    const resultadoPromedio = document.getElementById("promedio");

    // Recuperar los datos de estudiantes desde localStorage
    let listaEstudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

    // Función para llenar el select de estudiantes
    function llenarSelectEstudiantes() {
        selectEstudiante.innerHTML = '<option value="">Seleccione un estudiante</option>';
        
        // Si no hay estudiantes, no hacer nada
        if (listaEstudiantes.length === 0) {
            resultadoPromedio.textContent = "No hay estudiantes registrados.";
            return;
        }

        listaEstudiantes.forEach(estudiante => {
            const option = document.createElement("option");
            option.value = estudiante.id;
            option.textContent = estudiante.nombre;
            selectEstudiante.appendChild(option);
        });
    }

    // Función para calcular el promedio de calificaciones
    function calcularPromedio(estudiante) {
        try {
            // Filtrar notas válidas para el cálculo del promedio
            const notasCalificadas = estudiante.notas.filter(nota => !isNaN(nota.calificacion));

            if (notasCalificadas.length === 0) {
                return "No hay calificaciones registradas para este estudiante.";
            }

            let sum = 0;
            let totalCalificaciones = 0;

            // Sumar todas las calificaciones
            for (const nota of notasCalificadas) {
                sum += nota.calificacion;
                totalCalificaciones++;
            }

            return (sum / totalCalificaciones).toFixed(2);
        } catch (error) {
            console.error(`ERROR: ${error.message}`);
            return "Error al calcular el promedio.";
        }
    }

    // Función para mostrar el promedio
    function mostrarPromedio() {
        const idEstudiante = selectEstudiante.value;

        if (!idEstudiante) {
            resultadoPromedio.textContent = "Por favor, seleccione un estudiante.";
            return;
        }

        const estudiante = listaEstudiantes.find(est => est.id === idEstudiante);

        if (!estudiante) {
            resultadoPromedio.textContent = "Estudiante no encontrado.";
            return;
        }

        // Calcular y mostrar el promedio
        const promedio = calcularPromedio(estudiante);
        resultadoPromedio.textContent = `El promedio del estudiante ${estudiante.nombre} es: ${promedio}`;
    }

    // Evento al hacer clic en el botón "Mostrar Promedio"
    btnMostrarPromedio.addEventListener("click", mostrarPromedio);

    // Llenar el select de estudiantes al cargar la página
    llenarSelectEstudiantes();
});
