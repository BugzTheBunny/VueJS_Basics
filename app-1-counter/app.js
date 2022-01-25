const App = {
    data(){
        return {
            counter: 0,
            title: "Counter: "
        }
    }
}

const app = Vue.createApp(App)
app.mount('#app')