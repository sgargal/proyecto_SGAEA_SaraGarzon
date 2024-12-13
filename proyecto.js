//PROYECTO SGAEA - SARA GARZÓN
//Lo primero que he hecho ha sido definir la clase dirección

//DEFINIR OBJETO DIRECCION (ATRIBUTO DE CLASE ESTUDIANTE)
class Direccion{
    #calle;
    #numero;
    #piso;
    #codigoPostal;
    #provincia;
    #localidad;

    //He declaro así el constructor ya que estoy llamando al setter porque ahí es donde hago las validaciones
    constructor(calle, numero, piso, codigoPostal, provincia, localidad){
        this.calle = calle;
        this.numero = numero;
        this.piso = piso;
        this.codigoPostal = codigoPostal;
        this.provincia = provincia;
        this.localidad = localidad;
    }

    //GETTERS Y SETTERS
    //En los setters hago las validaciones segun el tipo de dato que se va a guardar
    get calle(){
        return this.#calle;
    }

    set calle(calle){
        if(typeof calle === "string"){
            this.#calle = calle;
        }else{
            console.error(`ERROR: No es válida la calle`);
        }
        
    }

    get numero(){
        return this.#numero;
    }

    set numero(numero){
        if(typeof numero === "number"){
            this.#numero = numero;
        }else{
            console.error(`ERROR: No es válido el número.`);
        }

    }

    get piso(){
        return this.#piso;
    }

    set piso(piso){
        if(typeof piso === "number"){
            this.#piso = piso;
        }else{
            console.error(`ERROR: No es válido el piso.`);
        }
    }

    get codigoPostal(){
        return this.#codigoPostal;
    }

    set codigoPostal(codigoPostal){
        if(/^[0-9]{5}/.test(codigoPostal)){
            this.#codigoPostal = codigoPostal;
        }else{
            console.error(`ERROR: No es válido el código postal.`);
        }
        
    }

    get provincia(){
        return this.#provincia;
    }

    set provincia(provincia){
        if(typeof provincia === "string"){
            this.#provincia = provincia;
        }else{
            console.error(`ERROR: La provincia no es válida.`)
        }
        
    }

    get localidad(){
        return this.#localidad;
    }

    set localidad(localidad){
        if(typeof localidad === "string"){
            this.#localidad = localidad;
        }else{
            console.error(`ERROR: La localidad no es válida.`);
        }
        
    }

    toString(){
        return `Calle: ${this.calle}, Numero: ${this.numero}, Piso: ${this.piso}, Código Postal: ${this.codigoPostal}, Provincia: ${this.provincia}, Localidad: ${this.localidad}`;
    }
}
//DEFINIR CLASE PERSONA
//Defino la clase persona para implementar la herencia, si en un futuro se quisiera añadir por ejemplo un profesor podemos crear una clase hija a partir de esta.
//He declarado atributos comunes como el nombre, la edad y la direccion.
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
        if(/^[0-9]+$/.test(edad) && edad > 0 && edad <= 100){
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
    static numerosAsignados = [];//lo declaro static para que sea compartido por todas las instancias de la clase Estudiante
    #historial;

    constructor(id, nombre, edad, direccion){
        //Llamo al constructor de la clase pasre (PERSONA) para inicializar estos atributos
        super(nombre, edad, direccion);
        //Llamo al setter para aplicar la validacion y evitar la duplicacion
        this.id = id; 
        this.#asignaturas = [];//Se guarda la asignatura y las calificaciones 
        this.#historial = [];//Historial de matriculaciones y desmatriculaciones, la asignatura en la que se aplico y la fecha en la que se hizo
    }

    //Getters y setters
    //ID
    get id(){
        return this.#id; 
    }

    set id(id){//El id tiene que ser con el siguiente formato y además una vez que asignemos uno será guardado en el array de numerosAsignados
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
        return [...this.#asignaturas];
    }

    //Como he mencionado antes, historial guardara una actividad, una asignatura y la fecha.
    get historial(){
        if(this.#historial.length === 0){
            return [];
        }
        
        //Para que la fecha sea en español la formateo para que se devuelva con el formato que yo le he dado
        return this.#historial.map(([actividad, asignatura, fecha]) => {
            // const dia = String(fecha.getDate()).padStart(2,'0');
            // const mes = String(fecha.getMonth() + 1).padStart(2, '0');
            // const anio = fecha.getFullYear();
            const fechaFormateada = new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(fecha);

            return `${actividad} en ${asignatura} el ${fechaFormateada}`;
        });
    }

    //MÉTODOS
    toString(){ 
        let mostrarAsignaturas = "Sin asignaturas";
        if(this.#asignaturas.length>0){//Muestro el array de las asignaturas con sus calificaciones separadas por , y además si tiene calificacion la muestra si no muestra el siguiente mensaje: "Sin calificar"
            mostrarAsignaturas = this.#asignaturas.map(([asig, calif]) => `${asig.nombreAsignatura}: ${calif ?? "Sin calificar"}`).join(", ");
        }
        //Sobrecarga del metodo de la clase padre junto con los atributos de la clase Estudiante
        return `${super.toString()}, ID: ${this.id}, Asignaturas: [${mostrarAsignaturas}]`;
    }

    //MATRICULAR ALUMNO
    //En la clase matricular, lo primero que hago es comprobar si el estudiante ya está matriculado y si no, añado la asignatura sin calificaciones
    //Además en el array de historial registro la matriculación.
    matricular(asignatura, notas=[]){
        const matriculado = this.#asignaturas.some(asig => asig[0].nombreAsignatura === asignatura.nombreAsignatura);

        if(matriculado){
            console.error("ERROR: Ya esta matriculado");
            return;
        }

        this.#asignaturas.push([asignatura, notas]);
        this.#historial.push(["Matriculacion", asignatura.nombreAsignatura, new Date()]);

        console.log(`Se ha matriculado en ${asignatura.nombreAsignatura} correctamente.`);
    }

    //DESMATRICULAR ALUMNO
    //Compruebo que este matriculado, si lo está lo elimino y guardo el registro en el historial.
    desmatricular(asignatura){
        const ind = this.#asignaturas.findIndex(asig => asig[0].nombreAsignatura === asignatura.nombreAsignatura);

        if(ind === -1){
            console.error(`ERROR: No esta matriculado en la asignatura.`);
            return;
        }

        this.#asignaturas.splice(ind, 1);

        this.#historial.push(["Desmatriculación", asignatura.nombreAsignatura, new Date()]);
    }

    
    //AGREGAR NOTAS
    /*Primero compruebo que la asignatura este en la lista del estudiante.
    Luego también verifico que el estudiante esté matriculado en la asginatura y que la calificacion sea entre 0 y 10
    Asigno la calificación a la asignatura encontrada.*/
    agregarCalificacion(asignatura, calificacion){
        const asigEncontrada = this.#asignaturas.find(asig => asig[0].nombreAsignatura === asignatura.nombreAsignatura);

        if(!asigEncontrada){
            console.error(`ERROR: El estudiante no esta matriculado.`);
            return;
        }

        if(typeof calificacion !== 'number' || calificacion < 0 || calificacion > 10){
            console.error("ERROR: La calificación no es válida.");
            return;
        }

        if (asigEncontrada[1] === "Sin calificar") {
            asigEncontrada[1] = []; // Convertimos "Sin calificar" a un array
        }
    
        asigEncontrada[1].push(calificacion);

        //asigEncontrada[1]=calificacion;
        console.log(`La calificacion fue agregada correctamente.`);
    }
    //MEDIA DE LAS NOTAS
    /*Filtro las asignaturas del estudiante paara ver aquellas que tienen calificación
    Si no hay asignaturadas calificadas lanzo una advertencia
    Calcula la suma de las calificaciones y divido entre la cantidad de asignaturas calificadas y lo devuelvo con 2 decimales.
    */
    promedioCalificaciones(){
        const asignaturasCalificadas = this.#asignaturas.filter(asig => Array.isArray(asig[1]) && asig[1].length>0);
 
        if(asignaturasCalificadas.length === 0 ){
            console.warn("No hay calificaciones registradas para este estudiante.");
            return "Sin calificaciones";
        }
        
        let sum = 0;
        let totalCalificaciones = 0;

        for(const asig of asignaturasCalificadas){
            sum += asig[1].reduce((acumuladorCalificaciones, notaActual) => acumuladorCalificaciones + notaActual, 0);
            totalCalificaciones += asig[1].length;
        }
        // const sum = asignaturasCalificadas.reduce((acumulador, asig) => acumulador + asig[1], 0);
        return (sum / totalCalificaciones).toFixed(2);
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

}
//CLASE ASIGNATURAS
class Asignaturas{
    #nombreAsignatura;
    #calificaciones;

    constructor(nombreAsignatura){
        this.nombreAsignatura = nombreAsignatura;
        this.#calificaciones = [];
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

    //MÉTODOS
    //Para añadir calificaciones creo un metodo ya que con setter borraria los valores anteriores
    aniadirCalificacion(calificacion){
        //Compruebo que el valor pasado como parámetro sea un número y que sea entre 0 y 10
        if(Number.isInteger(calificacion) && calificacion >= 0 && calificacion <= 10){
            this.#calificaciones.push(calificacion);
            console.log(`La calificacion se ha añadido correctamente.`);
        }else{
            console.error("ERROR: La calificacion no es válida.");
        }
    }

    calcularPromedioCalificaciones(){
        //Si no hay calificaciones, devuelve 0 como promedio
        if(this.#calificaciones.length === 0){
            return 0;
        }
        //Si el array contiene valores hago la media, es decir, hay calificaciones
        const suma = this.#calificaciones.reduce((acumulador, calificacion) => acumulador+calificacion,0); //sumamos todos los valores del array
        //calculo la media y devuelvo un el resultado con 2 decimales
        return (suma / this.#calificaciones.length).toFixed(2);
    }

    toString(){
        return `Nombre: ${this.nombreAsignatura}, Calificaciones: ${this.#calificaciones}`;
    }

}

//CLASE LISTAS
class ListaEstudiantes{
    #listaEstu = [];

    constructor(){
        this.#listaEstu = [];
    }

    get listaEstu() {
        return this.#listaEstu;
    }

    //AGREGAR ESTUDIANTE
    /* Método para añadir un estudiante a la lista. Para ello:
    - Compruebo que no está ya añadido el estudiante en la lista
    - Si no existe lo añado y además lanzo un mensaje para que el usuario sea consciente y sea más claro
    */
    agregarEstudiante(estudiante){
        if(this.#listaEstu.some(est => est.id === estudiante.id)){
            console.error("El estudiante ya se encuentra en la lista.");
            return;
        }
        this.#listaEstu.push(estudiante);
        console.log(`Estudiante ${estudiante.nombre} agragado correctamente.`);
    }

    //ELIMINAR ESTUDIANTE
    /* Método para eliminar estudiante pasando como parametro el ID. Para ello: 
    - Busca el índice del estudiante en la lista utilizando su ID
    - Si no encuentra el estudiante, se muestra un error y finaliza la ejecución de la función
    - Si lo encuentra, lo elimina de la lista
    - Vuelvo a mostrar un mensaje para que sea más claro para el usuario.
    */
    eliminarEstudiante(id){
        //uso el parametro para encontrar el indice
        const indice = this.#listaEstu.findIndex(est => est.id === id);
        if(indice === -1){
            console.error("ERROR: No se encontró ese estudiante.");
            return;
        }
        this.#listaEstu.splice(indice, 1)
        console.log(`Estudiante con ID ${id} ha siso eliminado correctamente.`);
    }

    //BUSCAR ESTUDIANTE
    /*En este método se espera dar como resultado aquellos estudiantes que su nombre coincida parcialmente con lo que el usuario escriba por teclado
    Para ello: 
    - Filtra los estudiantes en la lista cuyo nombre coincida sin importar si es mayuscula o minuscula
    - Si no hay resutlados, lanza un mensaje 
    - Si hay resultados, recorre la lista de estudiantes que se han encontrado y los muestra.
    */
    buscarEstudiantes(nombre){
        const estudiantesEncontrados = this.#listaEstu.filter(est => est.nombre.toLowerCase().includes(nombre.toLowerCase()));

        if(estudiantesEncontrados.length === 0){
            console.log("No hay resultados para tu búsqueda.");
        }else{
            estudiantesEncontrados.forEach(est => console.log(est.toString()));
        }
    }

    //MOSTRAR LISTA ESTUDIANTES
    /* Método para mostrar los estudiantes de la lista. Para ello:
    - Si la lista esta vacía, lanza un error de que no hay estudiantes
    - Si la lista tiene estudiantes, la recorre y los muestra. 
    */
    mostrarListaEstudiantes(){
        if(this.#listaEstu.length === 0){
            console.error("No hay estudiantes registrados.");
            return;
        }
        this.#listaEstu.forEach(est => console.log(est.toString()));
    }
}

class ListaAsignaturas{
    #listaAsignaturas = [];

    constructor(){
        this.#listaAsignaturas = [];
    }

    get listaAsignaturas(){
        return this.#listaAsignaturas;
    }
    agregarAsignatura(asignatura){
        if(this.#listaAsignaturas.some(asig => asig.nombreAsignatura === asignatura.nombreAsignatura)){
            console.error("La asignatura ya fue añadida anteriormente.");
            return;
        }
        this.#listaAsignaturas.push(asignatura);
        console.log(`Asignatura añadida correctamente.`);
    }

    eliminarAsignatura(nombreAsignatura){
        const ind = this.#listaAsignaturas.findIndex(asig => asig.nombreAsignatura === nombreAsignatura);

        if(ind === -1){
            console.error("ERROR: No ese ha encontrado la asignatura.");
            return;
        }

        this.#listaAsignaturas.splice(ind, 1);
        console.log(`${nombreAsignatura} ha sido correctamente eliminada.`);
    }

    buscarAsignaturas(nombre){
        const asignaturasEncontradas = this.#listaAsignaturas.filter(asig => asig.nombreAsignatura.toLowerCase().includes(nombre.toLowerCase()));

        if(asignaturasEncontradas.length === 0){
            console.log("No se han encontrado resultados.");
        }else{
            asignaturasEncontradas.forEach(asig => console.log(asig.toString()));
        }
    }

    mostrarListaAsignaturas(){
        if(this.#listaAsignaturas.length === 0){
            console.error("No hay asignaturas creadas.");
            return;
        }
        this.#listaAsignaturas.forEach(asig => console.log(asig.toString()));
    }
}

//PROGRAMA PRINCIPAL

//Instacio algunos objetos para hacer pruebas

const listaEstudiantes = new ListaEstudiantes();
const listaAsignaturas = new ListaAsignaturas();

const estudiante1 = new Estudiante("123E", "Sara", 19, new Direccion("Calle Flor", 2, 3, 18013, "Granada", "Granada"));
const estudiante2 = new Estudiante("124E", "Santiago", 23, new Direccion("Calle Real", 3, 4, 18014, "Granada", "Granada"));
const estudiante3 = new Estudiante("125E", "Samuel", 25, new Direccion("Calle Nueva", 5, 2, 20029, "Cordoba", "Cordoba"));

listaEstudiantes.agregarEstudiante(estudiante1);
listaEstudiantes.agregarEstudiante(estudiante2);
listaEstudiantes.agregarEstudiante(estudiante3);

const asignatura1 = new Asignaturas("DWEC");
const asignatura2 = new Asignaturas("DWES");
const asignatura3 = new Asignaturas("DIW");

listaAsignaturas.agregarAsignatura(asignatura1);
listaAsignaturas.agregarAsignatura(asignatura2);
listaAsignaturas.agregarAsignatura(asignatura3);

estudiante1.matricular(asignatura1);

//En vez de hacer los menus dentro del switch creo funciones para mostrar cada menú y submenu y tener más claro el código.

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

function menuCrear(){
    console.log(`
        +-----    MENÚ     ----+ 
        | 1. Crear Estudiante  | 
        | 2. Crear Asignatura  | 
        | 3. Salir             | 
        +----------------------+
    `);
}

function menuEliminar(){
    console.log(`
        +-----     MENÚ       ----+ 
        | 1. Eliminar Estudiante  | 
        | 2. Eliminar Asignatura  | 
        | 3. Salir                | 
        +-------------------------+
    `);
}

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

                if(promedio === ""){
                    console.log("Este estudiante no tiene calificaciones.");
                }else{
                    console.log(`El promedio del estudiante es ${promedio}`);
                }
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