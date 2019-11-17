<template>
  <div class="root">
    <Parallax class="background" />
    <div class="box">
    </div>
  </div>
</template>

<script>
import Parallax from '@/components/Parallax';

export default {
    name: 'Account',
    components: {
      Parallax
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
  font-family: "Roboto", sans-serif;   
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