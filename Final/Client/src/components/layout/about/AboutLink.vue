<template>
  <div class="container"  v-on:click="onClick()">
      <img src="@/assets/images/Info.svg" alt="about">
  </div>
</template>

<script>
export default {
    name: 'AboutLink',
    methods: {
        onClick: function() {
        this.$router.push(`/about`);
        }
  }
}
</script>

<style scoped>
.container {
    position: absolute;
    right: 8px;
    bottom: 8px;
    width: 32px;
    height: 32px;
}

img {
    width: 100%;
    height: 100%;
}

.container:hover     {
    cursor: pointer;
    right: 7px;
    bottom: 7px;
    width: 36px;
    height: 36px;
}
</style>