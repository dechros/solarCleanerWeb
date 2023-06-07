document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Get input values
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        // Check credentials
        if (username === 'admin' && password === '1234') {
            window.location.href = 'html/main.html'; // Redirect to main.html
        } else {
            alert('Invalid username or password');
        }
    });
});