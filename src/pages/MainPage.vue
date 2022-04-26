<template>
  <div class="container">
    <div class="main-page">
      <h1>{{ title }}</h1>
      <router-link to="/about">Adout Page</router-link>
      <AddTodo/>
      <select name="filter-option" v-model="getFilter" @change="changeFilter">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="not-completed">Not Completed</option>
      </select>
      <LoaderComponent v-if="getLoading"/>
      <TodoList
          :todos="getFilteredTodos"
          v-else-if="getFilteredTodos.length"
      />
      <p v-else>No todos!</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import TodoList from "@/components/TodoList"
import AddTodo from "@/components/AddTodo"
import LoaderComponent from "@/components/LoaderComponent"

export default {
  name: "MainPage",
  props: {
    title: String
  },
  components: { TodoList, AddTodo, LoaderComponent },
  methods: {
    ...mapActions( ['fetchTodos'] ),
    ...mapMutations( ['updateFilter'] ),
    changeFilter( event ) {
      this.updateFilter(event.target.value)
    }
  },
  computed: mapGetters( ['getAllTodos', 'getFilteredTodos', 'getFilter', 'getLoading'] ),
  async mounted() {
    this.fetchTodos(6)
  }
}
</script>