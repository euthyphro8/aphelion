<template>
  <div id="app">
    <Leaderboard />
  </div>
</template>

<script>
import Leaderboard from './components/views/Leaderboard'

export default {
  name: 'app',
  components: {
    Leaderboard
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family:Arial, Helvetica, sans-serif;
  line-height: 1.4;
  width: 100vw;
  height: 100vh;
}

#app {
  width: 100%;
  height: 100%;
}

</style>
