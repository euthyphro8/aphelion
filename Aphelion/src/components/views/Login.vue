<template>
<div class="root">
  <Parallax class="background"/>
  <div class='box'>
    <RegisterForm />
  </div>
</div>
</template>

<script>
import Parallax from '@/components/Parallax';
import RegisterForm from '@/components/layout/login/RegisterForm';

export default {
    name: 'login',
    components: {
      Parallax,
      RegisterForm
    }
}
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
  border-radius: 10px;
  font-family: "Roboto", sans-serif;   
  position: absolute;
  left: 30%;
  top: 25%;
  width: 40%;
  height: 50%;
  background: #F2F2F244;
  min-width: 166px;
}

</style>