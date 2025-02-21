console.log("Archivo JS cargado correctamente");
// DESMATRICULAR
document.addEventListener("DOMContentLoaded", () => {
    const selectEstudiante = document.getElementById("elegirEstudianteDesmatricular");
    const selectAsignatura = document.getElementById("elegirAsignaturaDesmatricular");
    const botonDesmatricular = document.getElementById("desmatricularBoton");

    if(!selectEstudiante){
        console.warn("Advertencia: este script no esta diseñado para esta pagina");
        return;
    }
    
    if(!selectEstudiante){
        console.warn("El elemento #elegirEstudianteDesmatricular no se encontró en el DOM");
        return;
    }
    // Asegúrate de que los datos están correctamente almacenados en localStorage
    const listaEstudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [
        {id:'123E', nombre: 'Sara Garzón', asignaturas: ['DWEC', 'DWES']},
        {id: '124E', nombre: 'Juan García', asignaturas: ['DWEC']},
        {id: '125E', nombre: 'Adrián Martín', asignaturas: ['DIW']}
    ];

    // Llenar el select de estudiantes
    function llenarSelectEstudiantes() {
        selectEstudiante.innerHTML = '<option value="">Seleccione un estudiante</option>';
        listaEstudiantes.forEach(estudiante => {
            const option = document.createElement("option");
            option.value = estudiante.id;
            option.textContent = estudiante.nombre;
            selectEstudiante.appendChild(option);
        });
    }

    // Llenar el select de asignaturas según el estudiante seleccionado
    function llenarSelectAsignaturas() {
        selectAsignatura.innerHTML = '<option value="">Seleccione una asignatura</option>';
        selectAsignatura.disabled = true;  // Deshabilitar por defecto

        const idEstudiante = selectEstudiante.value;
        if (!idEstudiante) {
            return;  // Si no hay estudiante seleccionado, no hace nada
        }

        const estudiante = listaEstudiantes.find(est => est.id === idEstudiante);
        if (!estudiante || estudiante.asignaturas.length === 0) {
            selectAsignatura.innerHTML = '<option value="">Este estudiante no tiene asignaturas</option>';
            selectAsignatura.disabled = true;  // Deshabilitar si no tiene asignaturas
            return;
        }

        estudiante.asignaturas.forEach(asignatura => {
            const option = document.createElement("option");
            option.value = asignatura;
            option.textContent = asignatura;
            selectAsignatura.appendChild(option);
        });

        selectAsignatura.disabled = false;  // Habilitar el select cuando haya asignaturas
    }

    // Función para desmatricular al estudiante
    function desmatricularEstudiante() {
        const idEstudiante = selectEstudiante.value;
        const nombreAsignatura = selectAsignatura.value;
    
        if (!idEstudiante || !nombreAsignatura) {
            alert("Debe seleccionar un estudiante y una asignatura.");
            return;
        }
    
        const estudiante = listaEstudiantes.find(est => est.id === idEstudiante);
        if (!estudiante) {
            alert("Estudiante no encontrado.");
            return;
        }
    
        if (!Array.isArray(estudiante.historial)) {
            estudiante.historial = [];
        }
    
        // Verificar si el estudiante está matriculado en la asignatura
        if (!estudiante.asignaturas.includes(nombreAsignatura)) {
            alert("El estudiante no está matriculado en esta asignatura.");
            return;
        }
    
        // Filtrar la asignatura eliminada
        estudiante.asignaturas = estudiante.asignaturas.filter(asig => asig !== nombreAsignatura);
    
        // Agregar un registro en el historial
        const fechaDesmatricula = new Date().toLocaleDateString("es-ES", { dateStyle: "long" });
        estudiante.historial.push(`Desmatriculación de ${nombreAsignatura} el ${fechaDesmatricula}`);
    
        // Guardar cambios en localStorage
        localStorage.setItem("estudiantes", JSON.stringify(listaEstudiantes));
    
        // Actualizar la lista de asignaturas en el select
        llenarSelectAsignaturas();
    
        alert(`El estudiante ${estudiante.nombre} ha sido desmatriculado de ${nombreAsignatura}`);
    }
    

    // Eventos
    selectEstudiante.addEventListener("change", llenarSelectAsignaturas);
    botonDesmatricular.addEventListener("click", desmatricularEstudiante);

    // Llenar el select de estudiantes al cargar la página
    llenarSelectEstudiantes();
});