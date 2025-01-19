// config/validate-auth.js
class AuthValidator {
    static validateSession() {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/index.html';
            return false;
        }
        return true;
    }

    static validateRole(requiredRole) {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }

        try {
            const payload = jwt_decode(token);
            return payload.role === requiredRole;
        } catch (error) {
            console.error('Error decodificando token:', error);
            return false;
        }
    }

    static redirectBasedOnRole() {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/index.html';
            return;
        }

        try {
            const payload = jwt_decode(token);
            if (payload.role === 'admin') {
                window.location.href = '/admin-menu.html';
            } else {
                window.location.href = '/user_dashboard.html';
            }
        } catch (error) {
            console.error('Error redirigiendo:', error);
            window.location.href = '/index.html';
        }
    }
}