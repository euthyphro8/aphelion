<template>
    <canvas ref="screen" />
</template>

<script>

import GameRenderer from '@/ts/graphics/GameRenderer';

export default {
    name: 'GameScreen',
    data() {
        return {
            screen: null
        }
    },
    mounted() {
        const ctx = this.$refs['screen'].getContext('2d');
        this.screen = new GameRenderer(ctx);
        this.screen.start();
    },
    methods: {

    }
};
</script>

<style scoped>


canvas {
    width: 100%;
    height: 100%;
}

</style>