
// Archivo protect-routes.js
document.addEventListener('DOMContentLoaded', () => {
    const protectedRoutes = {
        '/admin-menu.html': 'admin',
        '/inicio-noaotros.html': 'user'
    };

    const currentPath = window.location.pathname;

    if (protectedRoutes[currentPath]) {
        const requiredRole = protectedRoutes[currentPath];
        
        if (!AuthValidator.validateSession()) {
            return;
        }

        if (!AuthValidator.validateRole(requiredRole)) {
            window.location.href = '/index.html';
        }
    }
});