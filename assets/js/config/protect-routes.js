
// Archivo protect-routes.js
document.addEventListener('DOMContentLoaded', () => {
    const protectedRoutes = {
        '/admin-menu.html': 'admin',
        '/admin-nosotros.html': 'admin',
        '/admin-reservas.html': 'admin',
        '/admin-novedades.html': 'admin',
        '/admin-sedes.html': 'admin',
        '/admin-usuarios.html': 'admin',
        '/admin-resenas': 'admin'
    };

    const currentPath = window.location.pathname;

    if (protectedRoutes[currentPath]) {
        const requiredRole = protectedRoutes[currentPath];
        
        // Validar sesión y rol
        if (!AuthValidator.validateSession()) {
            window.location.href = '/index.html';
            return;
        }

        if (!AuthValidator.validateRole(requiredRole)) {
            window.location.href = '/index.html';
        }
    }
});
