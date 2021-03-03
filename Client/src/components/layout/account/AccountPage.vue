<template>
  <div class="container">
    <p class="status">{{status}}</p>
    <img class="avatar" :src="'' + gravatar">
    <p class="name">{{ name }}</p>
    <p class="email">({{ email }})</p>
    <p class="score">- Score {{ score }} -</p>
  </div>
</template>

<script>
import md5 from 'md5';

export default {
    name: 'AccountPage',
    data() {
        return {
            account: null,
            status: '',
            gravatar: '',
            name: '',
            email: '',
            score: 0
        };
    },
    async mounted() {
        this.account = await this.getAccount();
        if(!this.account) {
            status = 'Unable to retrieve account.';
            return;
        }
        this.name = this.account.username.toUpperCase();
        this.email = this.account.email;
        this.score = this.account.score;
        this.gravatar = await this.getGravatar();
    },
    methods: {
        async getAccount() {
            if(this.account) return this.account;
            try {
                return await this.$store.state.client.requestAccountInfo();
                console.log(`[Account] Got back account info from server.`);
            }catch(error) {
                console.log('[Account] Error while getting account info.');
            }
        },
        async getGravatar() {
            return `https://gravatar.com/avatar/${md5(this.account.avatar.toLowerCase())}?size=256`;
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
}

.status {
  text-align: center;
  text-emphasis: 600em;
  color: #a22;
}

.avatar {
    width: 30%;
    height: auto;
    margin: 10px 0;
    border: 5px solid #fff;
    border-radius: 500px;
    -webkit-border-radius: 500px;
    -moz-border-radius: 500px;
}

.name {
    color: #fff;
    font-size: 3vmin;
    padding: 20px 0 0 0;
}

.email {
    color: #ccc;
    font-size: 1.5vmin;
}

.score {
    color: #fff;
    font-size: 2vmin;
    padding: 20px 0;
}

</style>