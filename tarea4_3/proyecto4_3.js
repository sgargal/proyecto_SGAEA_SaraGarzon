/**
 * @file Proyecto SGAEA - Manejo de Estudiantes y Asignaturas
 * @author Sara GARZÓN
 * @description En este proyecto se va a realizar un sistema de gestión de estudiantes y asignaturas.
 */

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
