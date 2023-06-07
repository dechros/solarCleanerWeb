document.addEventListener('DOMContentLoaded', function () {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeIcon = document.querySelector('.close-icon');
    const sideMenu = document.getElementById('sideMenu');
    const signOutLink = document.getElementById('signOutLink');
    const overlay = document.getElementById('overlay');

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

    hamburgerIcon.addEventListener('click', toggleSideMenu);
    closeIcon.addEventListener('click', closeSideMenu);
    signOutLink.addEventListener('click', signOut);
    overlay.addEventListener('click', closeOnOverlayClick);
});