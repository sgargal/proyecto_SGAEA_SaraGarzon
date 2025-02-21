import Persona from "../modulos/Persona.js";

/**
 * Clase que representa un estudiante, hereda de la clase Persona
 */
class Estudiante extends Persona{
    #id;
    #asignaturas;
    static numerosAsignados = [];
    #historial;

    /**
     * @param {string} id - El id del estudiante 
     * @param {string} nombre - Nombre del estudiante
     * @param {number} edad - Edad del estudiante
     * @param {Direccion} direccion - Direccion del estudiante
     */
    constructor(id, nombre, edad, direccion){
        super(nombre, edad, direccion);
        this.id = id; 
        this.#asignaturas = [];//Se guarda la asignatura y las calificaciones 
        this.#historial = [];//Historial de matriculaciones y desmatriculaciones, la asignatura en la que se aplico y la fecha en la que se hizo
    }

    /**
     * Obtiene el id del estudiante
     * @returns {string} Id del estudiante
     */
    get id(){
        return this.#id; 
    }

    /**
     * Se establece el id del estudiante con el siguiente formato y ademas se guarda en el array de numerosAsignados para que no se repita
     * @param {string} id -Id del estudiante
     */
    set id(id){
        if(!/^[0-9]{3}[E]$/.test(id)){
            throw new Error("ERROR: El id de los estudiantes no permite ese formato.");
        }
        if(Estudiante.numerosAsignados.includes(id)){
            throw new Error(`ERROR: El ID ${id} esta siendo utilizado`)
        }

        this.#id = id;
        Estudiante.numerosAsignados.push(id);
        
    }

    /**
     * Obtiene las asignaturas en las que está matriculado el estudiante
     * @returns {Array} Asignaturas en las que está matriculado el estudiante
     */
    get asignaturas(){
        return [...this.#asignaturas];
    }

    /**
     * Obtiene el historial de matriculaciones y desmatriculacion del alumno
     * @returns {Array} Historial de matriculaciones y desmatriculaciones
     */
    get historial(){
        if(this.#historial.length === 0){
            return [];
        }
        
        return this.#historial.map(([actividad, asignatura, fecha]) => {
            const fechaFormateada = new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(fecha);

            return `${actividad} en ${asignatura} el ${fechaFormateada}`;
        });
    }

    /**
     * Devuelve una cadena con todos los datos del estudiante
     * @returns {string} Devuelve todos los datos del estudiante, nombre, edad, direccion, id y asignaturas
     */
    toString(){ 
        let mostrarAsignaturas = "Sin asignaturas";
        if(this.#asignaturas.length>0){
            mostrarAsignaturas = this.#asignaturas.map(([asig, calif]) => `${asig.nombreAsignatura}: ${calif ?? "Sin calificar"}`).join(", ");
        }

        return `${super.toString()}, ID: ${this.id}, Asignaturas: [${mostrarAsignaturas}]`;
    }

    /**
     * Esta funcion matricula a un estudiante en una asignatura
     * @param {Object} asignatura  - La asignatura en la que se desea matricular al estudiante
     * @param {Array} [notas=[]] - Las notas registradas del estudiante en la asignatura
     */
    matricular(asignatura, notas=[]){
        try{
            const matriculado = this.#asignaturas.some(asig => asig[0].nombreAsignatura === asignatura.nombreAsignatura);

            if(matriculado){
                throw new Error("ERROR: Ya esta matriculado");
            }
    
            this.#asignaturas.push([asignatura, notas]);
            this.#historial.push(["Matriculacion", asignatura.nombreAsignatura, new Date()]);
    
            console.log(`Se ha matriculado en ${asignatura.nombreAsignatura} correctamente.`);
        }catch(error){
            console.error(`ERROR: ${error.message}`);
        }
        
    }

    /**
     * Esta funcion desmatricula a un estudiante de una asignatura
     * @param {Object} asignatura - La asignatura de la que se quiere desmatricular al estudiante
     */
    desmatricular(asignatura){
        try{
            const ind = this.#asignaturas.findIndex(asig => asig[0].nombreAsignatura === asignatura.nombreAsignatura);

            if(ind === -1){
                throw new Error(`ERROR: No esta matriculado en la asignatura.`);
            }

            this.#asignaturas.splice(ind, 1);

            this.#historial.push(["Desmatriculación", asignatura.nombreAsignatura, new Date()]);

            console.log(`Se ha desmatriculado en ${asignatura.nombreAsignatura} correctamente.`);
        }catch(error){
            console.error(`ERROR: ${error.message}`);
        }
        
    }

    
    /**
     * Esta funcion añade una calificacion a una asignatura
     * @param {Object} asignatura - La asignatura a la que se le va a añadir la calificacion
     * @param {number} calificacion - La calificacion que se va a añadir
     */
    agregarCalificacion(asignatura, calificacion){
        try{
            const asigEncontrada = this.#asignaturas.find(asig => asig[0].nombreAsignatura === asignatura.nombreAsignatura);

            if(!asigEncontrada){
                throw new Error(`ERROR: El estudiante no esta matriculado.`);
            }
    
            if(typeof calificacion !== 'number' || calificacion < 0 || calificacion > 10){
                throw new Error("ERROR: La calificación no es válida.");
            }
    
            if (asigEncontrada[1] === "Sin calificar") {
                asigEncontrada[1] = []; 
            }
        
            asigEncontrada[1].push(calificacion);
    

            console.log(`La calificacion fue agregada correctamente.`);
        }catch(error){
            console.error(`ERROR: ${error.message}`);
        }
        
    }
    
    /**
     * Esta funcion devuelve el promedio de las calificaciones de un estudiante
     * @returns {number} Devuelve el promedio de las calificaciones de un estudiante
     */
    promedioCalificaciones(){
        try{
            const asignaturasCalificadas = this.#asignaturas.filter(asig => Array.isArray(asig[1]) && asig[1].length>0);
 
            if(asignaturasCalificadas.length === 0 ){
                throw new Error("No hay calificaciones registradas para este estudiante.");
            }
            
            let sum = 0;
            let totalCalificaciones = 0;
    
            for(const asig of asignaturasCalificadas){
                sum += asig[1].reduce((acumuladorCalificaciones, notaActual) => acumuladorCalificaciones + notaActual, 0);
                totalCalificaciones += asig[1].length;
            }
            // const sum = asignaturasCalificadas.reduce((acumulador, asig) => acumulador + asig[1], 0);
            return (sum / totalCalificaciones).toFixed(2);
        }catch(error){
            console.error(`ERROR: ${error.message}`);
        }
        
    }

    /**
     * Esta funcion eliminara a un estudiante de la lista de estudiantes
     * @param {string} id - El id del estudiante que se desea eliminar
     */
    eliminarIdRegistrado(id){
        try{
            const indiceId = Estudiante.numerosAsignados.indexOf(id);

            if(indiceId !== -1){
                Estudiante.numerosAsignados.splice(indiceId, 1);
                console.log(`ID ${id} ha sido correctamente eliminado.`)
            }else{
                throw new Error(`ERROR: El ID ${id} no esta siendo utilizado`);
            }
        }catch(error){
            console.error(`ERROR: ${error.message}`);
        }
    }

}

export default Estudiante;