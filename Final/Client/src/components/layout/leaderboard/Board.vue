<template>
  <div>
    <div class="title">Leaderboards</div>
    <div class="entry-container">
      <div class="entry-header" />
      <div v-for="entry in entries" :key="entry.id">
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

.title {
    margin: 2vmin 0;
    height: 6vmin; 
    font-size: 6vmin;
    font-weight: 600;
    width: 100%;
    text-align: center;
    color: #EEEEEE;
}

.entry-container {
  display:block;
  position:fixed;
  top: 10%;
  left: 0;
  height: 90%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;    
}


.entry-container::-webkit-scrollbar-track
{
	background-color: #F5F5F500;
}

.entry-container::-webkit-scrollbar
{
	width: 2px;
	background-color: #F5F5F500;
}

.entry-container::-webkit-scrollbar-thumb
{
	background-color: #CCCCCC;
}

</style>