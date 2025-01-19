// Función para eliminar un ítem
async function deleteItem(itemId, row) {
    const token = localStorage.getItem("token"); // Obtener el token de autenticación

    if (!token) {
        Swal.fire({
            icon: "error",
            title: "Autenticación requerida",
            text: "No se encontró un token de autenticación. Por favor, inicia sesión nuevamente.",
        });
        return;
    }

    // Mostrar confirmación con SweetAlert
    const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás recuperar este ítem después de eliminarlo.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
        try {
            // Realizar la petición de eliminación al backend
            const response = await fetch(`http://localhost:8080/api/v1/item/${itemId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`, // Añadir el token al encabezado Authorization
                    "Content-Type": "application/json",
                },
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                // Eliminar la fila de la tabla usando Tabulator
                row.delete();

                // Mostrar el mensaje del servidor en caso de éxito
                Swal.fire({
                    icon: "success",
                    title: "¡Éxito!",
                    text: responseData.message || "El ítem ha sido eliminado con éxito.",
                    timer: 1500,
                    showConfirmButton: false,
                });

                // Actualizar conteo de tarjetas
                conteoItemsTarjetas();
            } else {
                // Mostrar el mensaje de error desde el servidor
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: responseData.message || "No se pudo eliminar el ítem.",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            // Manejo de errores generales
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un problema al intentar eliminar el ítem.",
                timer: 2000,
                showConfirmButton: false,
            });
            console.error("Error al eliminar el ítem:", error);
        }
    }
}

