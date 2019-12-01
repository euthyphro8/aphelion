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
            refreshId: 0
        };
    },
    mounted: function() {
        this.refreshId = setInterval(this.getPlayerCount.bind(this), 3000);
    },
    methods: {
        async getPlayerCount() {
            try {
                const result = await axios.get('/stats');
                console.log(`[PlayerCount] Got result from server. ${JSON.stringify(result)}`);
                this.count = result.playerCount;
            } catch(error) {
                console.log('[PlayerCount] Fetch failed.');
                this.stopRefresh();
            }
        },
        stopRefresh() {
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