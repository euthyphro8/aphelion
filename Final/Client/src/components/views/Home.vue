<template>
  <div class="container">
    <Parallax />
    <div class="right">
      <AnimatedLogo class="logo"/>
    </div>
    <div class="left">
      <Menu/>
    </div>
  </div>
</template>

<script>
  import Menu from '@/components/layout/home/Menu';
  import Parallax from '@/components/Parallax';
  import AnimatedLogo from '@/components/AnimatedLogo';
  
  export default {
    name: 'Home',
    components: {
      Menu,
      Parallax,
      AnimatedLogo
    }
  };
</script>

<style scoped>

.container {
  width: 100%;
  height: 100%;
}

.left {
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
  backdrop-filter: blur(3px);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.75);
}

.right {
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
}

.logo {
  width: 100%;
  height: 100%;
}

</style>