# Tarea 6 - JavaScript y Fetch API
## Descripción del Proyecto
Este proyecto consiste en mostrar imágenes de gatos en una página web utilizando la API pública TheCatAPI. Las imágenes se obtienen dinámicamente mediante solicitudes fetch, y se muestran en un diseño responsivo utilizando TailwindCSS. Además, implementa una funcionalidad de scroll infinito que carga más imágenes a medida que el usuario se desplaza hacia abajo en la página.

## Características
- Carga dinámica de imágenes: Las imágenes de gatos se cargan automáticamente al hacer scroll hacia abajo.
- Diseño responsivo: Las imágenes se muestran en un diseño de tarjetas responsivo utilizando TailwindCSS, adaptándose a diferentes tamaños de pantalla.
- Uso de API: Se hace uso de la API pública de TheCatAPI para obtener imágenes aleatorias de gatos.
- Scroll infinito: A medida que el usuario hace scroll hacia el final de la página, se cargan más imágenes de manera automática.
- Flujo de Trabajo

### Este proyecto está estructurado de la siguiente manera:

- index.html: La estructura básica del HTML donde se cargan las imágenes de gatos.
- jquery.js (o script.js): El archivo JavaScript que contiene la lógica para interactuar con la API de TheCatAPI. En este archivo se realizan las peticiones fetch para obtener las imágenes y se agrega la funcionalidad de scroll infinito.
- output.css: El archivo generado por TailwindCSS que contiene las reglas de estilo para hacer que las imágenes se muestren de manera atractiva y responsiva.

## Flujo del Proyecto:
- Solicitud a la API: El archivo jquery.js hace una solicitud GET a la API de TheCatAPI para obtener un conjunto de 10 imágenes de gatos.
- Mostrar las imágenes: Las imágenes obtenidas de la API se muestran como tarjetas en la página, con la URL de la imagen, un título y una pequeña descripción.
- Scroll Infinito: Cuando el usuario hace scroll hasta el final de la página, el script carga más imágenes, incrementando la página solicitada a la API y agregándolas a la vista.

## Tecnologías Utilizadas
- JavaScript (ES6+): Para interactuar con la API y manejar la lógica del proyecto.
- Fetch API: Para hacer solicitudes HTTP a TheCatAPI.
- TailwindCSS: Para diseñar el sitio web con un enfoque de diseño responsivo y moderno.
- HTML5: Estructura básica del sitio web.
- jQuery: Para manejar eventos como el scroll y la manipulación del DOM
