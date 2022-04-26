<template>
  <div class="todo">
    <ul class="todo__list">
      <TodoItem
          v-for="(todo, i) of todos"
          :todo="todo"
          :index="i"
          :key="todo.id"
      />
    </ul>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";

export default {
  name: "TodoList",
  props: {
    todos: Array
  },
  components: {
    TodoItem
  }
}
</script>