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

saveButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default form submission

    if (isSubmitting) return;

    // Get field values
    const name = document.getElementById('name').value;
    const description = document.getElementById('itemDescription').value;
    const typeItem = document.getElementById('typeItem').value;
    const unitPrice = document.getElementById('unitPrice').value;
    const status = document.getElementById('status').checked;

    // Custom validations for each field
    if (
        !validateTextInput(name, 3, 50, 'Nombre') ||
        !validateTextInput(description, 20, 150, 'Descripción') ||
        !validateTextInput(typeItem, 3, 30, 'Tipo de ítem') ||
        !validatePrice(unitPrice)
    ) {
        return;
    }

    const file = imageInput.files[0];

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

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', uploadPreset);
    cloudinaryFormData.append('api_key', apiKey);

    isSubmitting = true;
    saveButton.disabled = true;

    fetch(url, {
        method: 'POST',
        body: cloudinaryFormData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            if (result.secure_url && result.public_id) {
                const imageUrl = result.secure_url;
                const imageName = result.public_id;

                // Create object with form data
                const itemData = {
                    name: name.trim(),
                    status: status ? 'Activo' : 'Inactivo',
                    typeItem: typeItem.trim(),
                    unitPrice: parseFloat(unitPrice).toFixed(2),
                    description: description.trim(),
                    imageUrl,
                    imageName,
                };

                // Show data in a SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Producto guardado con éxito',
                    html: `
                        <strong>Nombre:</strong> ${itemData.name}<br>
                        <strong>Estado:</strong> ${itemData.status}<br>
                        <strong>Tipo:</strong> ${itemData.typeItem}<br>
                        <strong>Precio:</strong> $${itemData.unitPrice}<br>
                        <strong>Descripción:</strong> ${itemData.description}<br>
                        <strong>Imagen URL:</strong> <a href="${itemData.imageUrl}" target="_blank">${itemData.imageUrl}</a><br>
                        <strong>Nombre Imagen:</strong> ${itemData.imageName}
                    `,
                }).then(() => {
                    resetForm();
                });
            } else {
                throw new Error('Invalid response from Cloudinary');
            }
        })
        .catch(error => {
            console.error('Error al subir la imagen:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al subir la imagen. Por favor, inténtalo de nuevo.',
            });
        })
        .finally(() => {
            isSubmitting = false;
            saveButton.disabled = false;
        });
});

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


