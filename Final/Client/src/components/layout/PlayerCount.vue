<template>
  <div class="container">
      <p>{{ count }}</p>
  </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'PlayerCount',    
    data() {
        return {
            count: 0,
            refreshId: null
        };
    },
    mounted: function() {
        this.refreshId = setInterval(this.getPlayerCount.bind(this), 5000);
    },
    methods: {
        async getPlayerCount() {
            try {
                const result = await axios.get('/stats');
                console.log(`[PlayerCount] Got stats from fetch.`);
                this.count = result.data.playerCount;
            } catch(error) {
                console.log('[PlayerCount] Stats fetch failed.');
                this.stopRefresh();
            }
        },
        stopRefresh() {
            if(this.refreshId)
                clearInterval(this.refreshId);
        }
    }
}
</script>

<style scoped>
.container {
    position: absolute;
    left: 16px;
    bottom: 8px;
    width: 32px;
    height: 32px;
}

.container:hover     {
    cursor: default;
    left: 18px;
    bottom: 12px;
}
p:hover {
    font-size: 34px;
}

p {
    color: #fff;
    text-align: left;
    font-size: 32px;
}

</style>