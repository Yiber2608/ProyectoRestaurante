let pondUpdate;

document.addEventListener("DOMContentLoaded", () => {
    FilePond.registerPlugin(FilePondPluginImagePreview);
    pondUpdate = FilePond.create(document.querySelector('input[name="updateFilepond"]'), {
        allowMultiple: false,
        acceptedFileTypes: ["image/*"],
        maxFileSize: "5MB",
        stylePanelAspectRatio: 1,
        labelIdle: '<i class="bi bi-cloud-arrow-up" style="font-size: 2rem;"></i>',
        labelMaxFileSizeExceeded: "El archivo es demasiado grande",
        labelFileTypeNotAllowed: "Tipo de archivo no válido",
        labelFileProcessing: "Cargando",
        labelFileProcessingComplete: "Carga completa",
        labelFileProcessingAborted: "Carga cancelada",
        labelFileProcessingError: "Error durante la carga",
        labelFileRemoveError: "Error durante la eliminación",
        labelTapToCancel: "toca para cancelar",
        labelTapToRetry: "toca para volver a intentar",
        labelTapToUndo: "toca para deshacer",
        styleItemPanelAspectRatio: 1,
        stylePanelLayout: 'compact'
    });
});

function loadBranchById(branchId) {
    const branch = branchesGlobal.find(branch => branch.id === branchId);
    if (!branch) {
        console.error("Sede no encontrada");
        return;
    }

    console.log("Datos de la sede a editar:", branch);

    const updateName = document.getElementById("updateName");
    const updateAddress = document.getElementById("updateAddress");
    const updateCapacity = document.getElementById("updateCapacity");
    const updateDescription = document.getElementById("updateDescription");
    const updateLatitude = document.getElementById("updateLatitude");
    const updateLongitude = document.getElementById("updateLongitude");

    if (!updateName || !updateAddress || !updateCapacity || !updateDescription || !updateLatitude || !updateLongitude) {
        console.error("Elementos del formulario no encontrados");
        return;
    }

    updateName.value = branch.name;
    updateAddress.value = branch.address;
    updateCapacity.value = branch.capacity;
    updateDescription.value = branch.description;
    updateLatitude.value = branch.latitude;
    updateLongitude.value = branch.longitude;

    if (branch.image) {
        pondUpdate.addFile(branch.image).then(file => {
            file.setMetadata('poster', branch.image);
        });
    } else {
        pondUpdate.removeFile();
    }

    const updateBranchForm = document.getElementById("updateBranchForm");
    updateBranchForm.dataset.branchId = branchId;
    updateBranchForm.dataset.currentImageUrl = branch.image || "";

    const updateModal = new bootstrap.Modal(document.getElementById("updateBranch"));
    updateModal.show();
}

const updateBranchForm = document.getElementById("updateBranchForm");
if (updateBranchForm) {
    updateBranchForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const branchId = this.dataset.branchId;
        const currentImageUrl = this.dataset.currentImageUrl;

        const name = document.getElementById("updateName").value;
        const address = document.getElementById("updateAddress").value;
        const capacity = document.getElementById("updateCapacity").value;
        const description = document.getElementById("updateDescription").value;
        const latitude = document.getElementById("updateLatitude").value;
        const longitude = document.getElementById("updateLongitude").value;

        if (!validateUpdateForm(name, address, capacity, description, latitude, longitude)) {
            return;
        }

        const pondFile = pondUpdate.getFile();

        if (pondFile) {
            uploadImage(pondFile.file)
                .then(result => {
                    if (currentImageUrl) {
                        const publicId = extractPublicId(currentImageUrl);
                        deletePreviousImage(publicId)
                            .then(() => {
                                updateBranch(branchId, name, address, capacity, description, latitude, longitude, result.secure_url);
                            })
                            .catch(error => {
                                console.error("Error al eliminar la imagen previa:", error);
                                Swal.fire("Error", "No se pudo eliminar la imagen anterior", "error");
                            });
                    } else {
                        updateBranch(branchId, name, address, capacity, description, latitude, longitude, result.secure_url);
                    }
                })
                .catch(error => {
                    console.error("Error al subir la imagen:", error);
                    Swal.fire("Error", "No se pudo subir la imagen", "error");
                });
        } else {
            updateBranch(branchId, name, address, capacity, description, latitude, longitude, currentImageUrl);
        }
    });
}

function validateUpdateForm(name, address, capacity, description, latitude, longitude) {
    if (!name || name.trim().length < 3) {
        Swal.fire('Error', 'El nombre debe tener al menos 3 caracteres', 'error');
        return false;
    }
    if (!address || address.trim().length < 5) {
        Swal.fire('Error', 'La dirección debe tener al menos 5 caracteres', 'error');
        return false;
    }
    if (!capacity || isNaN(capacity) || parseInt(capacity) <= 0) {
        Swal.fire('Error', 'La capacidad debe ser un número positivo', 'error');
        return false;
    }
    if (!description || description.trim().length < 10) {
        Swal.fire('Error', 'La descripción debe tener al menos 10 caracteres', 'error');
        return false;
    }
    if (!latitude || isNaN(parseFloat(latitude))) {
        Swal.fire('Error', 'La latitud debe ser un número válido', 'error');
        return false;
    }
    if (!longitude || isNaN(parseFloat(longitude))) {
        Swal.fire('Error', 'La longitud debe ser un número válido', 'error');
        return false;
    }
    return true;
}

function uploadImage(file) {
    return new Promise((resolve, reject) => {
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if (result.secure_url && result.public_id) {
                    resolve(result);
                } else {
                    reject(new Error('No se pudo obtener la URL segura de Cloudinary'));
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

function extractPublicId(url) {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    const publicId = fileName.split('.')[0];
    return publicId;
}

async function deletePreviousImage(publicId) {
    const token = localStorage.getItem('token');
    if (!token) {
        Swal.fire({
            icon: 'error',
            title: 'Autenticación requerida',
            text: 'No se encontró un token de autenticación. Por favor, inicia sesión nuevamente.',
        });
        return;
    }
    if (!publicId) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El identificador de la imagen (publicId) no puede estar vacío.',
        });
        return;
    }
    try {
        const dataToSend = { publicId: publicId };
        const response = await fetch('http://localhost:8080/api/v2/delete', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        const responseData = await response.json();
        if (response.ok && responseData.success) {
            console.log("Imagen eliminada correctamente");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar la imagen',
                text: responseData.message || 'No se pudo eliminar la imagen.',
                timer: 2000,
                showConfirmButton: false,
            });
        }
    } catch (error) {
        console.error('Error al eliminar la imagen:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error al eliminar la imagen',
            text: 'Ocurrió un problema al intentar eliminar la imagen.',
            timer: 2000,
            showConfirmButton: false,
        });
    }
}

function updateBranch(branchId, name, address, capacity, description, latitude, longitude, imageUrl) {
    const token = localStorage.getItem('token');

    if (!token) {
        Swal.fire({
            icon: 'error',
            title: 'Autenticación requerida',
            text: 'No se encontró un token de autenticación. Por favor, inicia sesión nuevamente.',
        });
        return;
    }

    const updatedData = {
        id: branchId,
        name: name,
        address: address,
        capacity: parseInt(capacity),
        description: description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        image: imageUrl,
        userId: 1 // Asignar el userId correspondiente
    };

    console.log('JSON generado para actualizar:', updatedData);

    $.ajax({
        url: `http://localhost:8080/api/v1/branches`,
        type: 'PUT',
        contentType: 'application/json',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify(updatedData),
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Sede actualizada',
                text: 'La sede ha sido actualizada correctamente en el servidor.',
            });
            bootstrap.Modal.getInstance(document.getElementById('updateBranch')).hide();
            loadBranches();
        },
        error: function (xhr, status, error) {
            console.error('Error en la solicitud:', xhr.responseText);
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar la sede',
                text: `Hubo un problema al actualizar la sede: ${error}`,
            });
        }
    });
}
