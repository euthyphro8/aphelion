<template>
  <div class="container"  v-on:click="onClick()">
      <img v-bind:class="{hidden: isMuted}" src="@/assets/images/MusicOn.svg" alt="Mute Catnip (c)">
      <img v-bind:class="{hidden: !isMuted}" src="@/assets/images/MusicOff.svg" alt="Mute Catnip (c)">
      <audio v-bind:ref="'music'"  muted="muted" autoplay loop src="/Catnip.mp3" type="audio/mp3"/>
  </div>
</template>

<script>
export default {
    name: 'BackgroundMusic',    
    data() {
        return {
            isMuted: false,
            music: null
        };
    },
    methods: {
        onClick: function() {
            this.isMuted = !this.isMuted;
            if(this.isMuted) {
                 this.$refs.music.pause();
            }else {
                 this.$refs.music.play();
            }
        }
    },
    mounted: function() {
        // this.$refs.music.play();
    }
}
</script>

<style scoped>
.container {
    position: absolute;
    right: 42px;
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
    right: 41px;
    bottom: 7px;
    width: 36px;
    height: 36px;
}

.hidden {
    display: none;
}

</style>