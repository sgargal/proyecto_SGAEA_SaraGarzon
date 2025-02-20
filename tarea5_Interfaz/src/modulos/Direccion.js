/**
 * Clase que va a representar una direccion
 */
class Direccion{
    #calle;
    #numero;
    #piso;
    #codigoPostal;
    #provincia;
    #localidad;
    /**
     * @param {string} calle - La calle de la dirección
     * @param {number} numero - El número de la casa o edificio
     * @param {number} piso - El piso del edificio
     * @param {string} codigoPostal - El código postal 
     * @param {string} provincia - Nombre de la provincia
     * @param {string} localidad - Nombre de la localidad
     */

    constructor(calle, numero, piso, codigoPostal, provincia, localidad){
        this.calle = calle;
        this.numero = numero;
        this.piso = piso;
        this.codigoPostal = codigoPostal;
        this.provincia = provincia;
        this.localidad = localidad;
    }

    /**
     * Obtiene la calle de la direccion
     * @returns {string} La calle de la dirección
     */
    get calle(){
        return this.#calle;
    }
    /**
     * Se establece la calle de la direccion
     * @param {string} calle - La calle de la dirección
     */
    set calle(calle){
        if(typeof calle === "string"){
            this.#calle = calle;
        }else{
            throw new Error("ERROR: No es válida la calle")
        }
        
    }
    /**
     * Obtiene el numero de la direccion
     * @return {number} El número de la casa o edificio
     */
    get numero(){
        return this.#numero;
    }

    /**
     * Se establece la propiedad número de la direccion
     * @param {number} numero - El número de la casa o edificio
     */
    set numero(numero){
        if(typeof numero === "number"){
            this.#numero = numero;
        }else{
            throw new Error("ERROR: No es válido el número.");
        }

    }

    /**
     * Obtiene el piso 
     * @returns {number} El piso del edificio
     */
    get piso(){
        return this.#piso;
    }

    /**
     * Establece el piso 
     * @param {number} piso - El piso del edificio
     */
    set piso(piso){
        if(typeof piso === "number"){
            this.#piso = piso;
        }else{
            throw new Error(`ERROR: No es válido el piso.`);
        }
    }

    /**
     * Obtiene el codigo postal
     * @returns {string} Codigo Postal
     */
    get codigoPostal(){
        return this.#codigoPostal;
    }

    /**
     * Estable el codigo postal
     * @param {string} codigoPostal - Codigo postal
     */
    set codigoPostal(codigoPostal){
        if(/^[0-9]{5}/.test(codigoPostal)){
            this.#codigoPostal = codigoPostal;
        }else{
            throw new Error(`ERROR: No es válido el código postal.`);
        }
        
    }

    /**
     * Obtiene la provincia
     * @returns {string} Provincia
     */
    get provincia(){
        return this.#provincia;
    }

    /**
     * Establece la provincia
     * @param {string} provincia - Provincia
     */
    set provincia(provincia){
        if(typeof provincia === "string"){
            this.#provincia = provincia;
        }else{
            throw new Error(`ERROR: La provincia no es válida.`)
        }
        
    }

    /**
     * Obtiene la localidad
     * @returns {string} Localidad
     */
    get localidad(){
        return this.#localidad;
    }

    /**
     * Establece la localidad
     * @param {string} localidad - Localidad
     */
    set localidad(localidad){
        if(typeof localidad === "string"){
            this.#localidad = localidad;
        }else{
            throw new Error(`ERROR: La localidad no es válida.`);
        }
        
    }

    /**
     * Esta función devuelve la direccion completa en una cadena
     * @returns {string} Devuelve la dirección completa
     */
    toString(){
        return `Calle: ${this.calle}, Numero: ${this.numero}, Piso: ${this.piso}, Código Postal: ${this.codigoPostal}, Provincia: ${this.provincia}, Localidad: ${this.localidad}`;
    }
}

export default Direccion;