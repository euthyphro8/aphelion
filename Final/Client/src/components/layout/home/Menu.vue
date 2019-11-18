<template>
  <div class="menu-box">
    <div class="title">
      Game
    </div>
    <div class="menu-item"  v-on:click="onClick('game')">
      <p>Play</p>
    </div>
    <div class="menu-item"  v-on:click="onClick('account')">
      <p>Account</p>
    </div>
    <div class="menu-item"  v-on:click="onClick('leaderboards')">
      <p>Leaderboards</p>
    </div>
    <div class="menu-item"  v-on:click="onClick('about')">
      <p>About</p>
    </div>
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
  justify-content: space-around;
  flex-wrap: nowrap;
  align-items: center;
  flex-direction: column;
}

.menu-item {
  background: #0c8346;
  font-weight: bolder;
  width: 100%;
  height: 100%;
}

.menu-item:hover {
  background: rgb(6, 99, 51);
}

a {
  text-decoration: none;
  width: 100%;
  height: 100%;
  text-align: center;
}

p {
  font-size: 4vmin;
  width: 100%;
  text-align: center;
  color: #cccccc;
}

.title {
  font-size: 10vmin;
  font-weight: 900;
  text-align: center;
  color: #cccccc;
  width: 100%;
  height: 100%;
}
</style>