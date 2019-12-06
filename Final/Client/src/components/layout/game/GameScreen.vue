<template>
    <div class="container" ref="container">
        <canvas :class="{'width-bias':widthBias, 'height-bias':!widthBias}" ref="screen" />
    </div>
</template>

<script>

import Game from '@/ts/graphics/game/Game';

export default {
    name: 'GameScreen',
    data() {
        return {
            game: null,
            widthBias: false
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize);
        const client = this.$store.state.client;
        client.requestAccountInfo().then((user) => {
            const ctx = this.$refs['screen'].getContext('2d', { alpha: false });
            this.game = new Game(ctx, client, user);
            this.game.once('close', this.onShuttingDown);
            this.game.start();
        });
        this.onResize(null);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
        if(this.game) {
            this.game.close();
        }
    },
    beforeRouteLeave (to, from, next) { 
        if(this.game) {
            this.game.close();
        }
        next();
    },
    methods: {
        onResize(event) {
            let w = this.$refs['container'].clientWidth; 
            let h = this.$refs['container'].clientHeight;
            this.widthBias = (h > (w / 16 * 9));
        },
        onShuttingDown() {
            this.$router.push(`/`);
        }
    },
};
</script>

<style scoped>

.container {
    width: 100%;
    height: 100%;
}

.width-bias {
    width: 100vw;
    height: calc(100vw * 9 / 16);
    transform: translateY(calc((100vw * 9 / 16 - 100vh) / -2));
}

.height-bias {
    width: calc(100vh * 16 / 9);
    height: 100vh;
    transform: translateX(calc((100vh * 16 / 9 - 100vw) / -2));
}

</style>