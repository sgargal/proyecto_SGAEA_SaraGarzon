//ELIMINAR
document.addEventListener("DOMContentLoaded", () => {
    const formEliminarEstudiante = document.getElementById("formEliminarEstudiante");

    if(formEliminarEstudiante){
        formEliminarEstudiante.addEventListener("submit", (event) => {
            event.preventDefault();

            const idEstudiante = document.getElementById("idEstudiante").value.trim();

            if(!idEstudiante){
                alert("Por favor, complete el campo con el ID del estudiante");
                return;
            }

            let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

            //Buscar el estudiante en la lista
            const index = estudiantes.findIndex(est => est.id === idEstudiante);

            if(index === -1){
                alert("No se han encontrado resultados");
                return;
            }

            //Eliminar el estudiante
            estudiantes.splice(index, 1);

            //Guardar en el localStorage
            localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

            //Confirmación
            alert("Estudiante eliminado correctamente.");

            //Limpiar el formulario
            formEliminarEstudiante.reset();
        });
    }

    const formEliminarAsignatura = document.getElementById("formEliminarAsignatura");

    if(formEliminarAsignatura){
        formEliminarAsignatura.addEventListener("submit", (event) => {
            event.preventDefault();

            const nombreAsignatura = document.getElementById("nombreAsignatura").value.trim();

            if(!nombreAsignatura){
                alert("Por favor, complete el campo con el nombre de la asignatura");
                return;
            }

            let asignaturas = JSON.parse(localStorage.getItem("asignaturas")) || [];

            //Buscar la asignatura en la lista
            const index = asignaturas.findIndex(asig => asig.nombre === nombreAsignatura);

            if(index === -1){
                alert("No se han encontrado resultados");
                return;
            }

            //Eliminar la asignatura
            asignaturas.splice(index, 1);

            //Guardar los cambios en el localStorage
            localStorage.setItem("asignaturas", JSON.stringify(asignaturas));

            //Confirmación
            alert("Asignatura eliminada correctamente.");

            //Limpiar el formulario
            formEliminarAsignatura.reset();
        });
    }
});