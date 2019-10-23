<template>
    <div class="title">
        {{title}}
    </div>
</template>

<script>
export default {
    name: "Header",
    props: ["title"]
}
</script>

<style scoped>
    .title {
        font-size: 6vmin;
        font-weight: 600;
        width: 100%;
        text-align: center;
        color: #151D29;
    }
</style>