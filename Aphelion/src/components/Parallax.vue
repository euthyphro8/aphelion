<template>
    <div class="container">
        <canvas ref="parallax-canvas"></canvas>
    </div>
</template>

<script>
import ParallaxRenderer from '@/ts/graphics/ParallaxRenderer';

export default {
    name: "Parallax",
    mounted() {
        let ctx = this.$refs['parallax-canvas'].getContext('2d');
        this.par = new ParallaxRenderer(ctx);
        this.par.start();
    },
    methods: {

    }
}
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