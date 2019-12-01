<template>
    <canvas ref="screen" />
</template>

<script>

import GameRenderer from '@/ts/graphics/game/GameRenderer';

export default {
    name: 'GameScreen',
    data() {
        return {
            screen: null
        }
    },
    mounted() {
        const ctx = this.$refs['screen'].getContext('2d', { alpha: false });
        this.screen = new GameRenderer(ctx, this.$store.state.client);
        this.screen.start();
    },
    methods: {

    },
    beforeRouteLeave (to, from, next) { 
        if(this.screen) {
            this.screen.close();
        }
        next();
    }
};
</script>

<style scoped>


canvas {
    width: 100%;
    height: 100%;
}

</style>