// Datos simulados de restaurantes
const restaurants = [
    {
        id: 1,
        name: "Sede Principal",
        address: "Calle 100 #15-20, Bogotá",
        description: "Nuestra sede principal con la mejor experiencia caribeña.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [4.6871, -74.0451]
    },
    {
        id: 2,
        name: "Sucursal Centro",
        address: "Carrera 7 #32-35, Bogotá",
        description: "Ubicada en el corazón de la ciudad.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [4.6097, -74.0817]
    },
    {
        id: 3,
        name: "Sucursal Norte",
        address: "Calle 127 #15-35, Bogotá",
        description: "Nuestra sucursal en el norte de la ciudad.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [4.7110, -74.0336]
    },
    {
        id: 4,
        name: "Sucursal Chapinero",
        address: "Carrera 13 #63-39, Bogotá",
        description: "Disfruta de nuestros sabores en Chapinero.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [4.6496, -74.0640]
    },
    {
        id: 5,
        name: "Sucursal Usaquén",
        address: "Calle 116 #7-15, Bogotá",
        description: "Visítanos en el corazón de Usaquén.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [4.6954, -74.0306]
    },
    {
        id: 6,
        name: "Sucursal Suba",
        address: "Calle 145 #91-19, Bogotá",
        description: "Lleva el sabor del Caribe a Suba.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [4.7437, -74.0876]
    },
    {
        id: 7,
        name: "Sucursal Kennedy",
        address: "Avenida Boyacá #6B-20, Bogotá",
        description: "Nuestra presencia en el occidente de la ciudad.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [4.6305, -74.1527]
    },
    {
        id: 8,
        name: "Sucursal Fontibón",
        address: "Calle 17 #96G-65, Bogotá",
        description: "Descubre nuestros sabores en Fontibón.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [4.6760, -74.1416]
    },
    {
        id: 9,
        name: "Sucursal Teusaquillo",
        address: "Carrera 24 #33-17, Bogotá",
        description: "Visítanos en el tradicional barrio de Teusaquillo.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [4.6280, -74.0760]
    },
    {
        id: 10,
        name: "Sucursal Candelaria",
        address: "Calle 11 #5-60, Bogotá",
        description: "Disfruta de nuestros platos en el centro histórico.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [4.5964, -74.0740]
    },

    {
        id: 11,
        name: "Sucursal Nueva York",
        address: "5th Avenue, New York, NY",
        description: "Sabores del Caribe en el corazón de Nueva York.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [40.7128, -74.0060]
    },
    {
        id: 12,
        name: "Sucursal Brooklyn",
        address: "Manhattan Ave, Brooklyn, NY",
        description: "Nuestra experiencia caribeña en Brooklyn.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [40.6782, -73.9442]
    },
    {
        id: 13,
        name: "Sucursal París",
        address: "Champs-Élysées, París",
        description: "Sabores únicos en el centro de París.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [48.8566, 2.3522]
    },
    {
        id: 14,
        name: "Sucursal Tokio",
        address: "Shibuya, Tokio",
        description: "Disfruta de la comida caribeña en Tokio.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [35.6895, 139.6917]
    },
    {
        id: 15,
        name: "Sucursal Osaka",
        address: "Namba, Osaka",
        description: "Sabores exóticos en Osaka.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [34.6937, 135.5023]
    },
    {
        id: 16,
        name: "Sucursal Londres",
        address: "Piccadilly, Londres",
        description: "Disfruta del Caribe en el corazón de Londres.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [51.5074, -0.1278]
    },
    {
        id: 17,
        name: "Sucursal Berlín",
        address: "Alexanderplatz, Berlín",
        description: "Caribe y cultura en Berlín.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [52.5200, 13.4050]
    },
    {
        id: 18,
        name: "Sucursal Madrid",
        address: "Gran Vía, Madrid",
        description: "Sabores caribeños en el centro de Madrid.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [40.4168, -3.7038]
    },
    {
        id: 19,
        name: "Sucursal Barcelona",
        address: "Las Ramblas, Barcelona",
        description: "Disfruta del Caribe en Barcelona.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [41.3851, 2.1734]
    },
    {
        id: 20,
        name: "Sucursal Roma",
        address: "Via del Corso, Roma",
        description: "Caribe y tradición en Roma.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [41.9028, 12.4964]
    },
    {
        id: 21,
        name: "Sucursal Ciudad de México",
        address: "Paseo de la Reforma, Ciudad de México",
        description: "Lleva el Caribe al corazón de México.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [19.4326, -99.1332]
    },
    {
        id: 22,
        name: "Sucursal Cancún",
        address: "Boulevard Kukulcán, Cancún",
        description: "Caribe en el paraíso de Cancún.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [21.1619, -86.8515]
    },
    {
        id: 23,
        name: "Sucursal Buenos Aires",
        address: "Avenida Corrientes, Buenos Aires",
        description: "Sabores del Caribe en Buenos Aires.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [-34.6037, -58.3816]
    },
    {
        id: 24,
        name: "Sucursal Río de Janeiro",
        address: "Copacabana, Río de Janeiro",
        description: "Disfruta del Caribe en la costa de Río.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [-22.9068, -43.1729]
    },
    {
        id: 25,
        name: "Sucursal Sidney",
        address: "Opera House, Sidney",
        description: "La experiencia caribeña en Sidney.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [-33.8688, 151.2093]
    },
    {
        id: 26,
        name: "Sucursal Dubái",
        address: "Burj Khalifa, Dubái",
        description: "Disfruta del Caribe en Dubái.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [25.2048, 55.2708]
    },
    {
        id: 27,
        name: "Sucursal Johannesburgo",
        address: "Nelson Mandela Square, Johannesburgo",
        description: "Sabores tropicales en Sudáfrica.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [-26.2041, 28.0473]
    },
    {
        id: 28,
        name: "Sucursal Singapur",
        address: "Orchard Road, Singapur",
        description: "Caribe en el corazón de Asia.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [1.3521, 103.8198]
    },
    {
        id: 29,
        name: "Sucursal Hong Kong",
        address: "Tsim Sha Tsui, Hong Kong",
        description: "Sabores del Caribe en Hong Kong.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [22.3193, 114.1694]
    },
    {
        id: 30,
        name: "Sucursal Los Ángeles",
        address: "Hollywood Blvd, Los Ángeles",
        description: "La experiencia caribeña en Hollywood.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [34.0522, -118.2437]
    },
    {
        id: 11,
        name: "Sucursal Medellín Centro",
        address: "Carrera 50 #50-12, Medellín",
        description: "Una experiencia caribeña en el centro de Medellín.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [6.2442, -75.5732]
    },
    {
        id: 12,
        name: "Sucursal Laureles",
        address: "Circular 4 #70-90, Medellín",
        description: "Disfruta de nuestros sabores en el corazón de Laureles.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [6.2448, -75.5901]
    },
    {
        id: 13,
        name: "Sucursal Envigado",
        address: "Calle 30 Sur #45A-66, Envigado",
        description: "Nuestra sucursal en Envigado, sabores auténticos y caribeños.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [6.1679, -75.5806]
    },
    {
        id: 14,
        name: "Sucursal Cali Norte",
        address: "Avenida 6 Norte #23-50, Cali",
        description: "Sabores del Caribe en el norte de Cali.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [3.4516, -76.5310]
    },
    {
        id: 15,
        name: "Sucursal Cali San Fernando",
        address: "Calle 5 #34-23, Cali",
        description: "Visítanos en San Fernando para una experiencia caribeña.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [3.4372, -76.5485]
    },
    {
        id: 16,
        name: "Sucursal Barranquilla Centro",
        address: "Carrera 41 #36-12, Barranquilla",
        description: "El sabor del Caribe en el centro de Barranquilla.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [10.9794, -74.8019]
    },
    {
        id: 17,
        name: "Sucursal Barranquilla Buenavista",
        address: "Calle 99 #52-20, Barranquilla",
        description: "Ubicados en Buenavista, disfruta de nuestra sazón.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [11.0041, -74.8145]
    },
    {
        id: 18,
        name: "Sucursal Cartagena Bocagrande",
        address: "Avenida San Martín #5-25, Cartagena",
        description: "Sabor caribeño en el corazón turístico de Cartagena.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [10.3983, -75.5618]
    },
    {
        id: 19,
        name: "Sucursal Cartagena Centro Histórico",
        address: "Calle de la Media Luna #10-33, Cartagena",
        description: "Disfruta de nuestro sabor en el Centro Histórico de Cartagena.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [10.4236, -75.5478]
    },
    {
        id: 20,
        name: "Sucursal Bucaramanga Cabecera",
        address: "Carrera 35 #48-72, Bucaramanga",
        description: "Nuestra sazón caribeña en el centro de Bucaramanga.",
        image: "https://via.placeholder.com/300x200",
        coordinates: [7.1193, -73.1227]
    }
];

let map; // Variable global que contendrá el objeto del mapa Leaflet.
let markers = []; // Array para almacenar los marcadores de las sedes.

// Función para inicializar el mapa
function initMap() {
    // Crear el mapa centrado en la primera sede y añadir el mapa base de OpenStreetMap.
    map = L.map('map').setView(restaurants[0].coordinates, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Añadir un marcador para cada sede en el mapa
    restaurants.forEach(restaurant => {
        const marker = L.marker(restaurant.coordinates).addTo(map);
        marker.bindPopup(restaurant.name); // Mostrar nombre al hacer clic
        marker.on('click', () => updateRestaurantInfo(restaurant)); // Al hacer clic, actualizar la info del restaurante
        markers.push(marker); // Guardar el marcador en el array de markers
    });

    // Añadir evento al botón de búsqueda
    document.getElementById('searchButton').addEventListener('click', handleSearch);

    // Ajustar el mapa a la pantalla
    makeMapResponsive();
}

function handleSearch() {
    const searchInput = document.getElementById('searchInput').value;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const { lat, lon, boundingbox } = data[0];

                // Obtener los límites del área de búsqueda
                const bounds = [
                    [parseFloat(boundingbox[0]), parseFloat(boundingbox[2])], // coordenada suroeste
                    [parseFloat(boundingbox[1]), parseFloat(boundingbox[3])]  // coordenada noreste
                ];

                // Ajustar el mapa automáticamente al área buscada
                map.fitBounds(bounds);

                // Filtrar restaurantes que estén dentro del área de búsqueda usando los límites
                const nearbyRestaurants = restaurants.filter(restaurant => {
                    const [rlat, rlon] = restaurant.coordinates;
                    return rlat >= bounds[0][0] && rlat <= bounds[1][0] &&
                        rlon >= bounds[0][1] && rlon <= bounds[1][1];
                });

                // Mostrar los restaurantes encontrados en el área de búsqueda
                if (nearbyRestaurants.length > 0) {
                    document.getElementById("tittle").textContent = `Resultados "${searchInput}" (${nearbyRestaurants.length}) `;
                    //tab continuar
                    createRestaurantsItems(nearbyRestaurants)
                } else {
                    document.getElementById("tittle").textContent = `Todas las Sedes (${restaurants.length})`;
                    createRestaurantsItems(restaurants);
                    alert(`No se encontraron restaurantes en el área de "${searchInput} ".`);
                }
            } else {
                document.getElementById("tittle").textContent = `Todas las Sedes (${restaurants.length})`;
                createRestaurantsItems(restaurants);
                alert('No se encontró la ubicación. Por favor, intenta con otra búsqueda.');
            }
        })
        .catch(error => {
            console.error('Error en la búsqueda:', error);
            alert('Hubo un error en la búsqueda. Por favor, intenta de nuevo.');
        });
}


// Función para encontrar el restaurante más cercano a las coordenadas especificadas
function findNearestRestaurant(lat, lon) {
    return restaurants.reduce((nearest, restaurant) => {
        const [rlat, rlon] = restaurant.coordinates;
        const distance = Math.sqrt(Math.pow(lat - rlat, 2) + Math.pow(lon - rlon, 2));
        return distance < nearest.distance ? { restaurant, distance } : nearest;
    }, { restaurant: restaurants[0], distance: Infinity }).restaurant;
}

// Función para ajustar el tamaño del mapa al tamaño de la ventana del navegador
function makeMapResponsive() {
    function updateMapSize() {
        map.invalidateSize(); // Actualiza el tamaño del mapa al cambiar el tamaño de la ventana
    }

    // Añadir eventos para actualizar el tamaño del mapa cuando cambia el tamaño de la ventana o la orientación del dispositivo
    window.addEventListener('resize', updateMapSize);
    window.addEventListener('orientationchange', updateMapSize);
    window.addEventListener('load', updateMapSize);
}

// Inicializar el mapa cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', initMap);


function createRestaurantsItems(items) {
    const wrapper = document.querySelector(`#restaurantSwiper .swiper-wrapper`);
    wrapper.innerHTML = ''; // Limpia las tarjetas existentes

    items.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.address}</p>
                    <p class="card-text">${item.description}</p>
                    <img src="${item.image}" class="img-fluid restaurant-info-image" alt="${item.name}">
                </div>
            </div>
        `;
        wrapper.appendChild(slide);
    });

    // Reinicia Swiper para que tome en cuenta las nuevas tarjetas
    swiper.update();
}
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3, // Muestra un máximo de 3 puntos alrededor del punto activo
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
    },
});


// Llama a la función después de que el DOM esté cargado sin ejecutar inmediatamente
document.addEventListener('DOMContentLoaded', () => createRestaurantsItems(restaurants));
