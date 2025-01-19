'use strict';

const cloudName = 'dgabtcr2m'; // Replace with your cloudName
const uploadPreset = 'ml_default'; // Replace with your uploadPreset
const apiKey = '848622327782151'; // Replace with your API key

const imageInput = document.querySelector('#itemImage');
const form = document.querySelector('#addItemForm');
const saveButton = document.querySelector('#saveItems');

// Handle image selection
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        if (!validateImageFile(file)) {
            resetImagePreview();
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('previewImage').src = e.target.result;
            document.getElementById('previewImage').style.display = 'block';
            document.getElementById('imagePlaceholder').style.display = 'none';
            document.getElementById('removeImage').classList.remove('d-none');
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('removeImage').addEventListener('click', () => {
    resetImagePreview();
});

// Function to validate text input
function validateTextInput(input, minLength, maxLength, fieldName) {
    const trimmedInput = input.trim();
    const invalidChars = /[<>{}[\]\\]/; // Disallow potentially dangerous characters
    if (trimmedInput.length < minLength || trimmedInput.length > maxLength) {
        Swal.fire({
            icon: 'error',
            title: 'Error en la validación',
            text: `${fieldName} debe tener entre ${minLength} y ${maxLength} caracteres.`,
        });
        return false;
    }
    if (invalidChars.test(trimmedInput)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en la validación',
            text: `${fieldName} contiene caracteres no válidos.`,
        });
        return false;
    }
    return true;
}

// Function to validate price
function validatePrice(price) {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0 || numericPrice > 1000000) {
        Swal.fire({
            icon: 'error',
            title: 'Error en la validación',
            text: 'El precio debe ser un número positivo y no mayor a 1,000,000.',
        });
        return false;
    }
    return true;
}

// Function to validate image file
function validateImageFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
        Swal.fire({
            icon: 'error',
            title: 'Tipo de archivo no válido',
            text: 'Por favor, selecciona una imagen en formato JPEG, PNG o GIF.',
        });
        return false;
    }

    if (file.size > maxSize) {
        Swal.fire({
            icon: 'error',
            title: 'Archivo demasiado grande',
            text: 'El tamaño máximo de la imagen es 5MB.',
        });
        return false;
    }

    return true;
}

// Prevent multiple clicks
let isSubmitting = false;

function obtenerDatosFormulario() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('itemDescription').value;
    const typeItem = document.getElementById('typeItem').value;
    const unitPrice = document.getElementById('unitPrice').value;
    const status = document.getElementById('status').checked;

    return { name, description, typeItem, unitPrice, status };
}
function validarCamposFormulario(name, description, typeItem, unitPrice) {
    // Validación de cada campo
    if (
        !validateTextInput(name, 3, 50, 'Nombre') ||
        !validateTextInput(description, 20, 150, 'Descripción') ||
        !validateTextInput(typeItem, 3, 30, 'Tipo de ítem') ||
        !validatePrice(unitPrice)
    ) {
        return false;
    }
    return true;
}
function subirImagen(file) {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', uploadPreset);
    cloudinaryFormData.append('api_key', apiKey);

    return fetch(url, {
        method: 'POST',
        body: cloudinaryFormData,
    }).then(response => response.json());
}
function crearObjetoProducto(name, description, typeItem, unitPrice, status, imageUrl, imageName) {
    return {
        name: name.trim(),
        status: status, // True or False directamente, en lugar de 'Activo'/'Inactivo'
        typeItem: typeItem.trim(),
        unitPrice: parseFloat(unitPrice).toFixed(2),
        description: description.trim(),
        imageUrl,
        imageName,
    };
}
function mostrarResultado(itemData) {
    Swal.fire({
        icon: 'success',
        title: 'Producto guardado con éxito',
        html: `
            <strong>Nombre:</strong> ${itemData.name}<br>
            <strong>Estado:</strong> ${itemData.status ? 'Activo' : 'Inactivo'}<br>
            <strong>Tipo:</strong> ${itemData.typeItem}<br>
            <strong>Precio:</strong> $${itemData.unitPrice}<br>
            <strong>Descripción:</strong> ${itemData.description}<br>
            <strong>Imagen URL:</strong> <a href="${itemData.imageUrl}" target="_blank">${itemData.imageUrl}</a><br>
            <strong>Nombre Imagen:</strong> ${itemData.imageName}
        `,
    }).then(() => {
        resetForm(); // Restablece los campos del formulario
    });
}
saveButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir el envío por defecto del formulario

    if (isSubmitting) return;

    // Obtener los datos del formulario
    const { name, description, typeItem, unitPrice, status } = obtenerDatosFormulario();

    // Validar campos
    if (!validarCamposFormulario(name, description, typeItem, unitPrice)) {
        return;
    }

    const file = imageInput.files[0];

    // Validar si hay imagen seleccionada
    if (!file) {
        Swal.fire({
            icon: 'warning',
            title: 'Imagen requerida',
            text: 'Por favor, selecciona una imagen.',
        });
        return;
    }

    if (!validateImageFile(file)) {
        return;
    }

    isSubmitting = true;
    saveButton.disabled = true;

    // Subir la imagen
    subirImagen(file).then(result => {
        if (result.secure_url && result.public_id) {
            const imageUrl = result.secure_url;
            const imageName = result.public_id;

            // Crear objeto del producto
            const itemData = crearObjetoProducto(name, description, typeItem, unitPrice, status, imageUrl, imageName);

            // Enviar los datos al servidor
            enviarDatosAlServidor(itemData).then(response => {
                // Si la respuesta es exitosa, limpiar los campos
                resetForm();
            }).catch(error => {
                // Manejar el error si no se guarda en el servidor
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar',
                    text: 'Hubo un problema al guardar los datos en el servidor. Inténtalo nuevamente.',
                });
            });

        } else {
            throw new Error('Respuesta inválida de Cloudinary');
        }
    }).catch(error => {
        console.error('Error al subir la imagen:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al subir la imagen. Por favor, inténtalo de nuevo.',
        });
    }).finally(() => {
        isSubmitting = false;
        saveButton.disabled = false;
    });
});

async function enviarDatosAlServidor(itemData) {
    const token = localStorage.getItem('token'); // Obtener el token de autenticación

    if (!token) {
        Swal.fire({
            icon: 'error',
            title: 'Autenticación requerida',
            text: 'No se encontró un token de autenticación. Por favor, inicia sesión nuevamente.',
        });
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/v1/item', { // Cambiar según la ruta correcta de tu servidor
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Añadir el token al encabezado Authorization
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData), // Convertir los datos a formato JSON
        });

        const responseData = await response.json();

        if (response.ok && responseData.success) {
            // Respuesta exitosa del servidor
            loadData(); // Recargar datos si tienes un método para actualizar la UI
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: responseData.message || 'El producto ha sido guardado correctamente en el servidor.',
            });
        } else {
            // Manejar errores del servidor usando el formato del ResponseDto
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar el producto',
                text: responseData.message || 'Error desconocido al guardar el producto',
            });
        }
    } catch (error) {
        // Manejar errores de red o problemas en la solicitud
        console.error('Error al guardar el producto:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error al guardar el producto',
            text: 'Hubo un problema al conectar con el servidor. Por favor, intenta nuevamente.',
        });
    }
}




// Function to clear image preview
function resetImagePreview() {
    imageInput.value = ''; // Clear file input
    document.getElementById('previewImage').src = '';
    document.getElementById('previewImage').style.display = 'none';
    document.getElementById('imagePlaceholder').style.display = 'block';
    document.getElementById('removeImage').classList.add('d-none');
}

// Function to reset form and preview
function resetForm() {
    form.reset(); // Reset form
    form.classList.remove('was-validated'); // Remove validation
    resetImagePreview(); // Clear image
}

console.log('Form validation script loaded successfully.');


