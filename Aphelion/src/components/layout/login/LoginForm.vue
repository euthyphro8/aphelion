<template>
  <div class="form-container">
    <img
      class="logo"
      src="@/assets/LogoGrey.png"
      alt="Logo"
    >
    <br>
    <p class="title">
      Login
    </p>
    <br>
    <form @submit="handleSubmit">
      <input
        v-model="id"
        type="text"
        placeholder="Username or Email"
      >
      <input
        v-model="password"
        type="password"
        placeholder="Password"
      >
      <input
        type="submit"
        value="Submit"
      >
    </form>
    <p class="message">
      Need an account?
      <a
        id="login"
        @click="$emit('switch-form')"
      >Register</a>
    </p>
  </div>
</template>

<script>
import Validator from '@/ts/util/Validator';
export default {
  name: 'RegisterForm',
  data() {
    return {
      id: '',
      password: ''
    };
  },
  methods: {
    handleSubmit: function(e) {
      if (Validator.VerifyUsername(this.id) || Validator.VerifyEmail(this.id)) {
        if (Validator.VerifyPassword(this.password)) {
          this.$store.commit('authenticate');
          this.$router.push('/');
          return;
        }
      }
      console.log('[Login] Failed to validate.');
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

.title {
  text-align: center;
  font-weight: 600;
  font-size: 18pt;
  color: #ccc;
}
</style>