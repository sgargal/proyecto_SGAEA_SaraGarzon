//DEFINIR OBJETO DIRECCION (ATRIBUTO DE CLASE ESTUDIANTE)
class Direccion{
    #calle;
    #numero;
    #piso;
    #codigoPostal;
    #provincia;
    #localidad;

    constructor(calle, numero, piso, codigoPostal, provincia, localidad){
        this.calle = calle;
        this.numero = numero;
        this.piso = piso;
        this.codigoPostal = codigoPostal;
        this.provincia = provincia;
        this.localidad = localidad;
    }

    //GETTERS Y SETTERS
    get calle(){
        return this.#calle;
    }

    set calle(calle){
        this.#calle = calle;
    }

    get numero(){
        return this.#numero;
    }

    set numero(numero){
        this.#numero = numero;
    }

    get piso(){
        return this.#piso;
    }

    set piso(piso){
        this.#piso = piso;
    }

    get codigoPostal(){
        return this.#codigoPostal;
    }

    set codigoPostal(codigoPostal){
        this.#codigoPostal = codigoPostal;
    }

    get provincia(){
        return this.#provincia;
    }

    set provincia(provincia){
        this.#provincia = provincia;
    }

    get localidad(){
        return this.#localidad;
    }

    set localidad(localidad){
        this.#localidad = localidad;
    }

    toString(){
        return `Calle: ${this.calle}, Numero: ${this.numero}, Piso: ${this.piso}, Código Postal: ${this.codigoPostal}, Provincia: ${this.provincia}, Localidad: ${this.localidad}`;
    }
    // get direccion(){
    //     return `${this.#direccion.calle}, ${this.#direccion.numero}, ${this.#direccion.piso}, ${this.#direccion.codigoPostal}, ${this.#direccion.provincia}, ${this.#direccion.localidad}`;
    // }

    // // set direccion(direccion){
    // //     this.#direccion = direccion;
    // // }

    // set direccion(direccion){
    //     //Verifico que direccion no sea null o undefined
    //     if(direccion && 
    //         typeof direccion.calle === "string" && //Válido que calle sea un string
    //         typeof direccion.numero === "number" &&  //Válido que numero sea un number
    //         typeof direccion.piso === "number" && //Válido que piso sea un number
    //         (/^[0-9]{5}/.test(direccion.codigoPostal)) && //Validación de que codPostal tenga 5 numeros
    //         typeof direccion.provincia === "string" &&
    //         typeof direccion.localidad === "string"
    //     ){
    //         this.#direccion = direccion;
    //     }else{
    //         console.error("La direccion no es válida");
    //     }
    // }
}
//DEFINIR CLASE PERSONA
class Persona{
    #nombre;
    #edad;
    #direccion;

    constructor (nombre, edad, direccion){
        this.nombre = nombre;
        this.edad = edad;
        this.direccion = direccion;
    }

    //NOMBRE
    get nombre(){
        return this.#nombre;
    }

    set nombre(nombre){
        //Compruebo que solo se puedan poner letras y espacios
        if(/^[A-Za-z\s]+$/.test(nombre)){
            this.#nombre = nombre;
        }else{
            console.error("ERROR: El nombre solo debe contener letras y espacios.");
        }
    }

    //EDAD
    get edad(){
        return this.#edad;
    }

    set edad(edad){
        //compruebo que la edad sea un numero y que no sea nagativo ni mayor de 100
        if(/^[0-9]+$/.test(edad) && edad >= 0 && edad <= 100){
            this.#edad = edad;
        }else{
            console.error("ERROR: La edad solo debe contener números.");
        }
    }

    //DIRECCIÓN
    get direccion(){
        return this.#direccion.toString();
    }

    set direccion(direccion){
        //compruebo que se haya instaciado el objeto direccion
        if(direccion instanceof Direccion){
            this.#direccion = direccion;
        }else{
            console.error("ERROR: La direccion no es correcta.")
        }
    }

    //MÉTODOS
    toString(){
        return `${this.nombre}, ${this.edad}, ${this.direccion}`;
    }

}

//DEFINIR CLASE ESTUDIANTE
class Estudiante extends Persona{
    //Creo los atributos de la clase estudiante privados para que no sean accesibles fuera de la clase
    #id;
    #asignaturas;
    #calificacionesRegistradas;
    static numerosAsignados = [];
    #historial;

    constructor(id, nombre, edad, direccion){
        //Llamo al constructor de la clase pasre (PERSONA) para inicializar estos atributos
        super(nombre, edad, direccion);
        //Llamo al setter para aplicar la validacion y evitar la duplicacion
        this.id = id; 
        this.asignaturas = [];
        this.calificacionesRegistradas = [];
        this.#historial = [];//Historial de matriculaciones y desmatriculaciones
    }

    //Getters y setters
    //ID
    get id(){
        return this.#id; //Devuelve el valor interno de _id
    }

    set id(id){
        if(!/^[0-9]{3}[E]$/.test(id)){
            console.error("ERROR: El id de los estudiantes no permite ese formato.");
            return;
        }
        if(Estudiante.numerosAsignados.includes(id)){
            console.error(`ERROR: El ID ${id} esta siendo utilizado`)
            return;
        }

        this.#id = id;
        Estudiante.numerosAsignados.push(id);
        
    }

    get asignaturas(){
        return this.#asignaturas;
    }

    get calificacionesRegistradas(){
        return this.#calificacionesRegistradas;
    }

    set calificacionesRegistradas(calificaciones){
        this.#calificacionesRegistradas = calificaciones;
    }

    get historial(){
        return this.#historial.join("\n");
    }
    //MÉTODOS
    toString(){
        const mostrarAsignaturas = this.#asignaturas.map(([asig,calif]) => `${asig.nombreAsignatura} : ${calif ?? "Sin calificacion"}`).join(", ");

        return `${super.toString()}, ID: ${this.id}, Asignaturas: [${mostrarAsignaturas}]`;
    }

    

    //MÉTODOS
    //MATRICULAR ALUMNO
    matricular(...asignaturas){
        for(let asignatura of asignaturas){
            //Verificamos si el estudiante esta matriculado ya en esa asignatura
            const matriculado = this.#asignaturas.some(([asig]) => asig.nombreAsignatura === asignatura.nombreAsinatura);

            //Si está matriculado añado la asignatura y registro en el historial la matriculacion
            if(matriculado){
                console.error(`ERROR: El estudiante ya esta matriculado en ${asignatura.nombreAsignatura}`);
            }else{
                this.#asignaturas.push([asignatura, null]);
                this.#historial.push(`${new Date().toLocaleDateString('es-ES')} - Matricula: ${asignatura.nombreAsignatura}`);
            }
        }
    }
    //DESMATRICULAR ALUMNO
    desmatricular(...asignaturas){
        for(let asignatura of asignaturas){
            let encontrado = false;

            for (let i = 0; i < this.#asignaturas.length; i++) {
                if(this.#asignaturas[i][0].nombreAsignatura === asignatura.nombreAsignatura){
                    this.#asignaturas.splice(i, 1);
                    encontrado = true;

                    this.#historial.push(`${new Date().toLocaleDateString('es-ES')} - Desmatricula: ${asignatura.nombreAsignatura}`);
                    break;
                }
                
            }
        }
    }
    //AGREGAR NOTAS
    agregarCalificacion(asignatura, calificacion){
        const asigEncontrada = this.#asignaturas.find(([asig]) => asig.nombreAsignatura === asignatura.nombreAsignatura);

        if(!asigEncontrada){
            console.error(`ERROR: El estudiante no esta matriculado.`);
            return;
        }

        asigEncontrada[1] = calificacion;
        console.log(`La calificacion fue agregada correctamente.`);
    }
    //MEDIA DE LAS NOTAS
    promedioCalificaciones(){
        const notasValidas = this.#asignaturas.map(([_,calificacion]) => calificacion).filter(calificacion => calificacion !== null);

        if(notasValidas.length === 0 ){
            console.warn("No hay calificaciones registradas para este estudiante.");
            return null;
        }

        const sum = notasValidas.reduce((total, calificacion) => total + calificacion, 0);
        return sum / notasValidas.length;
    }

    //ELIMINAR ID
    eliminarIdRegistrado(id){
        //guarso en una variable el indice del id que se desea eliminar.
        const indiceId = Estudiante.numerosAsignados.indexOf(id);

        //Si devuelve distinto de -1 (ha ecnontrado el id), lo elimina
        if(indiceId !== -1){
            Estudiante.numerosAsignados.splice(indiceId, 1);
            console.log(`ID ${id} ha sido correctamente eliminado.`)
        }else{
            console.error(`ERROR: El ID ${id} no esta siendo utilizado`);
        }
    }

    registrosHistorial(){
        if (this.#historial.length === 0){
            console.error("ERROR: No hay registros en el historial.");
            return;
        }

        console.log("HISTORIAL: ");
        for(const registro of this.#historial){
            console.log(registro);
        }
    }
}
//CLASE ASIGNATURAS
class Asignaturas{
    #nombreAsignatura;
    #calificaciones = [];

    constructor(nombreAsignatura, calificaciones){
        this.nombreAsignatura = nombreAsignatura;
        this.#calificaciones = calificaciones;
    }

    //GETTERS Y SETTERS
    get nombreAsignatura(){
        return this.#nombreAsignatura;
    }
    set nombreAsignatura(nombreAsignatura){
        //compruebo que el valor introducido sea un string sino salta un error
        if(typeof(nombreAsignatura) === "string"){
            this.#nombreAsignatura = nombreAsignatura;
        }else{
            console.error("ERROR: El nombre de la asignatura no es válido.")
        }
    }

    get calificaciones(){
        return this.#calificaciones;
    }
    
    //MÉTODOS
    //Para añadir calificaciones creo un metodo ya que con setter borraria los valores anteriores
    aniadirCalificacion(calificacion){
        //Compruebo que el valor pasado como parámetro sea un número y que sea entre 0 y 10
        if(Number.isInteger(calificacion) && calificacion >= 0 && calificacion <= 10){
            this.#calificaciones.push(calificacion);
        }else{
            console.error("ERROR: La calificacion no es válida.");
        }
    }

    calcularPromedioCalificaciones(){
        //Si el array esta vacío, devuelve 0
        if(this.#calificaciones.length === 0){
            return 0;
        }
        //Si el array contiene valores hago la media
        const suma = this.#calificaciones.reduce((acumulador, elemntActual) => acumulador+elemntActual,0); //sumamos todos los valores del array
        //calculo la media y devuelvo un el resultado con 2 decimales
        return (suma/this.#calificaciones.length).toFixed(2);
    }

    

    toString(){
        return `Nombre: ${this.nombreAsignatura}, Calificaciones: ${this.calificaciones}`;
    }

}

//CLASE LISTAS
class Lista{
    #elementos;

    constructor(){
        this.#elementos = [];
    }

    //Agrgar elementos a la lista con push
    agregarElemento(elemento){
        this.#elementos.push(elemento);
    }

    //Elimino elementos pasandole un criterio (funcion)
    eliminarElemento(criterio){
        //uso el parametro para encontrar el indice
        const indice = this.#elementos.findIndex(criterio);
        if(indice !== -1){
            this.#elementos.splice(indice, 1);//Si lo encuentra, lo elimina
        }else{
            console.error("ERROR: No encontrado.");
        }
    }
    buscarElementos(criterio){
        return this.#elementos.filter(criterio);
    }
    obtenerElementos(){
        return [...this.#elementos];
    }
}

class ListaEstudiantes extends Lista{
    constructor(){
        super();
    }

    calcularPromedio(){
        //Declaro la  variable para acumular la suma total de los promedios
        let sumTotal = 0;
        //Declaro un contador de los estudiantes con notas registradas
        let stuConPromedio = 0;

        //Recojo todos los estuidantes de la lista
        for(const estudiante of this.obtenerElementos()){
            //Guardo en una variable el promedio de cada estudiante
            const promedio = estudiante.promedioCalificaciones();

            //Si hay promedio, es decir, calificaciones registradas, las acumulo en la suma total e incremento el contador de estudiantes con notas registradas
            if(promedio !== null){
                sumTotal += promedio;
                stuConPromedio++;
            }
        }

        //Si no hay estudiantes con notas registradas, lanzo una advertencia
        if(stuConPromedio === 0){
            console.warn(`No hay estudiantes con calificaciones. Pruebe a registrar uno.`);
            return null;
        }
        
        //Devuelvo el promedio general dividiendo la suma total entre el numero de estudiantes calificados
        return sumTotal / stuConPromedio;
    }

    buscarPorNombreEstudiante(patron){
        return this.buscarElementos(estudiante => patron.test(estudiante.nombre));
    }

    generarReporte(){
        //Recorro todos los estudiantes de la lista
        for(const estudiante of this.obtenerElementos()){
            //Guardo el promedio de calificaciones del estudiante
            const promedio = estudiante.promedioCalificaciones();
            
            const asignaturasCalificaciones = estudiante.asignaturas.map(([asignatura, calif]) => `${asignatura.nombreAsignatura}: ${calif ?? "Sin calificar"}`).join(", ");

            console.log(`Estudiante: ${estudiante.id} - ${estudiante.nombre}`);
            console.log(`Asignaturas y calificaciones: ${asignaturasCalificaciones}`);
            console.log(`Promedio: ${promedio ?? "Sin promedio"}`);
            console.log("\n");
        }

        //Devuelvo el reporte de todos los estudiantes
        return reporte;
    }

}

class ListaAsignaturas extends Lista {
    constructor(){
        super();
    }

    listarAsignaturas(){
        //Creo un array para guardar los nombres de las asignaturas.
        const nombres = [];

        //Recorro todas las asignaturas de la lista
        for(const asignatura of this.obtenerElementos()){
            //Voy añadiendo todos los nombres de las asignaturas al array nombres
            nombres.push(asignatura.nombreAsignatura);
        }

        //Devuelvo los nombres
        return nombres;
    }

    buscarPorNombre(patron){
        return this.buscarElementos(asignatura => patron.test(asignatura.nombreAsignatura));
    }


}

