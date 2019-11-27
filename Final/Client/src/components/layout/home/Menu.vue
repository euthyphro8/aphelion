<template>
  <div class="menu-box">
    <div class="title">Aphelion</div>
    <div class="menu-item"  v-on:click="onClick('game')"><p>Play</p></div>
    <div class="menu-item"  v-on:click="onClick('account')"><p>Account</p></div>
    <div class="menu-item"  v-on:click="onClick('leaderboard')"><p>Leaderboards</p></div>
    <!-- <div class="menu-item"  v-on:click="onClick('about')"><p>About</p></div> -->
  </div>
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    onClick: function(location) {
      this.$router.push(`/${location}`);
    }
  }
};
</script>

<style scoped>
.menu-box {
  width: 100%;
  height: 100%;
  
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
}

.title {
  width: 100%;
  padding: 5% 0;
  
  font-size: 10vmin;
  font-weight: 900;
  text-align: center;
  color: #cccccc;
  cursor: default;
}

.menu-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-item:hover {
  background: rgb(6, 99, 51);
}

p {
  font-size: 4vmin;
  font-weight: bolder;
  text-align: center;
  color: #cccccc;
  cursor: default;
}

</style>