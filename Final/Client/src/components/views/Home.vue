<template>
  <div class="grid-container">
    <div class="left">
      <Menu />
    </div>
    <div class="right">
      <Parallax />
      <img
        class="logo"
        src="@/assets/LogoGrey.png"
        alt="logo"
      >
    </div>
  </div>
</template>

<script>
  import Menu from '@/components/layout/home/Menu';
  import Parallax from '@/components/Parallax';
  
  export default {
    name: 'Home',
    components: {
      Menu,
      Parallax
    }
  };
</script>

<style scoped>

.grid-container {
    display: grid;
    grid-template-areas: 
        "left right";
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 100%;
}

@media only screen and (max-width: 600px) {
    .grid-container {
        display: grid;
        grid-template-areas: 
            "left"
            "right";
        grid-template-rows: 0.1fr 0.9fr;
        grid-template-columns: 1fr;
        width: 100%;
        height: 100%;
    }
}

    .left {
        grid-area: left;
        background: #0C8346;
        width: 100%;
        height: 100%;
    }

    .right {
        grid-area: right;
        background: #151D29;
        width: 100%;
        height: 100%;
    }

    .logo {
      position: absolute;
      height: 50vh;
      top: 25%;
      width: 25%;
      left: 62.5%;
      /* left: 10px; */
    }

</style>