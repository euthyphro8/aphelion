<template>
  <div class="root">
    <Parallax class="background" />
    <div class="box">
      <RegisterForm id="register" :class="{'hidden':!isRegistering}" @switch-form="switchForm"/>
      <LoginForm id="login" :class="{'hidden':isRegistering}" @switch-form="switchForm"/>
    </div>
  </div>
</template>

<script>
import Parallax from '@/components/Parallax';
import RegisterForm from '@/components/layout/login/RegisterForm';
import LoginForm from '@/components/layout/login/LoginForm';

export default {
    name: 'Login',
    components: {
      Parallax,
      RegisterForm,
      LoginForm
    },
    data() {
        return {
            isRegistering: false
        };
    },
    methods: {
        switchForm() {
          this.isRegistering = !this.isRegistering;
        }
    }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);


.root {
  width: 100%;
  height: 100%;
}

.background {
  width: 100%;
  height: 100%;
}

.box {
  border-radius: 3px;
  backdrop-filter: blur(3px);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.75);
  
  font-family: "Roboto", sans-serif;   
  position: absolute;
  left: 30%;
  top: 20%;
  width: 40%;
  height: 60%;
  /* background: rgba(255, 255, 255, 0.3); */
  min-width: 166px;
  min-height: 500px;
}

.hidden {
  display: none;
}



</style>