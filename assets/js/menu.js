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
    Entradas: [
        {
            id: 1,
            name: "Empanadas Colombianas",
            description:
                "Crujientes empanadas de carne y papa acompañadas de ají casero.",
            price: 12000,
            image:
                "https://img.freepik.com/foto-gratis/empanadas-tradicionales-rellenas-carne_23-2148541990.jpg",
        },
        {
            id: 2,
            name: "Arepa de Choclo",
            description: "Arepa dulce de maíz servida con queso fundido.",
            price: 15000,
            image:
                "https://img.freepik.com/foto-gratis/arepa-colombiana-tradicional-maiz_23-2148542001.jpg",
        },
        {
            id: 3,
            name: "Ceviche de Camarones",
            description:
                "Delicioso ceviche de camarones con limón, cilantro y cebolla morada.",
            price: 18000,
            image:
                "https://img.freepik.com/foto-gratis/delicioso-ceviche-camarones-preparado_23-2148542015.jpg",
        },
        {
            id: 4,
            name: "Nachos con Queso",
            description: "Nachos crujientes cubiertos con queso fundido y jalapeños.",
            price: 14000,
            image:
                "https://img.freepik.com/foto-gratis/nachos-mexicanos-queso-derretido_23-2148542030.jpg",
        },
        {
            id: 5,
            name: "Tostones",
            description: "Plátanos verdes fritos y aplastados, servidos con salsa.",
            price: 10000,
            image:
                "https://img.freepik.com/foto-gratis/tostones-platanos-fritos-tipicos-latinoamericanos_23-2148542045.jpg",
        },
        {
            id: 6,
            name: "Arepas Rellenas",
            description: "Arepas rellenas de queso y carne molida.",
            price: 16000,
            image:
                "https://img.freepik.com/foto-gratis/arepas-rellenas-queso-carne_23-2148542060.jpg",
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
                "https://img.freepik.com/foto-gratis/pabellon-criollo-plato-tipico-venezolano_23-2148542075.jpg",
        },
        {
            id: 8,
            name: "Sancocho Trifásico",
            description:
                "Sopa tradicional con carne de res, cerdo y pollo, acompañada de yuca, papa y plátano.",
            price: 32000,
            image:
                "https://img.freepik.com/foto-gratis/sancocho-colombiano-tradicional-tres-carnes_23-2148542090.jpg",
        },
        {
            id: 9,
            name: "Bandeja Paisa",
            description:
                "Plato típico colombiano con carne, frijoles, arroz, huevo, plátano y aguacate.",
            price: 30000,
            image:
                "https://img.freepik.com/foto-gratis/bandeja-paisa-plato-tipico-colombiano_23-2148542105.jpg",
        },
        {
            id: 10,
            name: "Cazuela de Mariscos",
            description:
                "Guiso cremoso de mariscos con leche de coco y especias caribeñas.",
            price: 35000,
            image:
                "https://img.freepik.com/foto-gratis/cazuela-mariscos-plato-costa-colombiana_23-2148542120.jpg",
        },
        {
            id: 11,
            name: "Pescado Frito",
            description: "Pescado frito entero con arroz de coco y ensalada.",
            price: 26000,
            image:
                "https://img.freepik.com/foto-gratis/pescado-frito-entero-arroz-cocina-latina_23-2148542135.jpg",
        },
        {
            id: 12,
            name: "Pollo Asado",
            description: "Pollo asado con papas y vegetales a la parrilla.",
            price: 24000,
            image:
                "https://img.freepik.com/foto-gratis/pollo-asado-parrilla-verduras_23-2148542150.jpg",
        },
    ],
    Postres: [
        {
            id: 13,
            name: "Flan de Coco",
            description: "Suave y cremoso flan de coco, con un toque tropical.",
            price: 8000,
            image:
                "https://img.freepik.com/foto-gratis/flan-coco-postre-cremoso_23-2148542165.jpg",
        },
        {
            id: 14,
            name: "Tres Leches",
            description: "Pastel tradicional empapado en tres tipos de leche.",
            price: 9000,
            image:
                "https://img.freepik.com/foto-gratis/pastel-tres-leches-postre-tradicional-latino_23-2148542180.jpg",
        },
        {
            id: 15,
            name: "Arroz con Leche",
            description: "Cremoso arroz con leche con toque de canela.",
            price: 7000,
            image:
                "https://img.freepik.com/foto-gratis/arroz-leche-postre-tradicional_23-2148542195.jpg",
        },
        {
            id: 16,
            name: "Natilla",
            description: "Postre típico navideño de maíz, canela y panela.",
            price: 6000,
            image:
                "https://img.freepik.com/foto-gratis/natilla-postre-navideno-colombiano_23-2148542210.jpg",
        },
        {
            id: 17,
            name: "Torta Negra",
            description: "Pastel tradicional navideño con frutas confitadas.",
            price: 10000,
            image:
                "https://img.freepik.com/foto-gratis/torta-negra-pastel-navideno-colombiano_23-2148542225.jpg",
        },
        {
            id: 18,
            name: "Postre de Natas",
            description: "Delicado postre cremoso tradicional colombiano.",
            price: 8500,
            image:
                "https://img.freepik.com/foto-gratis/postre-natas-delicado-cremoso_23-2148542240.jpg",
        },
    ],
    "Bebidas Calientes": [
        {
            id: 19,
            name: "Café Colombiano",
            description: "Café orgánico 100% colombiano, servido caliente.",
            price: 5000,
            image:
                "https://img.freepik.com/foto-gratis/cafe-colombiano-taza-caliente_23-2148542255.jpg",
        },
        {
            id: 20,
            name: "Chocolate Caliente",
            description: "Delicioso chocolate caliente hecho con cacao puro.",
            price: 6000,
            image:
                "https://img.freepik.com/foto-gratis/chocolate-caliente-taza-blanca_23-2148542270.jpg",
        },
        {
            id: 21,
            name: "Té de Hierbas",
            description: "Infusión de hierbas frescas con un toque de miel.",
            price: 4000,
            image:
                "https://img.freepik.com/foto-gratis/te-hierbas-taza-transparente_23-2148542285.jpg",
        },
        {
            id: 20,
            name: "Chocolate Caliente",
            description: "Delicioso chocolate caliente hecho con cacao puro.",
            price: 6000,
            image:
                "https://img.freepik.com/foto-gratis/chocolate-caliente-taza-blanca_23-2148542270.jpg",
        },
        {
            id: 21,
            name: "Té de Hierbas",
            description: "Infusión de hierbas frescas con un toque de miel.",
            price: 4000,
            image:
                "https://img.freepik.com/foto-gratis/te-hierbas-taza-transparente_23-2148542285.jpg",
        },
    ],
    "Otras Bebidas": [
        {
            id: 22,
            name: "Jugo de Mango",
            description: "Refrescante jugo de mango natural.",
            price: 7000,
            image:
                "https://img.freepik.com/foto-gratis/jugo-mango-taza-vidrio_23-2148542300.jpg",
        },
        {
            id: 23,
            name: "Limonada de Coco",
            description: "Limonada casera con un toque de coco.",
            price: 7500,
            image:
                "https://img.freepik.com/foto-gratis/limonada-coco-vaso-alto_23-2148542315.jpg",
        },
        {
            id: 24,
            name: "Refresco de Tamarindo",
            description: "Bebida refrescante de tamarindo natural.",
            price: 6500,
            image:
                "https://img.freepik.com/foto-gratis/refresco-tamarindo-vaso-cristal_23-2148542330.jpg",
        },
        {
            id: 23,
            name: "Limonada de Coco",
            description: "Limonada casera con un toque de coco.",
            price: 7500,
            image:
                "https://img.freepik.com/foto-gratis/limonada-coco-vaso-alto_23-2148542315.jpg",
        },
        {
            id: 23,
            name: "Limonada de Coco",
            description: "Limonada casera con un toque de coco.",
            price: 7500,
            image:
                "https://img.freepik.com/foto-gratis/limonada-coco-vaso-alto_23-2148542315.jpg",
        },
    ],
};


// function createMenuItems() {
//     for (const [category, items] of Object.entries(menuData)) {
//         const wrapper = document.querySelector(`#collapse${category.replace(/\s+/g, '')} .swiper-wrapper`);
//         items.forEach(item => {
//             const slide = document.createElement('div');
//             slide.className = 'swiper-slide';
//             slide.innerHTML = `
//                 <div class="card h-100">
//                     <img src="${item.image}" class="card-img-top" alt="${item.name}">
//                     <div class="card-body d-flex flex-column">
//                         <h5 class="card-title">${item.name}</h5>
//                         <p class="card-text flex-grow-1">${item.description}</p>
//                         <div class="d-flex justify-content-between align-items-center mt-3">
//                             <span class="h5 mb-0">$${item.price.toLocaleString()}</span>
//                             <button class="btn btn-primary">Ordenar</button>
//                         </div>
//                     </div>
//                 </div>
//             `;
//             wrapper.appendChild(slide);
//         });
//     }
// }

function createMenuItems() {
    for (const [category, items] of Object.entries(menuData)) {
        const wrapper = document.querySelector(`#container${category.replace(/\s+/g, '')} .swiper-wrapper`);
        items.forEach(item => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="card h-100 shadow-sm">
                            <img src="${item.image}" class="card-img-top" alt="${item.name}">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">${item.description}</p>
                                <p class="card-text text-success fw-bold">$${item.price.toLocaleString()}</p>
                            </div>
                        </div>
            `;
            wrapper.appendChild(slide);
        });
    }
}

// Call this function after the DOM is loaded
document.addEventListener('DOMContentLoaded', createMenuItems);