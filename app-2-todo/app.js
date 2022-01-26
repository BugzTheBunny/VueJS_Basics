const App = {
    data(){
        return {
            title: "Todo List",
            placeholderString: "Add a new todo",
            inputValue: '',
            todos: []
        }
    },
    methods: {
        // inputChangeHandler(event){
        //     this.inputValue = event.target.value
        // },

        addTodo(){
            if (this.inputValue !== ''){
                this.todos.push(this.inputValue)
                this.inputValue = ''
            }
        },
        
        // submitEnter(event){
        //     if (event.key == "Enter") {
        //         this.addTodo()
        //     }
        // }

        deleteTodo(index,event){
            this.todos.splice(index,1)
        },
    },
    computed: {
        doubledTodos(){
            return this.todos.length * 2
        }
    },
    watch: {
        inputValue(value){
            if (value == "send nudes"){
                this.inputValue = ''
            }
        }
    }
}

const app = Vue.createApp(App)
app.mount('#app')