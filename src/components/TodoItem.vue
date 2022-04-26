<template>
  <li class="todo__item">
    <span :class="{ done: todo.completed }">
      <input
          type="checkbox"
          @change="onChange(todo.id)"
          :checked="todo.completed ?? false"
      >
      <strong>{{ index + 1 }}</strong>
      {{ uppercase( todo.title ) }}
    </span>
    <button
        class="rm"
        @click="removeTodo(todo.id)"
    >&times;</button>
  </li>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: Number
  },
  methods: {
    ...mapMutations( ['removeTodo', 'completedTodo'] ),
    removeTodo( id ) {
      this.removeTodo( id )
    },
    onChange( id ) {
      this.completedTodo(id)
    },
    uppercase( value ) {
      if( !value ) return ''
      return value.toUpperCase()
    }
  }
}
</script>