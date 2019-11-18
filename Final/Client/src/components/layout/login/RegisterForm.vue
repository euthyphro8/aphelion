<template>
  <div class="form-container">
    <img class="logo" src="@/assets/LogoGrey.png" alt="Logo"><br>
    <p class="title">Register</p><br>
    <form id="register-form" @submit="handleSubmit">
      <input v-model="username" type="text" placeholder="Username">
      <input v-model="email" type="text" placeholder="Email">
      <input v-model="password" type="password" placeholder="Password">
      <input v-model="repassword" type="password" placeholder="Retype Password">
      <input :disabled="disabled" type="submit" value="Submit">
      <p class="status">{{status}}</p>
    </form>
    <p class="message">
      Already registered?
      <a id="sign-in" @click="$emit('switch-form')">Login</a>
    </p>
  </div>
</template>

<script>
import Validator from '@/ts/util/Validator';

export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      password: '',
      repassword: '',
      email: '',
      disabled: false,
      status: ''
    };
  },
  methods: {
    handleSubmit: async function(event) {
      this.disabled = true;
      console.log('[Register] Got register submit.');
      const validEmail = Validator.VerifyEmail(this.email);
      const validUser = Validator.VerifyUsername(this.username);
      const validPass = Validator.VerifyPassword(this.password);
      if(validEmail && validUser && validPass && (this.password === this.repassword)) {
        console.log('[Register] Validated.');
        const result = await this.$store.state.client.requestRegister(this.username, this.email, this.password);
        if(result) {
          console.log('[Register] Server accepted registration.');
          this.$store.commit('authenticate');
          this.$router.push('/');
        } else {
          console.log('[Register] Registration rejected by server.');
          this.disabled = false;
          this.status = 'Credentials rejected by server.';
        }
      } else {
        console.log('[Register] Failed to validate.');
        this.disabled = false;
        if(!validUser) {
          this.status = 'Needs a valid username.';
        } else if(!validEmail) {
          this.status = 'Needs a valid email address.';
        } else if(!validPass) {
          this.status = 'Needs a valid password.';
        } else if(!(this.password === this.repassword)) {
          this.status = 'Passwords must match';
        }
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  height: calc(100% - 120px);
  width: calc(100% - 200px);
  padding: 60px 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  align-content: center;
}

.logo {
  /* width: 60px; */
  height: 100px;
}

form {
  height: 100%;
  width: 100%;
}

.row {
  width: 100%;
}

input[type="text"],
input[type="password"],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 4px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background: #00000000;
  color: #ccc;
}

input[type="submit"] {
  width: 100%;
  background-color: var(--primary);
  color: #ccc;
  padding: 14px 20px;
  margin: 8px 0;
  margin-top: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: var(--primary-highlight);
}

a {
  text-decoration: none;
  color: var(--primary);
  cursor: pointer;
}

a:hover {
  color: var(--primary-highlight);
}

.message {
  font-style: italic;
  text-align: center;
  color: #ccc;
}

.status {
  text-align: center;
  text-emphasis: 600em;
  color: #a22;
}

.title {
  text-align: center;
  font-weight: 600;
  font-size: 18pt;
  color: #ccc;
}
</style>