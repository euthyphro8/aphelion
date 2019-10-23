<template>     
    <div class="form-container">
        <form id="register-form" @submit="handleSubmit">
            <p class="title">Register</p>
            <input type="text" v-model="username" placeholder="Username" />
            <input type="text" v-model="email" placeholder="Email" />
            <input type="password" v-model="password" placeholder="Password" />
            <input type="submit" value="Submit"/>
            <p class="message">Already registered? <a id="sign-in">Sign In</a></p>
        </form>
    </div>
</template>

<script>
import AuthService from '@/ts/services/AuthService'; 
export default {
    name: "registerForm",
    data: {
        username: "",
        password: "",
        email: ""
    },
    methods: {
        handleSubmit: function (e) {
            
        }
    }
}
</script>

<style scoped>
    .form-container {
        height: calc(100% - 60px);
        width: calc(100% - 60px);
        padding: 30px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    form {
        height: 100%;
        width: 100%;
    }

    .row {
        width: 100%;
    }

    input[type=text], input[type=password], select {
        width: 100%;
        padding: 12px 20px;
        margin: 4px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    input[type=submit] {
        width: 100%;
        background-color: var(--primary);
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    input[type=submit]:hover {
        background-color: var(--primary-highlight);
    }

    a {
        text-decoration: none;
        color: var(--primary);
    }
    
    a:hover {
        color: var(--primary-highlight);
    }

    .message {
        font-style: italic;
        text-align: center;
    }

    .title {
        text-align: center;
        font-weight: 600;
        font-style: italic;
        font-size: 18pt;
    }

</style>