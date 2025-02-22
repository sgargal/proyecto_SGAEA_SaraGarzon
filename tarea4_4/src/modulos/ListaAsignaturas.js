import Asignaturas from './Asignaturas.js';

/**
 * Clase que representa la lista de asignaturas
 */
class ListaAsignaturas{
    #listaAsignaturas = [];

    /**
     * Constructor que crea una nueva instancia de ListaAsignaturas
     */
    constructor(){
        this.#listaAsignaturas = [];
    }

    /**
     * Devuelve la lista de asignaturas
     * @returns {Array} - Lista de asignaturas
     */
    get listaAsignaturas(){
        return this.#listaAsignaturas;
    }

    /**
     * Esta funcion añade una asignatura nueva a la lista
     * @param {Asignatura} asignatura - Asignatura que se desea añadir a la lista
     */
    agregarAsignatura(asignatura){
        try{
            if(this.#listaAsignaturas.some(asig => asig.nombreAsignatura === asignatura.nombreAsignatura)){
                throw new Error("La asignatura ya fue añadida anteriormente.");
            }
            this.#listaAsignaturas.push(asignatura);
            console.log(`Asignatura añadida correctamente.`);
        }catch(error){
            console.error(`ERROR: ${error.message}`);
        }
    }

    /**
     * Esta funcion elimina una asignatura de la lista
     * @param {string} nombreAsignatura 
     */
    eliminarAsignatura(nombreAsignatura){
        try{
            const ind = this.#listaAsignaturas.findIndex(asig => asig.nombreAsignatura === nombreAsignatura);

            if(ind === -1){
                throw new Error("ERROR: No ese ha encontrado la asignatura.");
            }
    
            this.#listaAsignaturas.splice(ind, 1);
            console.log(`${nombreAsignatura} ha sido correctamente eliminada.`);
        }catch(error){
            console.error(`ERROR: ${error.message}`);
        }
    }

    /**
     * Esta funcion busca una asignatura por su nombre, nos mostrara los resultados que coincidan parcialmente
     * @param {string} nombre - Nombre de la asignatura que se desea buscar
     */
    buscarAsignaturas(nombre){
        const asignaturasEncontradas = this.#listaAsignaturas.filter(asig => asig.nombreAsignatura.toLowerCase().includes(nombre.toLowerCase()));

        if(asignaturasEncontradas.length === 0){
            console.log("No se han encontrado resultados.");
        }else{
            asignaturasEncontradas.forEach(asig => console.log(asig.toString()));
        }
    }

    /**
     * Esta funcion muestra la lista de asignaturas
     * @returns {string} - Devuelve la lista de asignaturas
     */
    mostrarListaAsignaturas(){
        try{
            if(this.#listaAsignaturas.length === 0){
                throw new Error("No hay asignaturas creadas.");
            }
            this.#listaAsignaturas.forEach(asig => console.log(asig.toString()));
        }catch(error){
            console.error(`ERROR: ${error.message}`);
        }
        
    }
}

export default ListaAsignaturas;