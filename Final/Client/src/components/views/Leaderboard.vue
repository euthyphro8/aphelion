<template>
  <div class="container">
    <Parallax class="background" />
    <div class="box">
      <Board :entries="entries" />
    </div>
  </div>
</template>

<script>
import Parallax from '@/components/Parallax';
import Board from '@/components/layout/leaderboard/Board';

export default {
    name: 'Leaderboard',
    components: {
        Board,
        Parallax
    },
    async mounted() {
        const client = this.$store.state.client;
        try {
          const users = await client.requestLeaderBoards();
          console.log('[Leaderboard] Got leaderboard request back from server.');
          this.entries = users;
        }
        catch(error) {
          // TODO Set status message.
        }
    },
    data() {
        return {
            entries: []
        };
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
  left: 20%;
  top: 0%;
  width: 60%;
  height: 100%;
  min-width: 166px;
  min-height: 500px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.75);
}

</style>