<template>
  <div id="app">
    <router-view />
    <AboutLink />
    <BackgroundMusic />
    <PlayerCount />
  </div>
</template>

<script>

import AboutLink from '@/components/layout/about/AboutLink';
import BackgroundMusic from '@/components/layout/BackgroundMusic';
import PlayerCount from '@/components/layout/PlayerCount';

export default {
  components: {
      AboutLink,
      BackgroundMusic,
      PlayerCount
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

:root {
  --primary: #0C8346;
  --primary-highlight: #066333;
  --primary-font: #1d1d1d;
  --disabled: #2f4138;
  /* --disabled: #3d3d3d; */
}

* {
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  color: var(--primary-font);
}

html {
  overflow: hidden;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}

body {
  height: 100%;
  width: 100%;
}

#app {
  height: 100%;
  width: 100%;
}


</style>
