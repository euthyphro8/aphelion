<template>
  <div class="grid-container">
      <div class="left"></div>
      <div class="right"></div>
  </div>
</template>

<script>
export default {
    name: "Leaderboard"
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