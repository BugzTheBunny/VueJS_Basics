Vue.createApp({
    data() {
        return {
            rawHtml: "<h1> Vue App </h1>",
            title: 'I AM GROOOOOT',
            user: {
                firstName: 'Tom',
                lastName: 'Jerry',
                age: 10
            },
            items: [1, 2, 3, 4, 5]
        }
    },
    methods: {

    },
    computed: {
        evenItems() {
            return this.items.filter(i => i % 2 === 0)
        }
    },
    watch: {

    }
}).mount('#app')