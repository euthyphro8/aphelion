<template>
  <div class="container">
    <canvas ref="logo-canvas" />
  </div>
</template>

<script>
import LogoRenderer from '@/ts/graphics/LogoRenderer';

export default {
    name: 'AnimatedLogo',
    mounted() {
        const ctx = this.$refs['logo-canvas'].getContext('2d');
        this.logo = new LogoRenderer(ctx);
        this.logo.start();
    },
    methods: {

    }
};
</script>

<style scoped>

.container {
    width: 100%;
    height: 100%;
}

canvas {
    width: 100%;
    height: 100%;
}

</style>