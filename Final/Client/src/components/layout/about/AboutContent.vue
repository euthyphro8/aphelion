<template>
  <div class="container">
      <AnimatedLogo class="logo"/>
      <p class="title">About</p>
      <p class="content">This application was developed using NodeJs and Vue.</p>
  </div>
</template>

<script>
import AnimatedLogo from '@/components/AnimatedLogo';
export default {
    name: 'AboutContent',
    components: {
        AnimatedLogo
    }
}
</script>

<style  scoped>
    .container {
        width: 100%;
        height: 100%;
    }
    .title {
        text-align: center;
        text-emphasis: 600em;
        font-size: 4em;
        color: #ccc;
        margin: 0.25em 0;
    }
    .content {
        text-align: left;
        text-emphasis: 200em;
        font-size: 1em;
        color: #ccc;
        margin: 1em 2em;
    }
    .logo {
        width: 100%;
        height: 30%;
    }
</style>