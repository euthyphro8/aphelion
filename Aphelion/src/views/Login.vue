<template>
<div class="background">
  <div class="login-page">       
    <div class="form">
      <form id="login-form">
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <button>login</button>
          <p class="message">Not registered? <a id="register" href="#">Create an account</a></p>
      </form>
      <form id="register-form">
          <input type="text" placeholder="name" />
          <input type="text" placeholder="email address" />
          <input type="password" placeholder="password" />
          <button>create</button>
          <p class="message">Already registered? <a id="sign-in" href="#">Sign In</a></p>
      </form>
    </div>
  </div>
</div>
</template>
<script>
export default {
    name: 'login'
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.background {
  background: -webkit-linear-gradient(downright, #FFAAFF, #E100FF);
  background: -moz-linear-gradient(right, #FFAAFF, #E100FF);
  background: -o-linear-gradient(right,   #FFAAFF, #E100FF);
  background: linear-gradient(to left,    #FFAAFF, #E100FF);
  font-family: "Roboto", sans-serif;     
  width: 100%;
  height: 100%;
}

#register-form {
  display: none;
}

.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}

.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}

.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #E100FF;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}

.form button:hover,.form button:active,.form button:focus {
  background: #FFAAFF;
}

.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}

.form .message a {
  color: #E100FF;
  text-decoration: none;
}
</style>