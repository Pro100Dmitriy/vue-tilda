<template>
  <li class="todo__item">
    <span :class="{ done: todo.completed }">
      <input
          type="checkbox"
          @change="todo.completed = !todo.completed">
      <strong>{{ todo.id }}</strong>
      {{ todo.title }}
    </span>
    <button class="rm" @click="$emit('removeTodo');">&times;</button>
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
}
</script>