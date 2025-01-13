const correctPassword = "290607";

    function checkPassword() {
        const input = document.getElementById('password-input').value;
        if (input === correctPassword) {
            document.getElementById('password-overlay').style.display = 'none';
            document.body.classList.remove('no-scroll');
        } else {
            alert('Contraseña incorrecta');
        }
    }