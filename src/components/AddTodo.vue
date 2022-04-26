<template>
  <form class="add-todo" @submit.prevent="onSubmit">
    <label for="input" hidden>Add todo item</label>
    <input class="add-todo__input" v-model="title" id="input" type="text">
    <button class="add-todo__button" type="submit">Create</button>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "AddTodo",
  data() {
    return {
      title: ''
    }
  },
  methods: {
    ...mapMutations( ['createTodo'] ),
    onSubmit() {
      if( this.title.trim() ){
        const newTodo = {
          id: Date.now(),
          title: this.title,
          completed: false
        }

        this.createTodo(newTodo)

        this.title = ''
      }
    }
  }
}
</script>