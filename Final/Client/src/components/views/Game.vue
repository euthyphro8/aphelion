<template>
  <div class="container">
    <Parallax class="background" />
    <GameScreen class="screen"/>
    <GameMenu class="box" :class="{'hidden':menuHidden}"/>
  </div>
</template>

<script>
import Parallax from '@/components/Parallax';
import GameMenu from '@/components/layout/game/GameMenu';
import GameScreen from '@/components/layout/game/GameScreen';

export default {
    name: 'Game',
    components: {
      Parallax,
      GameMenu,
      GameScreen
    },
    data() {
        return {
          menuHidden: true
        };
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

.background {
  width: 100%;
  height: 100%;
}

.box {
  border-radius: 3px;
  backdrop-filter: blur(3px);
  position: absolute;
  left: 30%;
  top: 20%;
  width: 40%;
  height: 60%;
  min-width: 166px;
  min-height: 500px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.75);
}

.hidden {
  display: none;
}

.screen {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

</style>