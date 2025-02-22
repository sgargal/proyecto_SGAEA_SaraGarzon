document.addEventListener("DOMContentLoaded", () => {
    const formularioBuscar = document.createElement("form");
    formularioBuscar.innerHTML = `
        <label for="tipoBusqueda">Buscar por:</label>
        <select id="tipoBusqueda">
            <option value="estudiante">Estudiante</option>
            <option value="asignatura">Asignatura</option>
        </select>
        <input type="text" id="campoBusqueda" placeholder="Ingrese el nombre...">
        <button type="submit">Buscar</button>
    `;
    document.querySelector("main section").appendChild(formularioBuscar);
    
    const resultadoBusqueda = document.createElement("div");
    resultadoBusqueda.id = "resultadoBusqueda";
    document.querySelector("main section").appendChild(resultadoBusqueda);
    
    formularioBuscar.addEventListener("submit", (event) => {
        event.preventDefault();
        const tipo = document.getElementById("tipoBusqueda").value;
        const nombre = document.getElementById("campoBusqueda").value.trim();
        
        if (nombre === "") {
            resultadoBusqueda.innerHTML = "<p>Por favor, ingrese un nombre válido.</p>";
            return;
        }

        if (tipo === "estudiante") {
            buscarEstudiantes(nombre);
        } else {
            buscarAsignaturas(nombre);
        }
    });
});

function obtenerListaEstudiantes() {
    return JSON.parse(localStorage.getItem("estudiantes")) || [];
}

function obtenerListaAsignaturas() {
    return JSON.parse(localStorage.getItem("asignaturas")) || [];
}

function buscarEstudiantes(nombre) {
    const listaEstudiantes = obtenerListaEstudiantes();
    const estudiantesEncontrados = listaEstudiantes.filter(est => est.nombre.toLowerCase().includes(nombre.toLowerCase()));
    mostrarResultados(estudiantesEncontrados, "estudiantes");
}

function buscarAsignaturas(nombre) {
    const listaAsignaturas = obtenerListaAsignaturas();
    const asignaturasEncontradas = listaAsignaturas.filter(asig => 
        asig && asig.nombre && asig.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    mostrarResultados(asignaturasEncontradas, "asignaturas");
}


function mostrarResultados(resultados, tipo) {
    const resultadoBusqueda = document.getElementById("resultadoBusqueda");
    resultadoBusqueda.innerHTML = "";
    
    if (resultados.length === 0) {
        resultadoBusqueda.innerHTML = `<p>No se han encontrado ${tipo} con ese nombre.</p>`;
    } else {
        const lista = document.createElement("ul");
        resultados.forEach(item => {
            const elemento = document.createElement("li");
            elemento.textContent = item.nombre || item.nombreAsignatura;
            lista.appendChild(elemento);
        });
        resultadoBusqueda.appendChild(lista);
    }
}
