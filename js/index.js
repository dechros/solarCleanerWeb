document.addEventListener('DOMContentLoaded', function () {
    function getUserAPI(userName) {
        var apiUrl = "api/getUser.php";

        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `userName=${encodeURIComponent(userName)}`,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    return data[0];
                } else {
                    throw new Error('User not found');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }

    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault(); 

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        try {
            var user = await getUserAPI(username);

            if (password === user.userPw) {
                window.location.href = 'html/main.html'; 
            } else {
                alert('Invalid password');
            }
        } catch (error) {
            alert('User not found');
        }
    });
});
