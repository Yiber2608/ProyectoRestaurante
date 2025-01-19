class LogoutManager {
    constructor() {
        this.initializeLogoutButton();
    }

    initializeLogoutButton() {
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => this.handleLogout());
        }
    }

    handleLogout() {
        localStorage.removeItem('token');
        window.location.href = '/index.html';
    }
}