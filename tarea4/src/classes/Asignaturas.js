/**
 * Clase que representa una asignatura
 */
class Asignaturas{
    #nombreAsignatura;
    #calificaciones;

    /**
     * @param {string} nombreAsignatura - Nombre de la asignatura
     */

    constructor(nombreAsignatura){
        this.nombreAsignatura = nombreAsignatura;
        this.#calificaciones = [];
    }

    /**
     * Devuelve el nombre de la asignatura
     * @returns {string} Nombre de la asignatura
     */
    get nombreAsignatura(){
        return this.#nombreAsignatura;
    }

    /**
     * Establece el nombre de la asignatura
     * @param {string} nombreAsignatura - Nombre de la asignatura
     */
    set nombreAsignatura(nombreAsignatura){
        if(typeof(nombreAsignatura) === "string"){
            this.#nombreAsignatura = nombreAsignatura;
        }else{
            throw new Error("ERROR: El nombre de la asignatura no es válido.")
        }
    }

    /**
     * Esta funcion añade una calificacion a una asignatura
     * @param {number} calificacion 
     */
    aniadirCalificacion(calificacion){
        try{
            if(Number.isInteger(calificacion) && calificacion >= 0 && calificacion <= 10){
                this.#calificaciones.push(calificacion);
                console.log(`La calificacion se ha añadido correctamente.`);
            }else{
                throw new Error("ERROR: La calificacion no es válida.");
            }
        }catch(error){
            console.error(`ERROR: ${error.message}`);
        }
    }

    /**
     * Esta funcion devuelve el proemdio de las notas de una asignatura
     * @returns {string} Devuelve el promedio de las calificaciones de una asignatura
     */
    calcularPromedioCalificaciones(){
        if(this.#calificaciones.length === 0){
            console.warn("No hay calificaciones registradas");
            return 0;
        }
        const suma = this.#calificaciones.reduce((acumulador, calificacion) => acumulador+calificacion,0);
        return (suma / this.#calificaciones.length).toFixed(2);
    }

    /**
     * Devuelve los datos de una asignatura
     * @returns {string} Devuelve el nombre y las calificaciones de una asignatura
     */
    toString(){
        return `Nombre: ${this.nombreAsignatura}, Calificaciones: ${this.#calificaciones}`;
    }

}

export default Asignaturas;