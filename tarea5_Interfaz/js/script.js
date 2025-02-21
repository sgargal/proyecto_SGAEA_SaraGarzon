document.addEventListener('DOMContentLoaded', function() {
    //Selecciono todos los botones
    const botones = document.querySelectorAll('.menu');

    //Agrego un evento a cada uno de los botones
    botones.forEach(boton=> {
        boton.addEventListener("click", (e) => {
            const url = e.target.getAttribute("onclick").match(/'(.*?)'/)[1];
            window.location.href=url;
        });
    });
});

//crear.html
document.addEventListener("DOMContentLoaded", () => { 
    const form = document.getElementById("formEstudiante");

    if(form){
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            //Guardo los datos del formulario
            const estudiante = {
                id: document.getElementById("idEstudiante").value.trim(),
                nombre: document.getElementById("nombreEstudiante").value.trim(),
                edad: document.getElementById("edadEstudiante").value.trim(),
                direccion: {
                    calle: document.getElementById("calleEstudiante").value.trim(),
                    numero: document.getElementById("numeroEstudiante").value.trim(),
                    piso: document.getElementById("pisoEstudiante").value.trim(),
                    codigoPostal: document.getElementById("codigoPostalEstudiante").value.trim(),
                    provincia: document.getElementById("provinciaEstudiante").value.trim(),
                    localidad: document.getElementById("localidadEstudiante").value.trim(),
                }
            };

            //Validación
            if(!estudiante.id || !estudiante.nombre || !estudiante.edad || !estudiante.direccion.calle || !estudiante.direccion.numero || !estudiante.direccion.codigoPostal || !estudiante.direccion.provincia || !estudiante.direccion.localidad){
                alert("Por favor, complete todos los campos del formulario.");
                return;
            }

            //Obtener lista de estudiantes
            let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

            //Verificar si el estudiante ya existe
            if(estudiantes.some(est => est.id === estudiante.id)){
                alert("El estudiante ya existe");
                return;
            }

            //Guardar el estudiante
            estudiantes.push(estudiante);

            //Guardar en el localStorage
            localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

            //Confirmación
            alert("Estudiante registrado correctamente.");

            //Limpiar el formulario
            form.reset();
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const formAsignatura = document.getElementById("formAsignatura");

    if(formAsignatura){
        formAsignatura.addEventListener("submit", (event) => {
            event.preventDefault();

            const asignatura = {
                nombre: document.getElementById("nombreAsignatura").value.trim(),
            };

            //Validacion
            if(!asignatura.nombre){
                alert("Por favor, complete el nombre de la asignatura");
                return;
            }

            let asignaturas = JSON.parse(localStorage.getItem("asignaturas")) || [];


            //Verificar si la asignatura ya existe
            if(asignaturas.some(asig=> asig.nombre === asignatura.nombre)){
                alert("La asignatura ya existe");
                return;
            }

            //Guarda la asignatura
            asignaturas.push(asignatura);

            //Guardar en el localStorage
            localStorage.setItem("asignaturas", JSON.stringify(asignaturas));

            //Confirmación
            alert("Asignatura registrada correctamente.");

            //Limpiar el formulario
            formAsignatura.reset();
        });
    }
});

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

document.addEventListener("DOMContentLoaded", () => {
    // Recuperar los estudiantes y asignaturas desde localStorage
    let listaEstudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [
        {id:'123E', nombre: 'Sara Garzón', asignaturas: []},
        {id: '124E', nombre: 'Juan García', asignaturas: []},
        {id: '125E', nombre: 'Adrián Martín', asignaturas: []}
    ];

    const listaAsignaturas = [
        {nombreAsignatura: 'DWEC'},
        {nombreAsignatura: 'DWES'},
        {nombreAsignatura: 'DIW'}
    ];

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

        listaAsignaturas.forEach(asignatura => {
            const option = document.createElement("option");
            option.value = asignatura.nombreAsignatura;
            option.textContent = asignatura.nombreAsignatura;
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

        // Si el estudiante ya está matriculado en la asignatura, no hacer nada
        if (estudiante.asignaturas.includes(nombreAsignatura)) {
            alert("El estudiante ya está matriculado en esta asignatura.");
            return;
        }

        estudiante.asignaturas.push(nombreAsignatura);  // Matricular en la asignatura

        // Guardar los cambios en localStorage
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


// DESMATRICULAR
document.addEventListener("DOMContentLoaded", () => {
    const selectEstudiante = document.getElementById("elegirEstudianteDesmatricular");
    const selectAsignatura = document.getElementById("elegirAsignaturaDesmatricular");
    const botonDesmatricular = document.getElementById("desmatricularBoton");

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

        // Filtrar la asignatura eliminada
        estudiante.asignaturas = estudiante.asignaturas.filter(asig => asig !== nombreAsignatura);

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

