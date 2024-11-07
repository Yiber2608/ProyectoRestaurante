// Inicialización del mapa
var map = L.map('map').setView([4.60971, -74.08175], 6); // Coordenadas centradas en Colombia

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Información de los locales del restaurante
var markers = [
    { coords: [4.60971, -74.08175], info: 'Local en Bogotá: Calle 123 #45-67', img: 'https://via.placeholder.com/150' },
    { coords: [6.25184, -75.56359], info: 'Local en Medellín: Carrera 98 #12-34', img: 'https://via.placeholder.com/150' },
    { coords: [3.43722, -76.5225], info: 'Local en Cali: Avenida 45 #23-56', img: 'https://via.placeholder.com/150' }
];

// Función para abrir el modal con información y imagen
function onMarkerClick(markerInfo, markerImg) {
    var modal = document.getElementById('markerModal');
    document.getElementById('markerInfo').innerText = markerInfo;
    document.getElementById('markerImage').src = markerImg;
    modal.classList.remove('d-none'); // Mostrar el modal
}

// Función para cerrar el modal
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('markerModal').classList.add('d-none'); // Ocultar el modal
});

// Agregar los marcadores al mapa
markers.forEach(function(markerData) {
    var marker = L.marker(markerData.coords).addTo(map);
    marker.on('click', function() {
        onMarkerClick(markerData.info, markerData.img);
    });
});