
// External Dependencies

// Internal Dependencies
const RLogger = require('../util/RLogger');
const Validator = require('../util/Validator');


class LoginPage {
    constructor(document, socket) {
        this.loginForm = document.getElementById('login-form');
        this.registerForm = document.getElementById('register-form');
        this.loginState = true;
        this.socket = socket;

        document.addEventListener('click', this.onClick.bind(this));
        document.addEventListener('keypress', this.onKeyUp.bind(this));
    }

    onClick() {
        var target = event.target;
        if(target && target.tagName === 'A') {
            if(target.id === 'register') {
                this.loginForm.style.display = 'none';
                this.registerForm.style.display = 'block';
                this.loginState = false;
            }
            if(target.id === 'sign-in') {
                this.loginForm.style.display = 'block';
                this.registerForm.style.display = 'none';
                this.loginState = true;
            }
        }
    }

    onKeyUp(event) {
        if(event.keycode === 'enter') {
            this.validateLogin(null, null);
        }
    }

    async validateLogin(email, password) {

    }

    async validateRegister(name, email, password) {

    }

}
module.exports = LoginPage;