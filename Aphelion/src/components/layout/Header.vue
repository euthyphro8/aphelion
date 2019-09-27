<template>
  <header class="header">
      <h1>{{title}}</h1>
  </header>
</template>

<script>
export default {
    name: "Header",
    props: ["title"]
}
</script>

<style scoped>
    .header {
        background: #41B883;
        color: #35495E;
        text-align: center;
        padding: 10px;
    }

    .header a {
        color: #35495E;
        padding-right: 5px;
    }
</style>