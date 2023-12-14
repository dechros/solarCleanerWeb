document.addEventListener('DOMContentLoaded', function () {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeIcon = document.querySelector('.close-icon');
    const sideMenu = document.getElementById('sideMenu');
    const signOutLink = document.getElementById('signOutLink');
    const overlay = document.getElementById('overlay');
    const menuItems = document.querySelectorAll('.side-menu li');
    const pageIcon = document.querySelector('.page-icon');
    const pageHeaderText = document.querySelector('.page-header-text span');
    const iframe = document.getElementById('mainFrame');

    function toggleSideMenu() {
        sideMenu.classList.toggle('open');
        overlay.classList.toggle('visible');
    }

    function closeSideMenu() {
        sideMenu.classList.remove('open');
        overlay.classList.remove('visible');
    }

    function signOut() {
        window.location.href = "../index.html";
    }

    function closeOnOverlayClick(event) {
        if (event.target === overlay) {
            closeSideMenu();
        }
    }

    function handleMenuItemClick() {
        const iconClass = this.querySelector('i').className;
        pageIcon.className = `fas ${iconClass} page-icon`;

        const menuItemText = this.textContent.trim();
        pageHeaderText.textContent = menuItemText;

        switch (menuItemText) {
            case 'Dashboard':
                iframe.src = 'dashboard.html';
                break;
            case 'Left Track Parameters':
                iframe.src = 'leftTrack.html';
                break;
            case 'Right Track Parameters':
                iframe.src = 'rightTrack.html';
                break;
            case 'Brush Parameters':
                iframe.src = 'brush.html';
                break;
            case 'Controller Parameters':
                iframe.src = 'controller.html';
                break;
            default:
                iframe.src = '';
                break;
        }
    }

    hamburgerIcon.addEventListener('click', toggleSideMenu);
    closeIcon.addEventListener('click', closeSideMenu);
    signOutLink.addEventListener('click', signOut);
    overlay.addEventListener('click', closeOnOverlayClick);
    menuItems.forEach(function (item) {
        item.addEventListener('click', handleMenuItemClick);
    });
});