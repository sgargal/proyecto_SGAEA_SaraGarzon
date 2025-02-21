document.addEventListener("DOMContentLoaded", () => {
    // Recuperar los estudiantes y asignaturas desde localStorage
    let listaEstudiantes = JSON.parse(localStorage.getItem("estudiantes"));

    const listaAsignaturas = JSON.parse(localStorage.getItem("asignaturas"));

    // Función para llenar el select de estudiantes
    function llenarSelectEstudiantes() {
        const selectEstudiante = document.getElementById("elegirEstudiante");
        selectEstudiante.innerHTML = '<option value="">Seleccione un estudiante</option>';  // Limpiar opciones

        listaEstudiantes.forEach(estudiante => {
            const option = document.createElement("option");
            option.value = estudiante.id;
            option.textContent = estudiante.nombre;
            selectEstudiante.appendChild(option);
        });
    }

    // Función para llenar el select de asignaturas
    function llenarSelectAsignaturas() {
        const selectAsignatura = document.getElementById("elegirAsignatura");
        selectAsignatura.innerHTML = '<option value="">Seleccione una asignatura</option>';  // Limpiar opciones
    
        // Acceder correctamente a la propiedad 'nombre' de las asignaturas
        listaAsignaturas.forEach(asignatura => {
            const option = document.createElement("option");
            option.value = asignatura.nombre;  // Cambiar 'nombreAsignatura' por 'nombre'
            option.textContent = asignatura.nombre;  // Cambiar 'nombreAsignatura' por 'nombre'
            selectAsignatura.appendChild(option);
        });
    }

    // Función para matricular al estudiante en la asignatura
    function matricularEstudiante(idEstudiante, nombreAsignatura) {
        const estudiante = listaEstudiantes.find(est => est.id === idEstudiante);
    
        if (!estudiante) {
            alert("Estudiante no encontrado");
            return;
        }
    
        if (!Array.isArray(estudiante.asignaturas)) {
            estudiante.asignaturas = [];
        }
    
        if (!Array.isArray(estudiante.historial)) {
            estudiante.historial = [];
        }
    
        // Verificar si ya está matriculado
        if (estudiante.asignaturas.includes(nombreAsignatura)) {
            alert("El estudiante ya está matriculado en esta asignatura.");
            return;
        }
    
        // Agregar la asignatura al estudiante
        estudiante.asignaturas.push(nombreAsignatura);
    
        // Agregar un registro en el historial
        const fechaMatricula = new Date().toLocaleDateString("es-ES", { dateStyle: "long" });
        estudiante.historial.push(`Matriculación en ${nombreAsignatura} el ${fechaMatricula}`);
    
        // Guardar en localStorage
        localStorage.setItem("estudiantes", JSON.stringify(listaEstudiantes));
    
        return `El estudiante ${estudiante.nombre} ha sido matriculado en ${nombreAsignatura}`;
    }
    

    // Llenar los selects al cargar la página
    llenarSelectEstudiantes();
    llenarSelectAsignaturas();

    document.getElementById('matricularBoton').addEventListener('click', () => {
        const estudianteSelect = document.getElementById('elegirEstudiante');
        const asignaturaSelect = document.getElementById('elegirAsignatura');

        const idEstudiante = estudianteSelect.value;
        const nombreAsignatura = asignaturaSelect.value;

        if (!idEstudiante || !nombreAsignatura) {
            alert("Por favor, seleccione un estudiante y una asignatura");
            return;
        }

        // Realizar la matriculación
        const matriculado = matricularEstudiante(idEstudiante, nombreAsignatura);

        if (matriculado) {
            alert(matriculado);  // Confirmación de matrícula
        }
    });
});