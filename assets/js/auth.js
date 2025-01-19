const API_BASE_URL = 'http://localhost:8080';
const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/user/login`,
    SIGNUP: `${API_BASE_URL}/user/signup`
};

// Utility functions for validation
const ValidationUtils = {
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    isValidPassword: (password) => {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    },

    isValidPhone: (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    },

    isAdult: (birthdate) => {
        const today = new Date();
        const birthdateDate = new Date(birthdate);
        const age = today.getFullYear() - birthdateDate.getFullYear();
        return age >= 18;
    }
};

class AuthenticationSystem {
    constructor() {
        this.initializeModals();
        this.attachEventListeners();
        this.setupFormValidation();
    }

    initializeModals() {
        // Add modals to the DOM
        document.body.insertAdjacentHTML('beforeend', `
            <!-- Login Modal -->
            <div class="modal fade" id="loginModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Iniciar Sesión</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="loginForm" novalidate>
                                <div class="mb-3">
                                    <input type="email" class="form-control" id="loginEmail" 
                                           placeholder="Correo electrónico" required>
                                    <div class="invalid-feedback">
                                        Por favor ingrese un correo válido
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <input type="password" class="form-control" id="loginPassword" 
                                           placeholder="Contraseña" required>
                                    <div class="invalid-feedback">
                                        La contraseña es requerida
                                    </div>
                                </div>
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                                </div>
                                <div class="mt-3 text-center">
                                    <a href="#" id="forgotPasswordLink">¿Olvidaste tu contraseña?</a>
                                    <br>
                                    <a href="#" id="showRegisterLink">¿No tienes cuenta? Regístrate</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Register Modal -->
            <div class="modal fade" id="registerModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Registro</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="registerForm" class="needs-validation" novalidate>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <input type="text" class="form-control" id="registerName" 
                                               placeholder="Nombre" required>
                                        <div class="invalid-feedback">
                                            El nombre es requerido
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <input type="text" class="form-control" id="registerSurname" 
                                               placeholder="Apellido" required>
                                        <div class="invalid-feedback">
                                            El apellido es requerido
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <input type="email" class="form-control" id="registerEmail" 
                                               placeholder="Correo electrónico" required>
                                        <div class="invalid-feedback">
                                            Ingrese un correo válido
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <input type="tel" class="form-control" id="registerPhone" 
                                               placeholder="Teléfono" required>
                                        <div class="invalid-feedback">
                                            Ingrese un número de teléfono válido
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" id="registerAddress" 
                                           placeholder="Dirección" required>
                                    <div class="invalid-feedback">
                                        La dirección es requerida
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <input type="text" class="form-control" id="registerCity" 
                                               placeholder="Ciudad" required>
                                        <div class="invalid-feedback">
                                            La ciudad es requerida
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <input type="date" class="form-control" id="registerBirthdate" required>
                                        <div class="invalid-feedback">
                                            Debe ser mayor de edad
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <input type="password" class="form-control" id="registerPassword" 
                                               placeholder="Contraseña" required>
                                        <div class="invalid-feedback">
                                            La contraseña debe tener al menos 8 caracteres, una mayúscula y un número
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <input type="password" class="form-control" id="registerConfirmPassword" 
                                               placeholder="Confirmar contraseña" required>
                                        <div class="invalid-feedback">
                                            Las contraseñas no coinciden
                                        </div>
                                    </div>
                                </div>
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-primary">Registrarse</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    setupFormValidation() {
        const fields = document.querySelectorAll('.validate');
        fields.forEach(field => {
            field.addEventListener('keyup', () => {
                field.classList.remove('errorField');
            });
        });
    }

    attachEventListeners() {
        // Initialize Bootstrap modals
        this.loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        this.registerModal = new bootstrap.Modal(document.getElementById('registerModal'));

        // Attach event listeners to buttons
        document.getElementById('authButton')?.addEventListener('click', () => this.loginModal.show());
        document.getElementById('registerButton')?.addEventListener('click', () => this.registerModal.show());

        // Form submissions
        document.getElementById('loginForm')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerForm')?.addEventListener('submit', (e) => this.handleRegister(e));

        // Modal navigation
        document.getElementById('showRegisterLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.loginModal.hide();
            this.registerModal.show();
        });

        // Forgot password
        document.getElementById('forgotPasswordLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showForgotPasswordModal();
        });
    }

    async handleLogin(event) {
        event.preventDefault();
        const form = event.target;
        form.classList.add('was-validated');

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Validación básica
        if (!ValidationUtils.isValidEmail(email) || !password) {
            this.showAlert('Error', 'Por favor complete todos los campos correctamente', 'error');
            return;
        }

        try {
            const response = await fetch(API_ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                // Usar el AuthValidator para la redirección basada en rol
                AuthValidator.redirectBasedOnRole();
            } else {
                this.showAlert('Error', 'Credenciales inválidas', 'error');
            }
        } catch (error) {
            console.error('Error en login:', error);
            this.showAlert('Error', 'Error al iniciar sesión', 'error');
        }
    }

    async handleRegister(event) {
        event.preventDefault();
        const form = event.target;
        form.classList.add('was-validated');
            const formData = this.getRegisterFormData();
        const validationErrors = this.validateRegisterData(formData);
        if (validationErrors.length > 0) {
            this.showAlert('Error', validationErrors.join('<br>'), 'error');
            return;
        }
        try {
            // Realizar la solicitud al endpoint de registro
            const response = await fetch(API_ENDPOINTS.SIGNUP, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json(); // Parsear la respuesta JSON
            
            if (response.ok && data.success) {
                // Registro exitoso
                this.showAlert('¡Éxito!', data.message || 'Registro completado correctamente', 'success');
                this.registerModal.hide();
                this.loginModal.show();
            } else {
                // Manejo de errores desde el backend
                this.showAlert('Error', data.message || 'Error al registrar', 'error');
            }
        } catch (error) {
            // Manejo de errores en el cliente
            console.error('Error en registro:', error);
            this.showAlert('Error', 'Error al procesar el registro. Intente nuevamente.', 'error');
        }
    }
    

    getRegisterFormData() {

        return {
            name: document.getElementById('registerName').value,
            surname: document.getElementById('registerSurname').value,
            email: document.getElementById('registerEmail').value,
            phone: document.getElementById('registerPhone').value,
            address: document.getElementById('registerAddress').value,
            city: document.getElementById('registerCity').value,
            birthdate: document.getElementById('registerBirthdate').value,
            password: document.getElementById('registerPassword').value,
            role: 'user' // Por defecto, todos los registros son usuarios normales
        };
    }

    validateRegisterData(data) {
        const errors = [];

        if (!data.name || !data.surname) {
            errors.push('Nombre y apellido son requeridos');
        }
        if (!ValidationUtils.isValidEmail(data.email)) {
            errors.push('Email inválido');
        }
        if (!ValidationUtils.isValidPassword(data.password)) {
            errors.push('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número');
        }
        if (!ValidationUtils.isValidPhone(data.phone)) {
            errors.push('Número de teléfono inválido');
        }
        if (!ValidationUtils.isAdult(data.birthdate)) {
            errors.push('Debe ser mayor de edad para registrarse');
        }
        if (!data.address || !data.city) {
            errors.push('Dirección y ciudad son requeridos');
        }

        return errors;
    }

    showAlert(title, message, icon) {
        console.log('showAlert ejecutado:', title, message, icon);
    
        Swal.fire({
            icon: icon, // 'success', 'error', 'warning', 'info'
            title: title,
            html: message, // Usamos 'html' para formatear mensajes con saltos de línea
            confirmButtonText: 'Aceptar',
            customClass: {
                popup: 'swal-wide' // Clase personalizada opcional para ajustar estilos
            }
        });
    }
    
    
}

// Initialize the authentication system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthenticationSystem();
});