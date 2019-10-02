<template>
    <div>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
import ParallaxRenderer from './ParallaxRenderer';

export default {
    name: "Parallax",
    created() {
        requestAnimationFrame(this.onDraw.bind(this));
    },
    methods: {

    }
}
</script>

<style>

</style>