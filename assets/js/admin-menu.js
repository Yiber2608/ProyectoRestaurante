const itemsGlobal = [
    {
        id: 1,
        tipo: "Electrónico",
        nombre: "Smartphone X",
        descripcion: "Teléfono inteligente de última generación con cámara dual y pantalla OLED.",
        precio: 899.99,
        imagen: "./assets/img/prueba-entrada.png", // URL de una imagen de ejemplo
        estado: true, // Estado activo
    },
    {
        id: 2,
        tipo: "Electrodoméstico",
        nombre: "Lavadora Turbo",
        descripcion: "Lavadora de alta eficiencia con capacidad de 20 kg y múltiples modos de lavado.",
        precio: 499.99,
        imagen: "./assets/img/prueba-entrada.png",
        estado: true,
    },
    {
        id: 3,
        tipo: "Mueble",
        nombre: "Sofá de Cuero",
        descripcion: "Sofá cómodo de cuero genuino, ideal para salas modernas.",
        precio: 1299.99,
        imagen: "./assets/img/prueba-entrada.png",
        estado: false, // Estado inactivo
    },
    {
        id: 4,
        tipo: "Accesorio",
        nombre: "Reloj Inteligente",
        descripcion: "Reloj con funciones avanzadas como monitoreo de salud y GPS integrado.",
        precio: 199.99,
        imagen: "./assets/img/prueba-entrada.png",
        estado: true,
    },
    {
        id: 5,
        tipo: "Deportivo",
        nombre: "Bicicleta de Montaña",
        descripcion: "Bicicleta con marco de aluminio y suspensión doble, diseñada para terrenos difíciles.",
        precio: 749.99,
        imagen: "./assets/img/prueba-entrada.png",
        estado: false,
    },
];


// Cargar datos con jQuery AJAX
function loadData() {
    $.ajax({
        url: 'http://3.17.151.214/items', // Cambia esta URL por tu endpoint real
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                itemsGlobal = response.data; // Guarda los datos en la variable global
            } else {
                console.error('Error en la respuesta:', response.message);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error al realizar la solicitud AJAX:', error);
        }
    });
}


//funcio que crea la tabla con tabulator 
function buildTable() {
    const tableContainer = document.getElementById("table-container");

    const table = new Tabulator(tableContainer, {
        data: itemsGlobal, // Usa los datos de la constante global
        layout: "fitColumns", // Ajusta las columnas al contenedor
        responsiveLayout: "collapse", // Habilita el diseño responsive
        tableClass: "table table-striped table-bordered table-hover",
        pagination: "local", // Paginación local
        paginationSize: 10, // Número de filas por página
        locale: true, // Habilita la localización
        langs: {
            "es-419": { // Configuración en español
                "columns": {
                    "name": "Nombre",
                },
                "pagination": {
                    "first": "Primera",
                    "first_title": "Primera página",
                    "last": "Última",
                    "last_title": "Última página",
                    "prev": "Anterior",
                    "prev_title": "Página anterior",
                    "next": "Siguiente",
                    "next_title": "Página siguiente",
                    "page_size": "Tamaño de página",
                },
                "groups": {
                    "item": "ítem",
                    "items": "ítems",
                },
                "data": {
                    "loading": "Cargando datos...",
                    "error": "Error al cargar datos.",
                },
                "paginationCounter": {
                    "showing": "Mostrando",
                    "of": "de",
                    "pages": "páginas",
                },
            },
        },
        initialLocale: "es-419", // Idioma inicial
        paginationSizeSelector: [10, 20, 50, 100], // Selector de tamaño de página
        columns: [
            { title: "ID", field: "id", width: 80, hozAlign: "center", headerSort: false },
            { title: "Tipo", field: "tipo", widthGrow: 1 },
            { title: "Nombre", field: "nombre", widthGrow: 2 },
            {
                title: "Descripción",
                field: "descripcion",
                formatter: (cell) => {
                    const text = cell.getValue();
                    return `<div style="white-space: pre-wrap; word-wrap: break-word;">${text}</div>`;
                },
                widthGrow: 3.5
            },
            {
                title: "Precio",
                field: "precio",
                formatter: "money",
                formatterParams: { symbol: "$", precision: 2 },
                widthGrow: 1.2
            },
            {
                title: "Imagen",
                field: "imagen",
                formatter: () => `
                    <button class='btn bg-info btn-sm view-img-btn'>
                        <i class="bi bi-eye"></i>
                    </button>
                `,
                hozAlign: "center",
                widthGrow: 1.5,
                cellClick: (e, cell) => {
                    const imageUrl = cell.getRow().getData().imagen;
                    if (imageUrl) {
                        showImageModal(imageUrl);
                    } else {
                        alert("Este ítem no tiene imagen.");
                    }
                },
            },
            {
                title: "Estado",
                field: "estado",
                formatter: "tickCross",
                sorter: "boolean",
                hozAlign: "center",
                widthGrow: 1
            },
            {
                title: "Acciones",
                field: "acciones",
                hozAlign: "center",
                formatter: () => `
                    <button class='btn bg-warning btn-sm edit-btn'><i class="bi bi-pencil-square"></i></button>
                    <button class='btn fondo-rojo btn-sm delete-btn'><i class="bi bi-trash3-fill"></i></button>
                `,
                cellClick: (e, cell) => {
                    const button = e.target;
                    const row = cell.getRow();

                    if (button.classList.contains("edit-btn")) {
                        editItem(row.getData());
                    } else if (button.classList.contains("delete-btn")) {
                        const confirmDelete = confirm("¿Estás seguro de que quieres eliminar este ítem?");
                        if (confirmDelete) {
                            row.delete();
                            console.log("Ítem eliminado:", row.getData());
                        }
                    }
                },
                widthGrow: 2
            }
        ],
    });

    console.log("Tabla creada con éxito");
}


// Función para mostrar la imagen en un modal
function showImageModal(imageUrl) {
    // Actualizar el atributo "src" del <img> en el modal
    const modalImage = document.getElementById("modalImage");
    modalImage.src = imageUrl;

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById("imageModal"));
    modal.show();
}



// Método para ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    buildTable(); // Llama a la función para crear la tabla
    console.log("Tabla creada al cargar la página");
});

// Toggle Sidebar
document.querySelector('.toggle-btn').addEventListener('click', function () {
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.main');

    sidebar.classList.toggle('hidden');

    // Ajustar el ancho del main cuando el sidebar está oculto
    if (sidebar.classList.contains('hidden')) {
        main.style.width = '100%';
    } else {
        main.style.width = 'calc(100% - 90px)';
    }
});