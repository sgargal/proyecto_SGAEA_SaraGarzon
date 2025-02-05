# PROYECTO SGAEA - MANEJO DE ESTUDIANTES Y ASIGNATURAS

## DESCRIPCIÓN
Este proyecto implementa un sistema de gestión de estudiantes y asignaturas. Se incluyen clases para representar estudiantes, asignaturas y las listas de ambos objetos. También permite realizar acciones sobre ellos como matricular a los estudiantes en asignaturas, desmatricularlos, calificarlos, etc.

## ESTRUCTURA DEL CÓDIGO
### CLASES PRINCIPALES
 - **Direccion**: Representa la direccion de una persona
 - **Persona**: Clase base para más tarde representar a un estudiante
 - **Estudiante**: Hereda de persona, incluyendo atributos más especificos de un estudiante como es id, asignaturas, etc.
 - **Asignaturas**: Representa una asignatura con su nombre y calificaciones
 - **ListaEstudiantes**: Gestiona un grupo de estudiantes
 - **ListaAsignaturas**: Gestiona las asignaturas

### FUNCIONES PRINCIPALES
 - Matricular y desmatricular
 - Calificar estudiantes
 - Calcular promedio de calificaciones
 - Buscar estudiantes y asignaturas por nombre
 - Generar reportes de los estudiantes
 - Menús interactivos

 ### PASOS REALIZADOS
 1. **Instalación de Node.js**:
 - Se instaló Node.js mediante su página web y ejecutar scripts en JavaScript.
 2. **Instalación de JSDoc**
 - JSDoc se instaló utilizando npm con el siguiente comando: 
        npm install -g jsdoc
 3. **Añadir comentarios JSDoc al código**
 - Añadí comentarios JSDoc a mi código para documentarlo correctamente.
 4. **Creación de un Script npm para automatizar JSDoc**
 - He creado el script `package.json` para automatizar la generación de la documentacion con JSDoc. 
 - También he creado un arhivo de configuración `jsdoc.json` para especificar las opciones de JSDoc.


## AUTOR
 - **SARA GARZÓN GALDEANO**