<template>
  <div class="container">
    <div class="main-page">
      <h1>{{ title }}</h1>
      <TodoList
          :todos="todos"
          @remove-todo="removeTodo"
      />
    </div>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList";

export default {
  name: "MainPage",
  props: {
    title: String
  },
  data() {
    return {
      todos: [
        {id: 1, title: 'Bread', completed: true},
        {id: 2, title: 'Bread Two', completed: false},
        {id: 3, title: 'Bread Three', completed: false},
      ]
    }
  },
  components: {
    TodoList
  },
  methods: {
    removeTodo(id) {
      console.log(id)
    }
  }
}
</script>