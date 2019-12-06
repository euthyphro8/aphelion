<template>
  <div class="board-entry">
    <img
      class="avatar"
      :src="'' + gravatar"
    >
    <p class="name">
      {{ entry.username }}
    </p>
    <p class="score">
      {{ entry.score }}
    </p>
  </div>
</template>

<script>
import md5 from 'md5';

export default {
    name: 'BoardEntry',
    props: ['entry'],
    data() {
        return {
            gravatar: `https://gravatar.com/avatar/${md5(this.entry.avatar.toLowerCase())}`
        };
    }
};
</script>

<style scoped>

    .board-entry {
        /* background: #0C8346; */
        display: flex;
        height: 100px;
        font-weight: bolder;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .board-entry:hover {
        background: #066333;
    }

    .avatar {
        padding: 10px;
        flex-shrink: 1;
    }

    .name {
        flex-grow: 1;
        margin: 0;
        padding: 0;
        padding: 10px;
        color: #cccccc;
    }

    .score {
        padding: 10px;
        width: 100px;
        color: #cccccc;
    }

</style>