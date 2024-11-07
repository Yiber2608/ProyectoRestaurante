var swiper = new Swiper(".mySwiper", {
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

// tab configurar datos db

// This would typically be loaded from a file or database
const menuData = {
    "Entradas": [
        { id: 1, name: "Bandeja Paisa", description: "Plato típico colombiano", price: 25000, image: "https://via.placeholder.com/300x200?text=Bandeja+Paisa" },
        { id: 2, name: "Ajiaco", description: "Sopa tradicional bogotana", price: 20000, image: "https://via.placeholder.com/300x200?text=Ajiaco" },
        { id: 1, name: "Bandeja Paisa", description: "Plato típico colombiano", price: 25000, image: "https://via.placeholder.com/300x200?text=Bandeja+Paisa" },
        { id: 2, name: "Ajiaco", description: "Sopa tradicional bogotana", price: 20000, image: "https://via.placeholder.com/300x200?text=Ajiaco" },
        { id: 1, name: "Bandeja Paisa", description: "Plato típico colombiano", price: 25000, image: "https://via.placeholder.com/300x200?text=Bandeja+Paisa" },
        { id: 2, name: "Ajiaco", description: "Sopa tradicional bogotana", price: 20000, image: "https://via.placeholder.com/300x200?text=Ajiaco" },
    ],
    "Platos Principales": [
        { id: 3, name: "Bandeja Paisa", description: "Plato típico colombiano", price: 25000, image: "https://via.placeholder.com/300x200?text=Bandeja+Paisa" },
        { id: 4, name: "Ajiaco", description: "Sopa tradicional bogotana", price: 20000, image: "https://via.placeholder.com/300x200?text=Ajiaco" },
        { id: 3, name: "Bandeja Paisa", description: "Plato típico colombiano", price: 25000, image: "https://via.placeholder.com/300x200?text=Bandeja+Paisa" },
        { id: 4, name: "Ajiaco", description: "Sopa tradicional bogotana", price: 20000, image: "https://via.placeholder.com/300x200?text=Ajiaco" },
        { id: 3, name: "Bandeja Paisa", description: "Plato típico colombiano", price: 25000, image: "https://via.placeholder.com/300x200?text=Bandeja+Paisa" },
        { id: 4, name: "Ajiaco", description: "Sopa tradicional bogotana", price: 20000, image: "https://via.placeholder.com/300x200?text=Ajiaco" },
        { id: 3, name: "Bandeja Paisa", description: "Plato típico colombiano", price: 25000, image: "https://via.placeholder.com/300x200?text=Bandeja+Paisa" },
        { id: 4, name: "Ajiaco", description: "Sopa tradicional bogotana", price: 20000, image: "https://via.placeholder.com/300x200?text=Ajiaco" },
    ],
    "Postres": [
        { id: 5, name: "Arroz con Leche", description: "Postre tradicional", price: 7000, image: "https://via.placeholder.com/300x200?text=Arroz+con+Leche" },
        { id: 6, name: "Brevas con Arequipe", description: "Dulce típico", price: 8000, image: "https://via.placeholder.com/300x200?text=Brevas+con+Arequipe" },
        { id: 5, name: "Arroz con Leche", description: "Postre tradicional", price: 7000, image: "https://via.placeholder.com/300x200?text=Arroz+con+Leche" },
        { id: 6, name: "Brevas con Arequipe", description: "Dulce típico", price: 8000, image: "https://via.placeholder.com/300x200?text=Brevas+con+Arequipe" },
        { id: 5, name: "Arroz con Leche", description: "Postre tradicional", price: 7000, image: "https://via.placeholder.com/300x200?text=Arroz+con+Leche" },
        { id: 6, name: "Brevas con Arequipe", description: "Dulce típico", price: 8000, image: "https://via.placeholder.com/300x200?text=Brevas+con+Arequipe" },
        { id: 5, name: "Arroz con Leche", description: "Postre tradicional", price: 7000, image: "https://via.placeholder.com/300x200?text=Arroz+con+Leche" },
        { id: 6, name: "Brevas con Arequipe", description: "Dulce típico", price: 8000, image: "https://via.placeholder.com/300x200?text=Brevas+con+Arequipe" },
    ]
};

function createMenuItems() {
    for (const [category, items] of Object.entries(menuData)) {
        const wrapper = document.querySelector(`#collapse${category.replace(/\s+/g, '')} .swiper-wrapper`);
        items.forEach(item => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="card h-100">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text flex-grow-1">${item.description}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="h5 mb-0">$${item.price.toLocaleString()}</span>
                            <button class="btn btn-primary">Ordenar</button>
                        </div>
                    </div>
                </div>
            `;
            wrapper.appendChild(slide);
        });
    }
}

// Call this function after the DOM is loaded
document.addEventListener('DOMContentLoaded', createMenuItems);