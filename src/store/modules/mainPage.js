export default {
    actions: {
        async fetchTodos(ctx, limit = 3) {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
            const todos = await res.json()
            ctx.commit('updateTodos', todos)
        }
    },
    mutations: {
        updateTodos( state, todos ) {
            state.loading = false
            state.todos = todos
        },
        createTodo( state, newTodo ) {
            state.todos.push( newTodo )
        },
        removeTodo( state, removeId ) {
            console.log( removeId )
            state.todos = state.todos.filter( todo => todo.id !== removeId )
        },
        updateFilter( state, newValue ) {
            state.filter = newValue
        },
        completedTodo( state, completedId ) {
            state.todos = state.todos.map( todo => {
                if( todo.id === completedId ){
                    todo.completed = !todo.completed
                }
                return todo
            } )
        }
    },
    state: {
        todos: [],
        loading: true,
        filter: 'all'
    },
    getters: {
        getAllTodos( state ) {
            return state.todos
        },
        getFilteredTodos( state ) {
            if( state.filter === 'all' ) {
                return state.todos
            }
            if( state.filter === 'completed' ) {
                return state.todos.filter( item => item.completed )
            }
            if( state.filter === 'not-completed' ) {
                return state.todos.filter( item => !item.completed )
            }
        },
        getFilter( state ) {
            return state.filter
        },
        getLoading( state ) {
            return state.loading
        }
    }
}