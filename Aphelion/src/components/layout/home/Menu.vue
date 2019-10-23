<template>
  <div class="menu">
    <div class="menu-box">
        <div class="title">
            Game
        </div>
        <a href="/#/game">
            <div class="menu-item">
                <p>Play</p>
            </div>
        </a>
        <a href="/#/account">
            <div class="menu-item">
                <p>Account</p>
            </div>
        </a>
        <a href="/#/leaderboard">
            <div class="menu-item">
                <p>Leaderboards</p>
            </div>
        </a>
        <a href="/#/about">
            <div class="menu-item">
                <p>About</p>
            </div>
        </a>
    </div>
  </div>
</template>

<script>
export default {
    name: "Menu"
}
</script>

<style scoped>

    .menu-box {
        width: 100%;
        height: 100%;
        /* padding: 10% 2%; */
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        align-items: center;
        flex-direction: column;
    }

    .menu-item {
        background: #0C8346;
        font-weight: bolder;
    }
    
    .menu-item:hover {
        background: rgb(6, 99, 51);
    }

    a {
        text-decoration: none;        
    }

    p {
        font-size: 4vmin;
        width: 100%;
        text-align: center;
        color: #cccccc;
    }

    .title {
        font-size: 10vmin;
        font-weight: 900;
        text-align: center;
        color: #cccccc;
    }
</style>