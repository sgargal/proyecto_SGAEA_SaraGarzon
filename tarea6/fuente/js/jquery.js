$(document).ready(function() {
    const url = 'https://api.thecatapi.com/v1/images/search?limit=10';
    const options = {
        method: 'GET',
        headers: {
            'x-api-key': 'live_6eOlJ2ZjI0Ma8RZLVenJyfraL4Qo9Khr136UjFdstgiOLH1fEiVLiB6k54jreuvh'  
        }
    };

    // Función asincrónica para obtener las imágenes
    async function fetchImages(page = 1) {
        try {
            const response = await fetch(`${url}&page=${page}`, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result); // Muestra toda la respuesta de la API en la consola

            // No necesitamos acceder a result.success ni result.data.results, la respuesta es un array directamente
            if (result.length > 0) {
                displayImages(result); // Usamos directamente 'result', que es el array de imágenes
            } else {
                console.error('No se encontraron resultados en la respuesta');
            }
        } catch (error) {
            console.error('Error al obtener las imágenes:', error);
        }
    }

    // Función para mostrar las imágenes en el contenedor
    function displayImages(images) {
        const $container = $('#cardsContainer'); // Seleccionamos el contenedor con jQuery

        images.forEach(image => {
            const $card = $('<div>').addClass('card p-4 border rounded-lg mb-4 shadow-lg transition-transform transform hover:scale-105');
            
            const $img = $('<img>').attr('src', image.url || '')  // Usamos 'image.url' para la URL de la imagen
                                   .attr('alt', 'Imagen de un gato')  // Asegurándonos de que la descripción esté correctamente configurada
                                   .addClass('w-full h-40 object-cover rounded-lg');
            
            const $title = $('<h3>').text('Imagen de un gato')
                                    .addClass('mt-2 font-semibold text-lg text-gray-800');
            
            const $text = $('<p>').text('Una imagen graciosa de un gato.')
                                  .addClass('text-sm text-gray-600 mt-1');
            
            // Agregamos los elementos a la tarjeta
            $card.append($img, $title, $text);
            // Finalmente, agregamos la tarjeta al contenedor
            $container.append($card);
        });
    }

    let currentPage = 1;
    fetchImages(currentPage); // Inicializamos la carga de la primera página de imágenes

    // Implementamos el scroll infinito para cargar más imágenes cuando el usuario hace scroll
    $(window).on('scroll', function() {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
            currentPage++;
            fetchImages(currentPage);
        }
    });
});
