import Direccion from "./Direccion.js";

/**
 * Clase que representa una persona
 */
class Persona{
    #nombre;
    #edad;
    #direccion;

    /**
     * @param {string} nombre - El nombre de la persona
     * @param {number} edad - La edad de la persona
     * @param {Direccion} direccion - Atributo de la clase Direccion para añadir a una persona una direccion
     */

    constructor (nombre, edad, direccion){
        this.nombre = nombre;
        this.edad = edad;
        this.direccion = direccion;
    }

    /**
     * Obtiene el nombre de la persona
     * @returns {string} El nombre de la persona
     */
    get nombre(){
        return this.#nombre;
    }

    /**
     * Establece el nombre de la persona
     * @param {string} nombre - Nombre de la persona
     */
    set nombre(nombre){
        //Compruebo que solo se puedan poner letras y espacios
        if(/^[A-Za-z\s]+$/.test(nombre)){
            this.#nombre = nombre;
        }else{
            throw new Error("ERROR: El nombre solo debe contener letras y espacios.");
        }
    }

    /**
     * Obtiene la edad de la persona
     * @returns {number} La edad de la persona
     */
    get edad(){
        return this.#edad;
    }

    /**
     * Establece la edad de la persona
     * @param {number} edad - Edad de la persona
     */
    set edad(edad){
        if(/^[0-9]+$/.test(edad) && edad > 0 && edad <= 100){
            this.#edad = edad;
        }else{
            throw new Error("ERROR: La edad solo debe contener números.");
        }
    }

    /**
     * Se obtiene la direccion de la persona
     * @returns {string} Direccion de la persona
     */
    get direccion(){
        return this.#direccion.toString();
    } 

    /**
     * Establece la direccion de la persona
     * @param {Direccion} direccion - Direccion de la persona
     */
    set direccion(direccion){
        if(direccion instanceof Direccion){
            this.#direccion = direccion;
        }else{
            throw new Error("ERROR: La direccion no es correcta.")
        }
    }

    /**
     * Esta funcion devuelve todos los datos de una persona
     * @returns {string} Devuelve todos los datos de una persona, nombre, edad y direccion
     */
    toString(){
        return `${this.nombre}, ${this.edad}, ${this.direccion}`;
    }

}

export default Persona;