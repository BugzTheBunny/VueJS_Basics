# App 3 - Playing

***In this part we will play with some of the cool features Vue has, and not really build an "app".***

----

This part we start from 0, meaning - we have a clean `app.js`, and we clear the html from the previous code:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App 3</title>
    <link rel="stylesheet" href="theme.css">
</head>
<body>

    <div class="container" id="app">
        <div class="card center">
            
        </div>
    </div>

<script src="https://unpkg.com/vue@next"></script>
<script src="app.js"></script>
</body>
</html>
```
This time we will create the Vue app in a different way, which is also legit.

```
Vue.createApp({

}).mount('#app')
```
Let's add eveything we need for further work:
```
Vue.createApp({
    data() {
        return {
            title:'I AM GROOOOOT'
        }
    },
    methods: {
        
    },
    computed: {

    },
    watch: {

    }
}).mount('#app')
```
add a title inside the card:
```
<div class="container" id="app">
    <div class="card center">
        <h1>{{ title }}</h1>
    </div>
</div>
```

---
## Lets play with directives
What's directives?  
it's what we were using all along, aka `v-if` / `v-for` / `v-else` / `v-bind` and so on, the docs are [HERE](https://v3.vuejs.org/api/directives.html) , also, you can just go to the [Api Reference ](https://v3.vuejs.org/api/) and see what Vue gives you.

---
#### **NOTE** : *When using directives, you are writting JS code so in the next example, what is inside v-text, is JS code. the 'title' is a variable, not a string in this example*
---

1. `v-text` allows you to remove the interpulation, this will provide the same result:
```
<h1 v-text="title"></h1>
```
2. `v-once` allows you to render an element a single time, even you will will change the content, it will stay the same, for example:
we made another h2, with `v-once`, the title inside of it is rendered, and while the button does change the text (you can see it in the first h2, the second one, will stay the same)
```
<div class="container" id="app">
    <div class="card center">
        <h2 v-text="title"></h2>

        <h2 v-once>{{title}}</h2>
        <button class="btn" @click="title='Changed!'">Change</button>
    </div>
</div>
```
3. `v-pre` - Skip compilation for this element and all its children. You can use this for displaying raw mustache tags.
if yo uuse v-pre, you will see {{title}} instead of the value of title, can be helpfull to show raw data.
```
<div class="container" id="app">
    <div class="card center">
        <h2 v-text="title"></h2>

        <h2 v-once>{{title}}</h2>
        <h2 v-pre>{{title}}</h2>

        <button class="btn" @click="title='Changed!'">Change</button>
    </div>
</div>
```
4. `v-html` - Allows you to "inject" html code into the html.  
(If you will try to use interpulation, it will just pass a string, so `<div>{{rawHtml}}</div>` will not work)  
`app.js`
```
data() {
    return {
        rawHtml : "<h1> Vue App </h1>",  <- Raw HTML
        title:'I AM GROOOOOT'
    }
},
```
`index.html`
```
<div class="card center">
    <div v-html="rawHtml"></div> <- That's how you inject it.
    <h2 v-text="title"></h2>
```
5. `v-cloak` - Allows you to cloak the unrendered elements, meaning, if you will refresh teh app now, you will see that HTML renders first, and only then you see the Vue change things, so u can see `{{title}}` in some places, one way to avoid that, is to use `v-cloak`
Usually you put v-cloak on the `root` element, on the `app` in our case.
```
<div class="container" id="app" v-cloak>
```
but after adding it, still nothing changes, becuase we need to parametrize it:  
in the following style in the `head` tag:
```
    <link rel="stylesheet" href="theme.css">
    <style>
        [v-cloak] {
            display: none;
        }
    </style>
</head>
```
Now you will see, that when you refresh the page, everything looks awesome, and you don't see the ugly pre-rendered items.

6. A: `v-for` also allows you to generate items normally, for examle we want to generate a list of numbers:  
This will generate you 10 items.
```
<ul class="list">
    <li class="list-item" v-for="number in 10"><strong>{{number}}</strong></li>
</ul>
```
6. B: `v-for` with an object:  
Let's assume we have an object, and we want to iterate over it, for example, only the values.
Let's create an object first:
```
...
title:'I AM GROOOOOT',
user: {
    firstName:'Tom',
    lastName:'Jerry',
    age:10
}
...
```
- Iteration A (Value Only)
```
<li class="list-item" v-for="param in user">{{param}}</li>
```
- Iteration B (Key + Value)
```
<li class="list-item" v-for="(param,key) in user">{{key}} : {{param}}</li>
```

---
## Let's play with them some more:
Let's make the page to show an array of numbers, if you click on a number, it will dissapear, and if there are no items left, it will show us a message.

add a list ot the data:
```
...
    lastName:'Jerry',
    age:10
},
items: [1,2,3,4,5] <- This
```
Let's make it so, that the `ul` is shown only if `items` is not empty.
```
<ul class="list" v-if="items.length">
```
also, iterate over the items and generate `li`, and add an `@click` event, which will use the index, to remove the item which is clicked from the `items` list:
```
<li 
    class="list-item"
    v-for="(item,index) in items"    <- Iteration with index
    @click="items.splice(index,1)"   <- Remove element from list by index
>
    <strong>{{item}}</strong>        <- Item rendering
</li>
<h1 v-text='items.length'></h1>      <- How muc elements left
<h1 v-else>No elements left :(</h1>  <- When no elements left
```

---
## `.stop` / `.prevent`

Vue allows you to stop a behaviour of default actions / custom actions.
for example, let's say we add an input near the `{{item}}` above, and make it:
```
<ul class="list" v-if="items.length">
    <li 
    class="list-item"
    v-for="(item,index) in items"
    @click="items.splice(index,1)"
    >
    <strong>{{item}}</strong>
    <input type="text"> <- this
    </li>
</ul>
```
You can see the input, but when you press it, it will dissapear, but we want the items to dissapear, only of we press the number, not the input, we can use `.stop` method.
```
<input type="text" @click.stop>
```
This will stop the `@click` event that we created, and when you press on the input, it will stay.  
It's also important to mention `.prevent`, which prevents teh default behaviour, they also can be modified. for example `@click.prevent="functionHere()"` OR inside the html `<input type="text" @click.prevent="title='I AMMMM GROOOT'">`

Or, combine them in our case (first you stop the action we created, and then use the prevent):
```
<input type="text" @click.stop.prevent="title='I AMMMM GROOOT'">
```

---
## Key <- This is kind important.
If you will try to write something in the first / second third field right now, and then delete it, you will see something wierd, the item is deleted, but the input is not, that's because of the [Virtual DOM](https://blog.logrocket.com/how-the-virtual-dom-works-in-vue-js/), how we fix it? we use `v-bind:key` to identify the elements, we make every item unique.  
All you need to do is to add `v-bind:key="item"`, the "item" in the key, is a uniqu identifier, meaning, you can also use the index.

Example:  
- item as key:
```
<li 
class="list-item"
v-for="(item,index) in items"
@click="items.splice(index,1)"
v-bind:key="item"
>
```

- index as key:

```
<li 
class="list-item"
v-for="(item,index) in items"
@click="items.splice(index,1)"
v-bind:key="index"
>
```
---
## Let's just play with some filtering, loops and computed.
Let's make it so, that we get only the even numbers (2,4 in our case).
We will make a computed property - beacause we want to make it optimized, and we want the loop to generate only the even numbers.  
this will return a list of only odd numbers:
```
computed: {
    evenItems() {
        return this.items.filter(i => i % 2 === 0) <- this
    }
```

let's modify the `ul` element and remove the click event:
```
<li class="list-item" v-for="(item,index) in evenItems" v-bind:key=" item">
```
Now, you will see that we will get only the odd numbers, and an input for them.


This is everything on the base of Vue3, The rest is out there in the documentation.