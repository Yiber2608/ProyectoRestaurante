
// Primero validamos que solo los admins puedan acceder
document.addEventListener("DOMContentLoaded", () => {
    // Verificar si hay una sesión activa
    if (!AuthValidator.validateSession()) {
        window.location.href = '/index.html';
        return;
    }

    // Verificar si el usuario es admin
    if (!AuthValidator.validateRole('admin')) {
        window.location.href = '/index.html';
        return;
    }

    // Si pasa las validaciones, inicializar la aplicación
    initializeAdminDashboard();
});

function initializeAdminDashboard() {
    loadData();
}


let itemsGlobal = []


async function loadData() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:8080/api/v1/items', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (response.ok && data.success) {
            // Si la respuesta es exitosa
            itemsGlobal = data.data;
            buildTable(itemsGlobal);
            conteoItemsTarjetas();
        } else if (response.status === 401 || response.status === 403) {
            // Token inválido o expirado
            localStorage.removeItem('token');
            window.location.href = '/index.html';
        } else {
            // Manejo de errores específicos del backend
            handleError(`Error en la respuesta: ${data.message || 'Error desconocido'}`);
        }
    } catch (error) {
        // Manejo de errores de red o problemas en la solicitud
        console.error('Error al cargar los datos:', error);
        handleError('Error al cargar los datos. Por favor, intente nuevamente.');
    }
}


function handleError(message) {
    console.error(message);
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        showConfirmButton: true
    });
}


//funcio que crea la tabla con tabulator 
function buildTable(data) {
    const tableContainer = document.getElementById("table-container");

    const table = new Tabulator(tableContainer, {
        data: data, // Usa directamente los datos tal cual vienen
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
            { title: "Tipo", field: "typeItem", widthGrow: 1 }, // Usar 'typeItem' directamente
            { title: "Nombre", field: "name", widthGrow: 2 }, // Usar 'name' directamente
            {
                title: "Descripción",
                field: "description", // Usar 'description' directamente
                formatter: (cell) => {
                    const text = cell.getValue();
                    return `<div style="white-space: pre-wrap; word-wrap: break-word;">${text}</div>`;
                },
                widthGrow: 3.5
            },
            {
                title: "Precio",
                field: "unitPrice", // Usar 'unitPrice' directamente
                formatter: "money",
                formatterParams: { symbol: "$", precision: 2 },
                widthGrow: 1.2
            },
            {
                title: "Imagen",
                field: "imageUrl", // Usar 'imageUrl' directamente
                formatter: () => `
                    <button class='btn bg-info btn-sm view-img-btn'>
                        <i class="bi bi-eye"></i>
                    </button>
                `,
                hozAlign: "center",
                widthGrow: 1.5,
                cellClick: (e, cell) => {
                    const imageUrl = cell.getRow().getData().imageUrl;
                    if (imageUrl) {
                        showImageModal(imageUrl);
                    } else {
                        alert("Este ítem no tiene imagen.");
                    }
                },
            },
            {
                title: "Estado",
                field: "status", // Usar 'status' directamente
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
                    const target = e.target.closest('button');

                    if (target && target.classList.contains('edit-btn')) {
                        const itemId = cell.getRow().getData().id;
                        loadDataById(itemId);
                    } else if (target && target.classList.contains('delete-btn')) {
                        // Lógica para el botón de eliminación
                        const itemId = cell.getRow().getData().id;
                        deleteItem(itemId, cell.getRow()); // Llama a la función de eliminación
                    }
                }
                ,
                widthGrow: 2
            }
        ],
    });

    console.log("Tabla creada con éxito");
}

// Función de cargar cantidades
function conteoItemsTarjetas() {
    const conteos = {
        total: 0,
        "Entradas": 0,
        "Platos Principales": 0,
        "Postres": 0,
        "Bebidas Calientes": 0,
        "Otras Bebidas": 0
    };

    // Itera sobre itemsGlobal para contar
    for (let item of itemsGlobal) {
        conteos.total++;
        // Usar el valor de 'typeItem' para contar por tipo
        if (conteos[item.typeItem] !== undefined) {
            conteos[item.typeItem]++;
        }
    }

    // Actualiza los contadores en el DOM
    document.getElementById('totalItems').innerText = conteos.total;
    document.getElementById('totalEntradas').innerText = conteos["Entradas"];
    document.getElementById('totalPlatos').innerText = conteos["Platos Principales"];
    document.getElementById('totalPostres').innerText = conteos["Postres"];
    document.getElementById('totalBebidasCalientes').innerText = conteos["Bebidas Calientes"];
    document.getElementById('totalOtrasBebidas').innerText = conteos["Otras Bebidas"];
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


let searchTimeout; // Variable para almacenar el timeout

// Evento de Escuchar el filtro
document.getElementById("searchInput").addEventListener("input", function () {
    const searchTerm = this.value.trim().toLowerCase(); // Elimina espacios en blanco y convierte a minúsculas

    // Si hay menos de 3 caracteres, limpia la tabla
    if (searchTerm.length < 4) {
        buildTable(itemsGlobal); // Muestra todos los elementos
        return; // Sal del listener
    }

    // Retrasar la búsqueda para reducir eventos
    clearTimeout(searchTimeout); // Limpia cualquier timeout previo
    searchTimeout = setTimeout(() => {
        const filteredItems = itemsGlobal.filter(item => 
            item.nombre.toLowerCase().includes(searchTerm)
        );

        // Si no se encuentran resultados
        if (filteredItems.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'No se encontraron resultados',
                text: 'No hay productos que coincidan con tu búsqueda.',
                showConfirmButton: false,
                timer: 1500 // 1.5 segundos de duración
            });

            // No cargar la tabla vacía
            return;
        }

        // Si hay resultados, actualiza la tabla con los elementos filtrados
        buildTable(filteredItems);
    }, 300); // Retraso de 300ms antes de ejecutar el filtro
});


//Evento de previsuaviliazr imagen
document.getElementById('imagePreview').addEventListener('click', function () {
    document.getElementById('itemImage').click();
});

document.getElementById('itemImage').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const preview = document.getElementById('previewImage');
    const placeholder = document.getElementById('imagePlaceholder');
    const removeBtn = document.getElementById('removeImage');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            placeholder.style.display = 'none';
            removeBtn.classList.remove('d-none');
        };
        reader.readAsDataURL(file);
    }
});

// Evento de remover imagen
document.getElementById('removeImage').addEventListener('click', function () {
    const preview = document.getElementById('previewImage');
    const placeholder = document.getElementById('imagePlaceholder');
    const fileInput = document.getElementById('itemImage');
    const removeBtn = document.getElementById('removeImage');

    preview.src = '';
    preview.style.display = 'none';
    placeholder.style.display = 'block';
    fileInput.value = '';
    removeBtn.classList.add('d-none');
});


// Evento de filtro de tarjetas 
document.querySelectorAll('.card-clickeable').forEach(card => {
    card.addEventListener('click', () => {
        const cardId = card.id;

        // Diccionario de tipos para simplificar los filtros
        const tipos = {
            'cardEntradas': 'Entradas',
            'cardPlatosPrincipales': 'Platos Principales',
            'cardPostres': 'Postres',
            'cardBebidasCalientes': 'Bebidas Calientes',
            'cardOtrasBebidas': 'Otras Bebidas',
            'cardTodos': 'Todos'
        };

        // Mostrar spinner de carga
        Swal.fire({
            title: 'Cargando...',
            html: 'Por favor espera mientras se carga la información.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        setTimeout(() => {
            let filteredItems;

            // Si la tarjeta seleccionada es "Todos", no filtra
            if (cardId === 'cardTodos') {
                filteredItems = itemsGlobal;
            } else if (tipos[cardId]) {
                const tipo = tipos[cardId];

                // Filtrar los elementos de acuerdo al tipo de "typeItem" (campo del JSON)
                filteredItems = itemsGlobal.filter(item => item.typeItem === tipo);
            } else {
                Swal.close();
                alert('¡Hiciste clic en otra tarjeta!');
                return;
            }

            Swal.close();

            // Mostrar el resultado del filtro
            if (filteredItems.length > 0) {
                Swal.fire({
                    icon: "success",
                    title: "¡Datos cargados!",
                    text: `Se encontraron ${filteredItems.length} ${tipos[cardId]}${filteredItems.length > 1 ? '' : ''}.`,
                    timer: 2000, // 2 segundos
                    showConfirmButton: false,
                }).then(() => {
                    buildTable(filteredItems);
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Sin resultados",
                    text: `No se encontraron productos del tipo ${tipos[cardId]}.`,
                    timer: 2000, // 2 segundos
                    showConfirmButton: false,
                }).then(() => {
                    buildTable(itemsGlobal); // Mostrar todos los elementos si no hay resultados
                });
            }
        }, 1000); 
    });
});



// Método para ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    buildTable(itemsGlobal); // Llama a la función para crear la tabla
    conteoItemsTarjetas();
    console.log("Tabla creada al cargar la página");
});