/**
 * @file Proyecto SGAEA - Manejo de Estudiantes y Asignaturas
 * @author Sara GARZÓN
 * @description En este proyecto se va a realizar un sistema de gestión de estudiantes y asignaturas.
 */




import Estudiante from './classes/Estudiante.js';
import ListaEstudiantes from './classes/ListaEstudiantes.js';
import Asignaturas from './classes/Asignaturas.js';
import ListaAsignaturas from './classes/ListaAsignaturas.js';
import Direccion from './classes/Direccion.js';
import Persona from './classes/Persona.js';


/**
 * PROGRAMA PRINCIPAL
 * 
 * En este programa se va a realizar un sistema de gestión de estudiantes y asignaturas.
 */

//INSTANCIA DE ALGUNOS OBJETOS PARA HACER PRUEBAS

//Creo una lista de estudiantes y asignaturas
const listaEstudiantes = new ListaEstudiantes();
const listaAsignaturas = new ListaAsignaturas();

//Instancio algunos estudiantes
const estudiante1 = new Estudiante("123E", "Sara", 19, new Direccion("Calle Flor", 2, 3, 18013, "Granada", "Granada"));
const estudiante2 = new Estudiante("124E", "Santiago", 23, new Direccion("Calle Real", 3, 4, 18014, "Granada", "Granada"));
const estudiante3 = new Estudiante("125E", "Samuel", 25, new Direccion("Calle Nueva", 5, 2, 20029, "Cordoba", "Cordoba"));

//Agrego los estudiantes a la lista
listaEstudiantes.agregarEstudiante(estudiante1);
listaEstudiantes.agregarEstudiante(estudiante2);
listaEstudiantes.agregarEstudiante(estudiante3);

//Instancio algunas asignaturas
const asignatura1 = new Asignaturas("DWEC");
const asignatura2 = new Asignaturas("DWES");
const asignatura3 = new Asignaturas("DIW");

//Agrego las asignaturas a la lista
listaAsignaturas.agregarAsignatura(asignatura1);
listaAsignaturas.agregarAsignatura(asignatura2);
listaAsignaturas.agregarAsignatura(asignatura3);

//Matriculo a un estudiante en una asignatura
estudiante1.matricular(asignatura1);


/**
 * Menu principal del programa
 */
function menuPrincipal(){
    console.log(`
        +-----   MENÚ PRINCIPAL  ----+
        | 1. Crear                   |
        | 2. Eliminar                |
        | 3. Matricular              |
        | 4. Desmatricular           |
        | 5. Mostrar Registros       |
        | 6. Calificar               |
        | 7. Mostrar Promedio        |
        | 8. Buscar                  |
        | 9. Reporte                 |      
        | 10. Salir                  |  
        +----------------------------+         
    `);
}

/**
 * Submenu de la opcion Crear
 */
function menuCrear(){
    console.log(`
        +-----    MENÚ     ----+ 
        | 1. Crear Estudiante  | 
        | 2. Crear Asignatura  | 
        | 3. Salir             | 
        +----------------------+
    `);
}

/**
 * Submenu de la opcion Eliminar
 */
function menuEliminar(){
    console.log(`
        +-----     MENÚ       ----+ 
        | 1. Eliminar Estudiante  | 
        | 2. Eliminar Asignatura  | 
        | 3. Salir                | 
        +-------------------------+
    `);
}

/**
 * Submenu de la opcion Buscar
 */
function menuBuscar(){
    console.log(`
        +-----     MENÚ       ----+ 
        | 1. Buscar Estudiante    | 
        | 2. Buscar Asignatura    | 
        | 3. Salir                | 
        +-------------------------+
    `);
}

//Declaro una bandera para salir del programa
let salirMenuPrincipal = false;
try{
    while(!salirMenuPrincipal){
        menuPrincipal();//Muestro el menu principal
        const op = prompt("Elija una opción: ");
    
        switch(op){
            case '1': 
                menuCrear();//Muestro el submenú de la opción crear
                const opCrear = prompt("Elija una opción: ");
                switch(opCrear){
                    //Si creo un estudiante, pido los datos para instaciar uno y una dirección también.
                    case '1':
                        const id = prompt("ID del estudiante: ");
                        const nombre = prompt("Nombre del estudiante: ");
                        const edad = prompt("Edad del estudiante: ");
                        const calle = prompt("Ingrese la calle: ");
                        const numero = prompt("Ingrese el número: ");
                        const piso = prompt("Ingrese el piso: ");
                        const provincia = prompt("Ingrese la provincia: ");
                        const codPostal = prompt("Ingrese el código postal: ");
                        const localidad = prompt ("Ingrese la localidad: ");
        
                        const direccion = new Direccion(calle, numero, piso, codPostal, provincia, localidad);
    
                        const estudiante = new Estudiante(id, nombre, edad, direccion);
    
                        //Muestro un mensaje para el usuario, muestro el estudiante que se va a crear y lo agrego a la lista.
                        console.log("Estudiante correctamente creado.");
                        console.log(estudiante.toString());
                        listaEstudiantes.agregarEstudiante(estudiante);
                        break;
                    case '2':
                        //Si creo un estudiante, compruebo que no sea una cadena vacía
                        //Si no es, muestro la asignatura que se acaba de crear y la agrego a la lista Asignatura
                        const nombreAsig = prompt("Nombre de la asignatura: ");
    
                        if(nombreAsig.trim() === ""){
                            console.error("ERROR: Debe ingresar un nombre válido.");
                        }else{
                            const asig = new Asignaturas(nombreAsig);
    
                            console.log("Asignatura creada correctamente.");
                            console.log(asig.toString());
                            listaAsignaturas.agregarAsignatura(asig);
                        }
                        break;
                    case '3':
                        salirMenuPrincipal = true;
                        break;
                    default:
                        console.error("Opción no válida."); 
                }
                break;
                case '2':
                    menuEliminar();//Muestro el submenú de Eliminar
                    const opEliminar = prompt("Elija una opción: ");
    
                    switch(opEliminar){
                        case '1':
                            //Si elige eliminar un estudiante, lo elimino de la lista y además muestro la lista actualizada
                            const idEliminar = prompt("Ingrese el ID del alumno que desea eliminar: ");
                            listaEstudiantes.eliminarEstudiante(idEliminar);
                            
                            console.log("Lista de estudiantes actualizada: ");
                            listaEstudiantes.mostrarListaEstudiantes();
    
                            break;
                        case '2':
                            //Si elige eliminar una asignatura, se elimina y además se muestra la lista de asignaturas actualizada
                            const nombreEliminar = prompt("Ingrese el nombre de la asignatura que desea eliminar: ");
                            listaAsignaturas.eliminarAsignatura(nombreEliminar);
    
                            console.log("Lista de asignaturas actualizada: ");
                            listaAsignaturas.mostrarListaAsignaturas();
                            
                            break;
                        case '3':
                            salirMenuPrincipal = true;
                            break;
                        default:
                            console.error("ERROR: Opción no válida.");
                    }
                break;
                case '3':
                    //Muestro la lista y le solicita al usuario que seleccione un estudiante
                    console.log("Seleccione que estudiante quiere matricular: ");
    
                    listaEstudiantes.mostrarListaEstudiantes();
                    const idEstudiante = prompt("Introduzca el ID del estudiante: ");
    
                    //Buscar al estudiante por ID
                    const estudiante = listaEstudiantes.listaEstu.find(est => est.id === idEstudiante);
                    if(!estudiante){
                        console.error("ERROR: Estudiante no encontrado.");
                        break;
                    }
                    //Mostrar las asignaturas y pedir al usuario que seleccione una
                    console.log("Seleccione la asignatura donde lo quiere matricular: ");
                    listaAsignaturas.mostrarListaAsignaturas();
                    const nombreAsignatura = prompt("Introduzca el nombre de la asignatura: ");
    
                    //Buscar a la asignatura por nombre
                    const asignatura = listaAsignaturas.listaAsignaturas.find(asig => asig.nombreAsignatura === nombreAsignatura);
                    if(!asignatura){
                        console.error("ERROR: Asignatura no encontrada.");
                        break;
                    }
    
                    //Matricular al estudiante
                    estudiante.matricular(asignatura);
                    console.log(`El estudiante ha sido correctamente matriculado.`);
                    break;
                case '4':
                    //Muestro la lista y le solicita al usuario que seleccione un estudiante
                    console.log("Seleccione que estudiante quiere matricular: ");
    
                    listaEstudiantes.mostrarListaEstudiantes();
                    const idEstudianteDesmatricular = prompt("Introduzca el ID del estudiante: ");
                    //Buscar al estudiante por ID
                    const estudianteDesmatricular = listaEstudiantes.listaEstu.find(est => est.id === idEstudianteDesmatricular);
                    if(!estudianteDesmatricular){
                        console.error("ERROR: Estudiante no encontrado.");
                        break;
                    }
                    //Muestra las asignaturas a las que está matriculado el estudiante
                    console.log(`Asignaturas del estudiante: `);
    
                    estudianteDesmatricular.asignaturas.forEach((asig, index) => {
                        console.log(`${index + 1}. ${asig[0].nombreAsignatura} - ${asig[1]}`);
                    });
    
                    //Solicitar al usuario que elija el numero de una asignatura
                    const numAsignatura = prompt("Introduzca el número de la asignatura. ");
                    const asignaturaDesmatricular = estudianteDesmatricular.asignaturas[numAsignatura - 1];
    
                    if(!asignaturaDesmatricular){
                        console.error("ERROR: Asignatura no encontrada.");
                        break;
                    }
    
                    //Desmatricular al estudiante de la asignatura seleccionada
                    estudianteDesmatricular.desmatricular(asignaturaDesmatricular[0]);
    
                    console.log(`El estudiante ha sido desmatriculado correctamente.`);
    
                    break;
    
                case '5':
                    console.log("Seleccione el estudiante para ver sus registros: ");
    
                    listaEstudiantes.mostrarListaEstudiantes();
                    const idEstuRegistros = prompt("Introduzca el ID del estudiante: ");
    
                    const estudianteRegistros = listaEstudiantes.listaEstu.find(est => est.id === idEstuRegistros);
                    if(!estudianteRegistros){
                        console.error("ERROR: Estudiante no encontrado.");
                        break;
                    }
                     //Verificar que el estudiante tiene registros en el histroial
                    if(Array.isArray(estudianteRegistros.historial) && estudianteRegistros.historial.length === 0){
                        console.log("No tiene registros este estudiante.");
                    }else{
                        console.log(`Registros del estudiante: `);
                        estudianteRegistros.historial.forEach(registro => console.log(registro));
                    }
                    break;
                case '6':
                    console.log("Seleccione el estudiante para calificarle: ");
    
                    listaEstudiantes.mostrarListaEstudiantes();
                    const idEstuCalificar = prompt("Introduzca el ID del estudiante: ");
    
                    const estudianteCalificar = listaEstudiantes.listaEstu.find(est => est.id === idEstuCalificar);
                    if(!estudianteCalificar){
                        console.error("ERROR: Estudiante no encontrado.");
                        break;
                    }
                    console.log("Seleccione la asignatura donde lo quiere calificar: ");
                    listaAsignaturas.mostrarListaAsignaturas();
                    const nombreAsignaturaCalificar = prompt("Introduzca el nombre de la asignatura: ");
    
                    const asignaturaCalificar = listaAsignaturas.listaAsignaturas.find(asig => asig.nombreAsignatura === nombreAsignaturaCalificar);
    
                    if(!asignaturaCalificar){
                        console.error("ERROR: Asignatura no encontrada.");
                        break;
                    }
                    //Solicitar al usuario que introduzca la califacación y la pasamos a float para asegurarnos que sea un número.
                    const cali = prompt("Introduzca la calificacion: ");
                    const calificacion = parseFloat(cali);
    
                    //Válida que sea número  y que esté entre 0 y 10
                    if(isNaN(calificacion) || calificacion < 0 || calificacion > 10){
                        console.error("ERROR: La calificación no es válida.");
                        break;
                    }
                    //Califica al estudiante
                    estudianteCalificar.agregarCalificacion(asignaturaCalificar, calificacion);
    
                    console.log(`El estudiante ha sido calificado correctamente.`);
                    break;
                case '7':
                    console.log("Seleccione el estudiante para ver su promedio: ");
    
                    listaEstudiantes.mostrarListaEstudiantes();
                    const idEstuPromedio = prompt("Introduzca el ID del estudiante: ");
    
                    const estudiantePromedio = listaEstudiantes.listaEstu.find(est => est.id === idEstuPromedio);
    
                    if(!estudiantePromedio){
                        console.error("ERROR: Estudiante no encontrado.");
                        break;
                    }
                    //Calcular y mostrar el pormedio del estudiante
                    const promedio = estudiantePromedio.promedioCalificaciones();
    
                    // if(promedio === "Sin calificar"){
                    //     console.log("Este estudiante no tiene calificaciones.");
                    // }else{
                        console.log(`El promedio del estudiante es ${promedio}`);
                    // }
                    break;
                case '8':
                    menuBuscar(); //Mostrar el submenú de buscar
                    const opBuscar = prompt("Elija una opción: ");
                    switch(opBuscar){
                        case '1':
                            //Buscar un estudiante por nombre
                            const patron = prompt("Introduzca el nombre del estudiante que quiere ver: ");
                            listaEstudiantes.buscarEstudiantes(patron);
                            break;
    
                        case '2':
                            //Buscar una asignatura por nombres
                            const patronAsig = prompt("Introduzca el nombre de la asignatura que quiere ver: ");
                            listaAsignaturas.buscarAsignaturas(patronAsig);
                            break;
                        case '3':
                            salirMenuPrincipal = true;
                            break;
                        default:
                          console.error("ERROR: Opción no válida.");
    
                    }
                    break;
                case '9':
                    console.log("Seleccione el estudiante para calificarle: ");
    
                    listaEstudiantes.mostrarListaEstudiantes();
                    const idEstuReporte = prompt("Introduzca el ID del estudiante: ");
    
                    const estudianteReporte = listaEstudiantes.listaEstu.find(est => est.id === idEstuReporte);
                    if(!estudianteReporte){
                        console.error("ERROR: Estudiante no encontrado.");
                        break;
                    }
    
                    //Muestro los detalles del estudiante
                    console.log(`REPORTE DE ESTUDIANTE: `);
                    console.log(`Nombre: ${estudianteReporte.nombre}`);
                    console.log(`Edad: ${estudianteReporte.edad}`);
                    console.log(`Direccion: ${estudianteReporte.direccion}`);
    
                    //Muestro las asignaturas y calificaciones
                    console.log("\nAsignaturas y calificaciones: ");
                    estudianteReporte.asignaturas.forEach(([asig,calif], index) => {
                        console.log(`${index + 1}. ${asig.nombreAsignatura} - Calificaciones: ${calif}`);
                    });
    
                    //Muestro promedio
                    const promedioReporte = estudianteReporte.promedioCalificaciones();
                    console.log(`\nPromedio del estudiante: ${promedioReporte}`);
    
                    //Muestro el historial
                    console.log("\nHistorial: ");
                    if(estudianteReporte.historial.length === 0){
                        console.log("No hay registros disponibles");
                    }else{
                        estudianteReporte.historial.forEach(registro => console.log(registro));
                    }
    
                    break;
    
                case '10':
                    //Salir del programa
                    console.log("Saliendo del programa...");
                    salirMenuPrincipal = true;
                    break;
                default:
                    console.error("ERROR: Opción no valida.");   
        }
    }
}catch(error){
    console.error(`Se ha producido un error -> ${error.message}`);
}