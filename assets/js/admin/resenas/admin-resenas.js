// Primero validamos que solo los admins puedan acceder
let reviewsTable; // Variable global para la tabla
let itemsGlobal = []; // Mantener los datos globales

document.addEventListener("DOMContentLoaded", async () => {
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
    await initializeAdminDashboard();
});

async function initializeAdminDashboard() {
    await loadReviews();
    initializeCardListeners();
}

async function loadReviews() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/index.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/v1/reviews', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (response.ok && data.success) {
            itemsGlobal = data.data; // Guardar los datos en la variable global
            buildTable(itemsGlobal); // Construir la tabla inicial
        } else if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token');
            window.location.href = '/index.html';
        } else {
            handleError(`Error en la respuesta: ${data.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error al cargar las reseñas:', error);
        handleError('Error al cargar las reseñas. Por favor, intente nuevamente.');
    }
}

function buildTable(data) {
    const tableContainer = document.getElementById("table-container");
    
    // Si ya existe una tabla, destruirla
    if (reviewsTable) {
        reviewsTable.destroy();
    }

    reviewsTable = new Tabulator(tableContainer, {
        data: data, // Usar directamente los datos pasados
        layout: "fitColumns",
        responsiveLayout: "collapse",
        tableClass: "table table-striped table-bordered table-hover",
        pagination: "local",
        paginationSize: 10,
        locale: true,
        langs: {
            "es-419": {
                "columns": {
                    "name": "Nombre",
                    "email": "Correo electrónico",
                    "rating": "Calificación",
                    "comment": "Comentario",
                    "createdAt": "Fecha de creación"
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
                "data": {
                    "loading": "Cargando datos...",
                    "error": "Error al cargar datos.",
                }
            },
        },
        initialLocale: "es-419",
        paginationSizeSelector: [10, 20, 50, 100],
        columns: [
            { title: "ID", field: "id", width: 80, hozAlign: "center", headerSort: false },
            { title: "Nombre", field: "name", widthGrow: 2 },
            { title: "Correo electrónico", field: "email", widthGrow: 2 },
            { title: "Calificación", field: "rating", hozAlign: "center", formatter: "star", widthGrow: 1.5 },
            {
                title: "Comentario",
                field: "comment",
                formatter: (cell) => {
                    const text = cell.getValue();
                    return `<div style="white-space: pre-wrap; word-wrap: break-word;">${text}</div>`;
                },
                widthGrow: 3
            },
            {
                title: "Fecha de creación",
                field: "createdAt",
                formatter: (cell) => {
                    const date = new Date(cell.getValue());
                    return date.toLocaleString("es-419", { dateStyle: "short", timeStyle: "short" });
                },
                widthGrow: 2
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
                    if (!target) return;

                    const resenaId = cell.getRow().getData().id;
                    if (target.classList.contains('edit-btn')) {
                        loadDataById(resenaId);
                    } else if (target.classList.contains('delete-btn')) {
                        deleteResena(resenaId, cell.getRow());
                    }
                },
                widthGrow: 2
            }
        ],
    });
}

function initializeCardListeners() {
    document.querySelectorAll('.card-clickeable').forEach(card => {
        card.addEventListener('click', () => {
            const cardId = card.id;
            filterReviews(cardId);
        });
    });
}

function filterReviews(cardId) {
    const estrellas = {
        'card1Estrella': 1,
        'card2Estrellas': 2,
        'card3Estrellas': 3,
        'card4Estrellas': 4,
        'card5Estrellas': 5,
        'cardTodos': 'Todos'
    };

    Swal.fire({
        title: 'Cargando...',
        html: 'Por favor espera mientras se filtran los datos.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    setTimeout(() => {
        let resenasFiltradas;
        
        if (cardId === 'cardTodos') {
            resenasFiltradas = itemsGlobal;
        } else {
            const rating = estrellas[cardId];
            resenasFiltradas = itemsGlobal.filter(item => item.rating === rating);
        }

        Swal.close();

        if (resenasFiltradas && resenasFiltradas.length > 0) {
            const mensaje = cardId === 'cardTodos' 
                ? `Se encontraron ${resenasFiltradas.length} reseñas en total.`
                : `Se encontraron ${resenasFiltradas.length} reseñas con ${estrellas[cardId]} ${estrellas[cardId] === 1 ? 'estrella' : 'estrellas'}.`;

            Swal.fire({
                icon: "success",
                title: "¡Datos filtrados!",
                text: mensaje,
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                buildTable(resenasFiltradas);
            });
        } else {
            Swal.fire({
                icon: "info",
                title: "Sin resultados",
                text: `No se encontraron reseñas con ${estrellas[cardId]} ${estrellas[cardId] === 1 ? 'estrella' : 'estrellas'}.`,
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                buildTable(itemsGlobal);
            });
        }
    }, 1000);
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
