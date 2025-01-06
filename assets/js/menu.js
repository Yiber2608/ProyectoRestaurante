

// tab configurar datos db

// This would typically be loaded from a file or database
const menuData = {
    Entradas: [
        {
            id: 1,
            name: "Empanadas Colombianas",
            description:
                "Crujientes empanadas de carne y papa acompañadas de ají casero.",
            price: 12000,
            image:"https://drive.google.com/file/d/14q34dc83IyjNjV5I_ACjkfA6pAGaYKFK/view",
        },
        {
            id: 2,
            name: "Arepa de Choclo",
            description: "Arepa dulce de maíz servida con queso fundido.",
            price: 15000,
            image:"./assets/img/prueba-entrada.png",
        },
        {
            id: 3,
            name: "Ceviche de Camarones",
            description:
                "Delicioso ceviche de camarones con limón, cilantro y cebolla morada.",
            price: 18000,
            image:"./assets/img/prueba-entrada.png",
        },
        {
            id: 4,
            name: "Nachos con Queso",
            description: "Nachos crujientes cubiertos con queso fundido y jalapeños.",
            price: 14000,
            image:"./assets/img/prueba-entrada.png",
        },
        {
            id: 5,
            name: "Tostones",
            description: "Plátanos verdes fritos y aplastados, servidos con salsa.",
            price: 10000,
            image:"./assets/img/prueba-entrada.png",
        },
        {
            id: 6,
            name: "Arepas Rellenas",
            description: "Arepas rellenas de queso y carne molida.",
            price: 16000,
            image:"./assets/img/prueba-entrada.png",
                
        },
    ],
    "Platos Principales": [
        {
            id: 7,
            name: "Pabellón Criollo",
            description:
                "Tradicional plato venezolano con carne desmechada, arroz, plátano frito y frijoles negros.",
            price: 28000,
            image:
                "./assets/img/prueba-plato.png",
        },
        {
            id: 8,
            name: "Sancocho Trifásico",
            description:
                "Sopa tradicional con carne de res, cerdo y pollo, acompañada de yuca, papa y plátano.",
            price: 32000,
            image:
                "./assets/img/prueba-plato.png",
        },
        {
            id: 9,
            name: "Bandeja Paisa",
            description:
                "Plato típico colombiano con carne, frijoles, arroz, huevo, plátano y aguacate.",
            price: 30000,
            image:
                "./assets/img/prueba-plato.png",
        },
        {
            id: 10,
            name: "Cazuela de Mariscos",
            description:
                "Guiso cremoso de mariscos con leche de coco y especias caribeñas.",
            price: 35000,
            image:
                "./assets/img/prueba-plato.png",
        },
        {
            id: 11,
            name: "Pescado Frito",
            description: "Pescado frito entero con arroz de coco y ensalada.",
            price: 26000,
            image:
                "./assets/img/prueba-plato.png",
        },
        {
            id: 12,
            name: "Pollo Asado",
            description: "Pollo asado con papas y vegetales a la parrilla.",
            price: 24000,
            image:
                "./assets/img/prueba-plato.png",
        },
    ],
    Postres: [
        {
            id: 13,
            name: "Flan de Coco",
            description: "Suave y cremoso flan de coco, con un toque tropical.",
            price: 8000,
            image:
                "./assets/img/prueba-postre.png",
        },
        {
            id: 14,
            name: "Tres Leches",
            description: "Pastel tradicional empapado en tres tipos de leche.",
            price: 9000,
            image:
            "./assets/img/prueba-postre.png",
        },
        {
            id: 15,
            name: "Arroz con Leche",
            description: "Cremoso arroz con leche con toque de canela.",
            price: 7000,
            image:
            "./assets/img/prueba-postre.png",
        },
        {
            id: 16,
            name: "Natilla",
            description: "Postre típico navideño de maíz, canela y panela.",
            price: 6000,
            image:
            "./assets/img/prueba-postre.png",
        },
        {
            id: 17,
            name: "Torta Negra",
            description: "Pastel tradicional navideño con frutas confitadas.",
            price: 10000,
            image:
            "./assets/img/prueba-postre.png",
        },
        {
            id: 18,
            name: "Postre de Natas",
            description: "Delicado postre cremoso tradicional colombiano.",
            price: 8500,
            image:
            "./assets/img/prueba-postre.png",
        },
    ],
    "Bebidas Calientes": [
        {
            id: 19,
            name: "Café Colombiano",
            description: "Café orgánico 100% colombiano, servido caliente.",
            price: 5000,
            image:
            "./assets/img/prueba-bcaliente.png",
        },
        {
            id: 20,
            name: "Chocolate Caliente",
            description: "Delicioso chocolate caliente hecho con cacao puro.",
            price: 6000,
            image:
            "./assets/img/prueba-bcaliente.png",
        },
        {
            id: 21,
            name: "Té de Hierbas",
            description: "Infusión de hierbas frescas con un toque de miel.",
            price: 4000,
            image:
            "./assets/img/prueba-bcaliente.png",
        },
        {
            id: 20,
            name: "Chocolate Caliente",
            description: "Delicioso chocolate caliente hecho con cacao puro.",
            price: 6000,
            image:
            "./assets/img/prueba-bcaliente.png",
        },
        {
            id: 21,
            name: "Té de Hierbas",
            description: "Infusión de hierbas frescas con un toque de miel.",
            price: 4000,
            image:
            "./assets/img/prueba-bcaliente.png",
        },
    ],
    "Otras Bebidas": [
        {
            id: 22,
            name: "Jugo de Mango",
            description: "Refrescante jugo de mango natural.",
            price: 7000,
            image:
            "./assets/img/prueba-bfria.png",
        },
        {
            id: 23,
            name: "Limonada de Coco",
            description: "Limonada casera con un toque de coco.",
            price: 7500,
            image:
            "./assets/img/prueba-bfria.png",
        },
        {
            id: 24,
            name: "Refresco de Tamarindo",
            description: "Bebida refrescante de tamarindo natural.",
            price: 6500,
            image:
            "./assets/img/prueba-bfria.png",
        },
        {
            id: 23,
            name: "Limonada de Coco",
            description: "Limonada casera con un toque de coco.",
            price: 7500,
            image:
            "./assets/img/prueba-bfria.png",
        },
        {
            id: 23,
            name: "Limonada de Coco",
            description: "Limonada casera con un toque de coco.",
            price: 7500,
            image:
            "./assets/img/prueba-bfria.png",
        },
    ],
};


function createMenuItems() {
    for (const [category, items] of Object.entries(menuData)) {
        const wrapper = document.querySelector(`#container${category.replace(/\s+/g, '')} .swiper-wrapper`);
        items.forEach(item => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="card h-100 shadow-sm bg bg-gradient-primary-to-success py-1">
                            <img src="${item.image}" class="card-img-top" alt="${item.name}">
                            <div class="card-body">
                                <h5 class="fw-bold">${item.name}</h5>
                                <p class="card-text text-black-50">${item.description}</p>
                                <p class="card-text text-danger fw-bold">$${item.price.toLocaleString()}</p>
                            </div>
                        </div>
            `;
            wrapper.appendChild(slide);
        });
    }
}
var swiper = new Swiper(".mySwiper", {
    grabCursor: true,
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

// Call this function after the DOM is loaded
document.addEventListener('DOMContentLoaded', createMenuItems);