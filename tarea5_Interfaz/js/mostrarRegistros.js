document.addEventListener("DOMContentLoaded", () => {
    let listaEstudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

    function llenarSelectEstudiantes() {
        const selectEstudiantes = document.getElementById("elegirEstu");
        selectEstudiantes.innerHTML = "<option value=''>Seleccione un estudiante</option>";

        listaEstudiantes.forEach(estudiante => {
            const opcion = document.createElement("option");
            opcion.value = estudiante.id;
            opcion.innerText = estudiante.nombre;
            selectEstudiantes.appendChild(opcion);
        });
    }

    llenarSelectEstudiantes();

    document.getElementById("verRegistros").addEventListener("click", () => {
        const idEstudiante = document.getElementById("elegirEstu").value;
        const tablaRegistros = document.getElementById("registros");
        tablaRegistros.innerHTML = "";

        if (!idEstudiante) {
            alert("Debe seleccionar un estudiante");
            return;
        }

        const estudianteRegistrado = listaEstudiantes.find(est => est.id == idEstudiante);

        if (!estudianteRegistrado) {
            alert("Estudiante no encontrado");
            return;
        }

        // Asegurar que el historial existe
        if (!Array.isArray(estudianteRegistrado.historial)) {
            estudianteRegistrado.historial = [];
        }

        if (estudianteRegistrado.historial.length === 0) {
            tablaRegistros.innerHTML = `<p>No tiene registros este estudiante.</p>`;
        } else {
            const registrosHtml = `<h3>Historial del estudiante ${estudianteRegistrado.nombre}:</h3>
                                    <ul>
                                        ${estudianteRegistrado.historial.map(registro => `<li>${registro}</li>`).join('')}
                                    </ul>`;
            tablaRegistros.innerHTML = registrosHtml;
        }
    });
});
