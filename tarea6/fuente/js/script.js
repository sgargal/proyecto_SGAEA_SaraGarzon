// Definir la URL de la API y las opciones para la solicitud
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
    console.log(result);  // Muestra toda la respuesta de la API en la consola
    if (result && result.length > 0) {
      displayImages(result); // Muestra las imágenes
    } else {
      console.error('No se encontraron resultados en la respuesta');
    }
  } catch (error) {
    console.error('Error al obtener las imágenes:', error);
  }
}

// Función para mostrar las imágenes de gatos como tarjetas
function displayImages(images) {
  const container = document.getElementById('card-container');

  images.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('card', 'p-4', 'border', 'rounded-xl', 'mb-4', 'shadow-lg', 'transition-transform', 'transform', 'hover:scale-105', 'bg-white', 'overflow-hidden', 'max-w-xs', 'w-full', 'mx-auto');

    const img = document.createElement('img');
    img.src = image.url;  // URL de la imagen del gato
    img.alt = 'Gato';
    img.classList.add('w-full', 'h-56', 'object-cover', 'rounded-lg', 'border-4', 'border-gray-200');  // Usando clases para controlar tamaño

    const title = document.createElement('h3');
    title.textContent = 'Gato:    ';
    title.classList.add('mt-2', 'font-semibold', 'text-xl', 'text-gray-800', 'text-center');

    // Añadir un contenedor para la tarjeta para centrado adecuado
    const cardContent = document.createElement('div');
    cardContent.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'text-center');
    
    const text = document.createElement('p');
    text.textContent = 'Imagen de un adorable gato';
    text.classList.add('text-sm', 'text-gray-600', 'mt-1');

    cardContent.appendChild(title);
    cardContent.appendChild(text);

    card.appendChild(img);
    card.appendChild(cardContent);
    container.appendChild(card);
  });
}

// Inicializar la carga de las imágenes (primera página)
let currentPage = 1;
fetchImages(currentPage);

// Desplazamiento infinito: cargar más imágenes cuando se haga scroll hacia abajo
const scrollAnchor = document.getElementById('scroll-anchor');

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100) {
    currentPage++;
    fetchImages(currentPage);
  }
});
