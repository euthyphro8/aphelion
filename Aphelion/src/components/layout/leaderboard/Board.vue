<template>
  <div>
    <Header :title="'LeaderBoards'" />
    <div class="entry-container">
      <div class="entry-header" />
      <div
        v-for="entry in entries"
        :key="entry.id"
      >
        <BoardEntry :entry="entry" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../Header';
import BoardEntry from './BoardEntry';

export default {
  name: 'Board',
  components: {
    Header,
    BoardEntry
  },
  props: ['entries']
};
</script>

<style scoped>
.entry-container {
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>