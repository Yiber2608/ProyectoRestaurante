const itemsGlobal= []

// Cargar datos con jQuery AJAX
function loadData() {
    $.ajax({
        url: 'http://3.17.151.214/items', // Cambia esta URL por tu endpoint real
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                itemsGlobal = response.data; // Guarda los datos en la variable global
                buildTable(); // Construye la tabla 
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
        data: itemsGlobal,
        layout: "fitColumns",
        responsiveLayout: "collapse",
        tableClass: "table table-striped table-bordered table-hover",
        pagination: "local",
        paginationSize: 10,
        locale: true,
        langs: {
            "es-419": { // Cambia "es-es" por "es-419"
                "columns": {
                    "name": "Nombre", // Traducción de columnas (si es dinámico)
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
        initialLocale: "es-419",
        paginationSizeSelector: [10, 20, 50, 100],
        columns: [
            { title: "#", field: "id", width: 80, hozAlign: "center", headerSort: false, headerFilter: true },
            { title: "Código", field: "code", headerFilter: true, widthGrow: 1 },
            { title: "Tipo", field: "typeItem", headerFilter: true, widthGrow: 1 },
            { title: "Nombre", field: "name", headerFilter: true, widthGrow: 2 },
            { title: "Descripción", field: "description", widthGrow: 3.5 },
            { title: "Precio Unitario", field: "unitPrice", formatter: "money", formatterParams: { symbol: "$", precision: 2 }, widthGrow: 1.2 },
            { title: "Precio Venta", field: "salesPrice", formatter: "money", formatterParams: { symbol: "$", precision: 2 }, widthGrow: 1 },
            { title: "Total Impuestos", field: "totalTaxes", formatter: "money", formatterParams: { symbol: "$", precision: 2 }, widthGrow: 1.2 },
            { title: "Estado", field: "status", formatter: "tickCross", sorter: "boolean", hozAlign: "center", widthGrow: 0.99 },
            {
                title: "Impuestos",
                formatter: () => "<button class='btn btn-dark btn-sm'><i class='bx bx-show me-2'></i> Ver</button>",
                hozAlign: "center",
                widthGrow: 1,
                cellClick: (e, cell) => {
                    const itemId = cell.getRow().getData().id;
                    showTaxesModal(itemId);
                },
            },
            {
                title: "Items Combo",
                formatter: (cell) => {
                    const rowData = cell.getRow().getData();
                    // Mostrar el botón solo si el tipo es "combo"
                    return rowData.typeItem === "combo" ? "<button class='btn btn-primary btn-sm'><i class='bx bx-show me-2'></i> Ver</button>" : "";
                },
                hozAlign: "center",
                cellClick: (e, cell) => {
                    const rowData = cell.getRow().getData();
                    if (rowData.typeItem === "combo") {
                        const itemId = rowData.id;
                        showCombosModal(itemId); // Llama a la función para mostrar el modal de combos
                    }
                },
            },
            {
                title: "Acciones",
                formatter: () => `
                    <button class='btn btn-warning btn-sm me-1 edit-btn'><i class='bx bx-edit-alt fs-4'></i></button>
                    <button class='btn btn-danger btn-sm delete-btn'><i class='bx bxs-trash-alt'></i></button>
                `,
                width: 100,
                hozAlign: "center",
                cellClick: (e, cell) => {
                    const target = e.target.closest('button');

                    if (target && target.classList.contains('edit-btn')) {
                        console.log("object");
                    } else if (target && target.classList.contains('delete-btn')) {
                        // Lógica para el botón de eliminación
                        const itemId = cell.getRow().getData().id;
                        deleteItem(itemId, cell.getRow()); // Llama a la función de eliminación
                    }
                },
            }
        ],
    });
}