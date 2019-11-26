<template>
  <div class="container">
      <AnimatedLogo class="logo"/>
      <p class="title">Technologies</p>
      <div class="lib-box">
        <img class ="lib-logo" src="@/assets/images/libraries/ts.png" />
        <img class ="lib-logo" src="@/assets/images/libraries/node.png" />
        <img class ="lib-logo" src="@/assets/images/libraries/babel.png" />
        <img class ="lib-logo" src="@/assets/images/libraries/vue.png" />
        <img class ="lib-logo" src="@/assets/images/libraries/socket-io.png" />
        <img class ="lib-logo" src="@/assets/images/libraries/mongodb.png" />
        <img class ="lib-logo" src="@/assets/images/libraries/bcrypt.png" />
      </div>
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
        overflow-y: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .container::-webkit-scrollbar { 
        display: none;
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
        padding-top: 10px;
        width: 100%;
        height: 30%;
        overflow: hidden;
    }

    .lib-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .lib-logo {
        padding: 10px;
        display: block;
        max-height: 300px;
        max-width: 300px;
        width: auto;
        height: auto;
    }
</style>