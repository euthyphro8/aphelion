<template>
  <div class="grid-container">
      <div class="left"></div>
      <div class="right">
          <Board v-bind:entries="entries"/>
      </div>
  </div>
</template>

<script>
import Board from '../components/layout/leaderboard/Board';

export default {
    name: 'leaderboard',
    components: {
        Board
    },
    data() {
        return {
            entries: [
                {"id":0,"username":"euthyphro","score":9999,"email":"joshhess13@gmail.com"},
                {"id":1,"username":"Eli","score":2134,"email":"eherries0@shareasale.com"},
                {"id":2,"username":"Carissa","score":2862,"email":"cende1@canalblog.com"},
                {"id":3,"username":"Any","score":8579,"email":"aarnao2@bloomberg.com"},
                {"id":4,"username":"Ingar","score":160,"email":"iblucher3@mtv.com"},
                {"id":5,"username":"Parsifal","score":9510,"email":"pledster4@mozilla.org"},
                {"id":6,"username":"Shayne","score":5804,"email":"skleszinski5@rambler.ru"},
                {"id":7,"username":"Fedora","score":8878,"email":"fdibsdale6@netscape.com"},
                {"id":8,"username":"Hewitt","score":5524,"email":"hbackshaw7@spiegel.de"},
                {"id":9,"username":"Joline","score":75,"email":"jpizzey8@meetup.com"},
                {"id":10,"username":"Kale","score":4271,"email":"kdebiasi9@1688.com"}
            ]
        }
    }
}
</script>

<style>

.grid-container {
    display: grid;
    grid-template-areas: 
        "left right";
        
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 100%;
}

    @media only screen and (max-width: 600px) {
        .grid-container {
        display: grid;
        grid-template-areas: 
            "left"
            "right";
        grid-template-rows: 0.1fr 0.9fr;
        grid-template-columns: 1fr;
        width: 100%;
        height: 100%;
    }
}

    .left {
        grid-area: left;
        background: #151D29;
        width: 100%;
        height: 100%;
    }

    .right {
        grid-area: right;
        background: #0C8346;
        width: 100%;
        height: 100%;
    }

</style>