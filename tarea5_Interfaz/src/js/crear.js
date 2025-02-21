import Estudiante from './classes/Estudiante.js';
import Direccion from './classes/Direccion.js';
import ListaEstudiantes from './classes/ListaEstudiantes.js';

// Instancia de ListaEstudiantes
const listaEstudiantes = new ListaEstudiantes();

// Captura el formulario
document.getElementById("formCrearEstudiante").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Capturar valores del formulario
    const id = document.getElementById("id").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const edad = parseInt(document.getElementById("edad").value);
    const calle = document.getElementById("calle").value.trim();
    const numero = parseInt(document.getElementById("numero").value);
    const piso = parseInt(document.getElementById("piso").value) || 0; // Si está vacío, toma 0
    const provincia = document.getElementById("provincia").value.trim();
    const codPostal = document.getElementById("codPostal").value.trim();
    const localidad = document.getElementById("localidad").value.trim();

    // Validar que los campos no estén vacíos
    if (!id || !nombre || isNaN(edad) || !calle || isNaN(numero) || !provincia || !codPostal || !localidad) {
        document.getElementById("mensaje").textContent = "ERROR: Todos los campos son obligatorios.";
        return;
    }

    // Crear dirección y estudiante
    const direccion = new Direccion(calle, numero, piso, codPostal, provincia, localidad);
    const estudiante = new Estudiante(id, nombre, edad, direccion);

    // Agregar estudiante a la lista
    try {
        listaEstudiantes.agregarEstudiante(estudiante);
        document.getElementById("mensaje").textContent = `Estudiante ${nombre} creado correctamente.`;
    } catch (error) {
        document.getElementById("mensaje").textContent = `ERROR: ${error.message}`;
    }

    // Limpiar formulario
    document.getElementById("formCrearEstudiante").reset();
});
