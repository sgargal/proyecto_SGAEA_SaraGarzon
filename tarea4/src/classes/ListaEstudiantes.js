import Estudiante from './Estudiante.js';

/**
 * Clase que representa la lista de estudiantes
 */
class ListaEstudiantes{
    #listaEstu = [];

    /**
     * Constructor que crea una nueva instancia de ListaEstudiantes
     */
    constructor(){
        this.#listaEstu = [];
    }

    /**
     * Devuelve la lista de estudiantes
     * @returns {Array} - Lista de estudiantes
     */
    get listaEstu() {
        return this.#listaEstu;
    }

    /**
     * Esta funcion añade un estudiante nuevo a la lista
     * @param {Estudiante} estudiante - Estudiante que se va a añadir a la lista
     */
    agregarEstudiante(estudiante){
        try{
            if(this.#listaEstu.some(est => est.id === estudiante.id)){
                throw new Error("El estudiante ya se encuentra en la lista.");
            }
            this.#listaEstu.push(estudiante);
            console.log(`Estudiante ${estudiante.nombre} agragado correctamente.`);
        }catch(error){
            console.error(`ERROR: ${error.message}`);
        } 
    }

    /**
     * Esta funcion elimina un estudiante de la lista
     * @param {string} id - Id del estudiante que queremos eliminar
     */
    eliminarEstudiante(id){
        try{
            const indice = this.#listaEstu.findIndex(est => est.id === id);
            if(indice === -1){
                throw new Error("ERROR: No se encontró ese estudiante.");
            }
            this.#listaEstu.splice(indice, 1)
            console.log(`Estudiante con ID ${id} ha siso eliminado correctamente.`);
        }catch(error){
            console.error(`ERROR: ${error.message}`);
        }
    }

    /**
     * Esta funcion busca a un estudiante por su nombre, nos mostrara los resultados que coincidan parcialmente
     * @param {string} nombre - Nombre del estudiante que se desea buscar
     */
    buscarEstudiantes(nombre){
        const estudiantesEncontrados = this.#listaEstu.filter(est => est.nombre.toLowerCase().includes(nombre.toLowerCase()));

        if(estudiantesEncontrados.length === 0){
            console.log("No hay resultados para tu búsqueda.");
        }else{
            estudiantesEncontrados.forEach(est => console.log(est.toString()));
        }
    }

    /**
     * Esta funcion muestra la lista de estudiantes
     */
    mostrarListaEstudiantes(){
        try{
            if(this.#listaEstu.length === 0){
                throw new Error("No hay estudiantes registrados.");
            }
            this.#listaEstu.forEach(est => console.log(est.toString()));
        }catch(error){
            console.error(`ERROR: ${error.message}`);
        }
    }
}

export default ListaEstudiantes;