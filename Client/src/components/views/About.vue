<template>
  <div class="root">
    <Parallax class="background" />
    <div class="box">
        <AboutContent />
    </div>
  </div>
</template>

<script>
import Parallax from '@/components/Parallax';
import AboutContent from '@/components/layout/about/AboutContent';

export default {
    name: 'About',
    components: {
      Parallax,
      AboutContent
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
  position: absolute;
  left: 20%;
  top: 0%;
  width: 60%;
  height: 100%;
  min-width: 166px;
  min-height: 500px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.75);
}


</style>