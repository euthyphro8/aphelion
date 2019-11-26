<template>
  <div class="form-container">
    <img class="logo" src="@/assets/images/LogoGrey.png" alt="Logo">
    <br>
    <p class="title">Login</p>
    <br>
    <form @submit="handleSubmit" novalidate="true">
      <input v-model="humanId" type="text" placeholder="Username or Email">
      <input v-model="password" type="password" placeholder="Password">
      <input :disabled="disabled" type="submit" value="Submit">
    <p class="status">{{status}}</p>
    </form>
    <p class="message"> Need an account? <a id="login" @click="$emit('switch-form')">Register</a>
    </p>
  </div>
</template>

<script>
import Validator from '@/ts/util/Validator';
export default {
  name: 'LoginForm',
  data() {
    return {
      humanId: '',
      password: '',
      disabled: false,
      status: ''
    };
  },
  methods: {
    handleSubmit: async function (event) {
      this.disabled = true;
      console.log(`[Login] Got login submit. ${this.humanId} ${this.password}`);
      const validEmail = Validator.VerifyEmail(this.humanId);
      const validUser = Validator.VerifyUsername(this.humanId);
      const validPass = Validator.VerifyPassword(this.password);
      if((validEmail || validUser) && validPass) {
        console.log('[Login] Validated.');
        const result = await this.$store.state.client.requestLogin(this.humanId, validEmail, this.password);
        if(result) {
          console.log('[Login] Server accepted login.');
          this.$store.commit('authenticate');
          this.$router.push('/');
        }
        else {
          console.log('[Login] Failed to login.');
          this.disabled = false;
          this.status = 'Bad login credentials.'
        }
      }else {
        console.log('[Login] Failed to validate.');
        this.disabled = false;
          if(!(validEmail || validUser)) {
            this.status = 'Must enter a valid username or email.'
          }
          if(!this.password) {
            this.status = 'Invalid login credentials.'
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
input[type="submit"]:disabled {
  background-color: var(--disabled);
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