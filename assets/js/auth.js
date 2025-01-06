document.addEventListener('DOMContentLoaded', function() {
    const authButton = document.getElementById('authButton');
    const registerButton = document.getElementById('registerButton')
    authButton.addEventListener('click', showAuthModal);
    registerButton.addEventListener('click', showRegisterForm )
});

function showAuthModal() {
    Swal.fire({
        title: 'Inicio de Seccion',
        html: `
            <form id="authForm">
                <div class="mb-3">
                    <input type="email" id="email" class="form-control" placeholder="Correo electrónico" required>
                </div>
                <div class="mb-3">
                    <input type="password" id="password" class="form-control" placeholder="Contraseña" required>
                </div>
            </form>
        `,
        confirmButtonText: 'Iniciar Sesión',
        showCloseButton: true,
        footer: '<a href="#" id="forgotPassword">¿Olvidaste tu contraseña?</a> | <a href="#" id="registerLink">Registrarse</a>',
        preConfirm: () => {
            const email = Swal.getPopup().querySelector('#email').value;
            const password = Swal.getPopup().querySelector('#password').value;
            if (!email || !password) {
                Swal.showValidationMessage('Por favor, completa todos los campos');
            }
            return { email, password };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            handleLogin(result.value);
        }
    });

    document.getElementById('forgotPassword').addEventListener('click', showForgotPasswordForm);
    document.getElementById('registerLink').addEventListener('click', showRegisterForm);
}

function showForgotPasswordForm() {
    Swal.fire({
        title: 'Recuperar Contraseña',
        input: 'email',
        inputPlaceholder: 'Ingresa tu correo electrónico',
        confirmButtonText: 'Enviar',
        showLoaderOnConfirm: true,
        preConfirm: (email) => {
            if (!email) {
                Swal.showValidationMessage('Por favor, ingresa tu correo electrónico');
            }
            return { email };
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            handleForgotPassword(result.value);
        }
    });
}

function showRegisterForm() {
    Swal.fire({
        title: 'Registrarse',
        html: `
            <form id="registerForm">
                <div class="mb-3">
                    <input type="text" id="name" class="form-control" placeholder="Nombre" required>
                </div>
                <div class="mb-3">
                    <input type="text" id="surname" class="form-control" placeholder="Apellido" required>
                </div>
                <div class="mb-3">
                    <input type="date" id="birthdate" class="form-control" placeholder="Fecha de nacimiento" required>
                </div>
                <div class="mb-3">
                    <input type="email" id="email" class="form-control" placeholder="Correo electrónico" required>
                </div>
                <div class="mb-3">
                    <input type="tel" id="phone" class="form-control" placeholder="Número de teléfono" required>
                </div>
                <div class="mb-3">
                    <input type="text" id="address" class="form-control" placeholder="Dirección" required>
                </div>
                <div class="mb-3">
                    <input type="text" id="city" class="form-control" placeholder="Ciudad de residencia" required>
                </div>
                <div class="mb-3">
                    <input type="password" id="password" class="form-control" placeholder="Contraseña" required>
                </div>
                <div class="mb-3">
                    <input type="password" id="confirmPassword" class="form-control" placeholder="Confirmar contraseña" required>
                </div>
            </form>
        `,
        confirmButtonText: 'Registrarse',
        showCloseButton: true,
        preConfirm: () => {
            const name = Swal.getPopup().querySelector('#name').value;
            const surname = Swal.getPopup().querySelector('#surname').value;
            const birthdate = Swal.getPopup().querySelector('#birthdate').value;
            const email = Swal.getPopup().querySelector('#email').value;
            const phone = Swal.getPopup().querySelector('#phone').value;
            const address = Swal.getPopup().querySelector('#address').value;
            const city = Swal.getPopup().querySelector('#city').value;
            const password = Swal.getPopup().querySelector('#password').value;
            const confirmPassword = Swal.getPopup().querySelector('#confirmPassword').value;
            
            if (!name || !surname || !birthdate || !email || !phone || !address || !city || !password || !confirmPassword) {
                Swal.showValidationMessage('Por favor, completa todos los campos');
            }
            if (password !== confirmPassword) {
                Swal.showValidationMessage('Las contraseñas no coinciden');
            }
            return { name, surname, birthdate, email, phone, address, city, password };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            handleRegister(result.value);
        }
    });
}

function handleLogin(data) {
    // Aquí deberías enviar los datos al servidor
    console.log('Datos de inicio de sesión:', data);
    // Simulación de una llamada al servidor
    setTimeout(() => {
        Swal.fire('¡Éxito!', 'Has iniciado sesión correctamente', 'success');
    }, 1000);
}

function handleForgotPassword(data) {
    // Aquí deberías enviar los datos al servidor
    console.log('Solicitud de recuperación de contraseña:', data);
    // Simulación de una llamada al servidor
    setTimeout(() => {
        Swal.fire('Enviado', 'Se han enviado las instrucciones a tu correo electrónico', 'success');
    }, 1000);
}

function handleRegister(data) {
    // Aquí deberías enviar los datos al servidor
    console.log('Datos de registro:', data);
    // Simulación de una llamada al servidor
    setTimeout(() => {
        Swal.fire('¡Registro exitoso!', 'Tu cuenta ha sido creada correctamente', 'success');
    }, 1000);
}

