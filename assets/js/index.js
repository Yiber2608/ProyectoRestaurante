
// Simulación de una base de datos de reseñas
const reviewsDatabase = [
    { id: 1, name: "María González", rating: 5, comment: "¡Excelente comida y servicio! Los sabores del Caribe en su máxima expresión." },
    { id: 2, name: "Carlos Rodríguez", rating: 4, comment: "Muy buen ambiente y platos deliciosos. Volveré pronto." },
    { id: 3, name: "Ana Martínez", rating: 5, comment: "La mejor experiencia culinaria caribeña que he tenido. ¡Altamente recomendado!" },
    { id: 4, name: "Luis Hernández", rating: 4, comment: "Sabores auténticos y personal muy amable. Una grata sorpresa." },
    { id: 5, name: "Elena Díaz", rating: 5, comment: "Cada visita es una delicia. Los postres son imperdibles." }
];

// Función para generar las estrellas HTML basadas en la calificación
function generateStars(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += '<i class="bi bi-star-fill text-warning"></i>';
        } else {
            starsHTML += '<i class="bi bi-star text-warning"></i>';
        }
    }
    return starsHTML;
}

// Función para cargar las reseñas
function loadReviews() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = ''; // Limpiar el contenedor

    reviewsDatabase.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'swiper-slide';
        reviewElement.innerHTML = `
            <div class="card h-100 shadow ">
                <div class="card-body d-flex flex-column">
                    <h3 class="card-title h5 mb-3">${review.name}</h3>
                    <div class="mb-3">
                        ${generateStars(review.rating)}
                    </div>
                    <p class="card-text flex-grow-1">${review.comment}</p>
                </div>
            </div>
        `;
        reviewsContainer.appendChild(reviewElement);
    });

    // Inicializar o actualizar Swiper después de cargar las reseñas
    initSwiper();
}

// Función para inicializar Swiper
function initSwiper() {
    new Swiper(".reviews-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
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
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
    });
}

// Cargar las reseñas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadReviews);


// Simulación de una base de datos de novedades
const novedadesDatabase = [
    {
        id: 1,
        title: "Noche de Degustación",
        description: "Un evento especial donde podrás probar los mejores sabores de la temporada.",
        date: "15 de Agosto, 2024",
        icon: "calendar-event",  
        image: "/assets/img/menu-black.png",
        buttonText: "Reservar",
        buttonLink: "#"
    },
    {
        id: 2,
        title: "Nuevo Chef Ejecutivo",
        description: "¡Damos la bienvenida al Chef María García, quien aportará su visión y talento a nuestro restaurante!",
        date: "20 de Julio, 2024",
        icon: "person",
        image: "/assets/img/chef.png",
        buttonText: "Conoce más",
        buttonLink: "#"
    },
    {
        id: 3,
        title: "Nuevo Menú de Temporada",
        description: "¡Descubre nuestros nuevos platos con ingredientes frescos y sabores auténticos!",
        date: "1 de Septiembre, 2024",
        icon: "journal-text",
        image: "/assets/img/menu-black.png",
        buttonText: "Ver menú",
        buttonLink: "#"
    },
    {
        id: 4,
        title: "Premio Gastronómico",
        description: "Hemos sido reconocidos como el Mejor Restaurante del Año gracias a la dedicación de nuestro equipo y el apoyo de nuestros clientes.",
        date: "5 de Octubre, 2024",
        icon: "award",
        image: "/assets/img/menu.jpeg",
        buttonText: "Leer más",
        buttonLink: "#"
    },
    {
        id: 5,
        title: "Clase de Cocina",
        description: "Participa en nuestra clase de cocina y aprende a preparar platos caribeños con nuestro chef.",
        date: "10 de Noviembre, 2024",
        icon: "mortarboard",
        image: "/assets/img/menu-black.png",
        buttonText: "Inscríbete",
        buttonLink: "#"
    },
    {
        id: 6,
        title: "Clase de Cocina",
        description: "Participa en nuestra clase de cocina y aprende a preparar platos caribeños con nuestro chef.",
        date: "10 de Noviembre, 2024",
        icon: "mortarboard",
        image: "/assets/img/menu-black.png",
        buttonText: "Inscríbete",
        buttonLink: "#"
    }
];


// Función para cargar las novedades
function loadNovedades() {
    const novedadesContainer = document.getElementById('novedadesContainer');
    novedadesContainer.innerHTML = ''; // Limpiar el contenedor

    novedadesDatabase.forEach(novedad => {
        const novedadElement = document.createElement('div');
        novedadElement.className = 'swiper-slide';
        novedadElement.innerHTML = `
            <div class="card novedades-card border-0 ">
                <div class="card-body d-flex flex-column p-4">
                    <!-- Contenedor de la imagen (opcional) -->
                    ${novedad.image ? `
                    <div class="novedades-image mb-3">
                        <img src="${novedad.image}" alt="${novedad.title}" class="img-fluid rounded">
                    </div>
                    ` : ''}
                    
                    <!-- Título de la novedad -->
                    <h3 class=" fw-bold text-primary mb-2">${novedad.title}</h3>
                    
                    <!-- Descripción de la novedad -->
                    <p class="novedades-card-text text-muted">${novedad.description}</p>
                    
                    <!-- Fecha de publicación -->
                    <small class="text-muted mt-auto">Publicado el: ${novedad.date}</small>
                </div>
            </div>
        `;
        novedadesContainer.appendChild(novedadElement);
    });

    // Inicializar o actualizar Swiper después de cargar las novedades
    initNovedadesSwiper();
}

// Función para inicializar Swiper
function initNovedadesSwiper() {
    new Swiper(".novedades-swiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        coverflowEffect: {
            rotate: 45,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true, // Desactivar sombras en los slides
        },
        pagination: {
            el: ".swiper-pagination",
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
}


// Cargar las novedades cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadNovedades);