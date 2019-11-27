<template>
  <div class="container">
    <Parallax class="background" />
    <div class="box">
      <AccountPage />
    </div>
  </div>
</template>

<script>
import Parallax from '@/components/Parallax';
import AccountPage from '@/components/layout/account/AccountPage';

export default {
    name: 'Account',
    components: {
      Parallax,
      AccountPage
    },
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>

<style scoped>
.container {
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
  position: absolute;
  left: 30%;
  top: 20%;
  width: 40%;
  height: 60%;
  min-width: 166px;
  min-height: 500px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.75);
}

.hidden {
  display: none;
}



</style>