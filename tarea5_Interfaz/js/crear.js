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