

// Simulación de bases de datos
const reviewsDatabase = [
    { id: 1, name: "María González", rating: 5, comment: "¡Excelente comida y servicio!" },
    { id: 2, name: "Carlos Rodríguez", rating: 4, comment: "Muy buen ambiente y platos deliciosos." },
    { id: 3, name: "Ana Martínez", rating: 5, comment: "¡Altamente recomendado!" },
    { id: 4, name: "Luis Hernández", rating: 4, comment: "Sabores auténticos y personal amable." },
    { id: 5, name: "Elena Díaz", rating: 5, comment: "Cada visita es una delicia." }
];

const novedadesDatabase = [
    { id: 1, title: "Noche de Degustación", description: "Un evento especial donde probarás lo mejor.", date: "15 de Agosto, 2024" },
    { id: 2, title: "Nuevo Chef Ejecutivo", description: "Damos la bienvenida al Chef María García.", date: "20 de Julio, 2024" },
    { id: 3, title: "Nuevo Menú de Temporada", description: "Descubre nuestros nuevos platos.", date: "1 de Septiembre, 2024" },
    { id: 1, title: "Noche de Degustación", description: "Un evento especial donde probarás lo mejor.", date: "15 de Agosto, 2024" },
    { id: 2, title: "Nuevo Chef Ejecutivo", description: "Damos la bienvenida al Chef María García.", date: "20 de Julio, 2024" },
    { id: 3, title: "Nuevo Menú de Temporada", description: "Descubre nuestros nuevos platos.", date: "1 de Septiembre, 2024" }
];

// Generar estrellas HTML
const generateStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => 
        `<i class="bi ${i < rating ? 'bi-star-fill' : 'bi-star'} text-warning"></i>`
    ).join('');
};

// Generar tarjeta HTML genérica
const generateCardHTML = (data, type) => {
    if (type === "review") {
        return `
            <div class="card card-basic h-100 shadow" data-aos="fade-right">
                <div class="card-body d-flex flex-column">
                    <h3 class="card-title h5 mb-3">${data.name}</h3>
                    <div class="mb-3">${generateStars(data.rating)}</div>
                    <p class="card-text flex-grow-1">${data.comment}</p>
                </div>
            </div>`;
    } else if (type === "novedad") {
        return `
            <div class="card card-basic novedades-card border-0" data-aos="fade-right">
                <div class="card-body d-flex flex-column p-4">
                    <h3 class="fw-bold text-primary mb-2">${data.title}</h3>
                    <p class="novedades-card-text text-muted">${data.description}</p>
                    <small class="text-muted mt-auto">Publicado el: ${data.date}</small>
                </div>
            </div>`;
    }
};

// Cargar datos en contenedores
const loadContent = (database, containerId, type) => {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    database.forEach(data => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = generateCardHTML(data, type);
        container.appendChild(slide);
    });
};

// Inicializar Swiper genérico
const initSwiper = (selector, config) => {
    new Swiper(selector, config);
};

// Configuraciones de Swiper
const reviewsSwiperConfig = {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    autoplay: { delay: 3000, disableOnInteraction: false },
    breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 30 },
        1024: { slidesPerView: 4, spaceBetween: 30 }
    }
};

const novedadesSwiperConfig = {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: { rotate: 45, depth: 100, modifier: 1 },
    pagination: { el: ".swiper-pagination" },
    autoplay: { delay: 3000, disableOnInteraction: false }
};

// Eventos DOM
document.addEventListener('DOMContentLoaded', () => {
    loadContent(reviewsDatabase, 'reviewsContainer', 'review');
    loadContent(novedadesDatabase, 'novedadesContainer', 'novedad');
    initSwiper(".reviews-swiper", reviewsSwiperConfig);
    initSwiper(".novedades-swiper", novedadesSwiperConfig);
});


        // Manejar el envío del formulario de contacto
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            Swal.fire({
                title: '¡Mensaje enviado!',
                text: 'Gracias por contactarnos. Te responderemos pronto.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        });