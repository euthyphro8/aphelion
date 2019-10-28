<template>
  <div class="todo-item" v-bind:class="{'is-complete':todo.completed}">
    <p>
        <input type="checkbox" v-on:change="markComplete">
        {{todo.title}}
        <button @click="$emit('del-todo', todo.id)" class="del">x</button>
    </p>
  </div>
</template>

<script>
export default {
    name: "TodoItem",
    props: ["todo"],

    methods: {
        markComplete(event) {
            this.todo.completed = event.target.checked;
        }
    }

}
</script>

<style>
    .todo-item {
        background: #f4f4f4;
        padding: 10px;
        border-bottom: #ccc dotted;
    }

    .is-complete {
        text-decoration: line-through;
    }

    .del {
        background: #ff0000;
        color: #fff;
        border: none;
        border-radius: 50%;
        padding: 5px 9px;
        cursor: pointer;
        float: right;
    }
</style>