# App 2 - Todo List

We continue from the last tutorial, and clear some things, and add some.

- We are replacing the counter with a form, which includes 1 field, the title, and a button, and we add a placeholder in the input.
```
...
<div class="container" id="app">
    <div class="card">
        <h1>{{ title }}</h1>
        <div class="form-control">
            <input type="text">
        </div>
        <button class="btn">Add</button>
    </div>
</div>
...
```
- We removed the counter, and renamed the title:
```
const App = {
    data(){
        return {
            title: "Todo List",
            placeholderString : "Add a new todo"
        }
    }
}
...
```

If you refresh the page, you will see that the placeholder is working incorrectly, because you can't interpolate to elements attributes.  
but Vue let's you the option to bind to items attributes, like so:
```
<input type="text" v-bind:placeholder="placeholderString">
```
Now once we have binded to the element, you will see that the placeholder is indeed working as needed.  

----
### **Make the input do something:**

we want to add "value" attribute to the input, in order to bind it.
```
<input type="text" v-bind:placeholder="placeholderString" v-bind:value="inputValue">
```
and of course add the value `inputValue` into app.js with the rest of the items.
```
...
return {
    title: "Todo List",
    placeholderString: "Add a new todo",
    inputValue: ''
}
...
```
After this, if you will try to add {{inputValue}} somewhere, you will notice, that it does not change, if you actually input something, that's because we need to add "`v-on:input`".
```
<div class="form-control">
    <input type="text" 
    v-bind:placeholder="placeholderString" 
    v-bind:value="inputValue"
    v-on:input=""
    >
</div>
```
this will allow us to use functions with Vue.  
we add a new functionality to the Vue App now in `app.js`, and we will make a handler of the input inside
```
const App = {
    data(){
        ...
    },
    methods: {
         /* Inside here, you can add functions to interact with the app. */

        inputChangeHandler(){
            console.log('works')
        }
    }
}
```
and we add the function to the input 
```
<input type="text" 
v-bind:placeholder="placeholderString" 
v-bind:value="inputValue"
v-on:input="inputChangeHandler"
>
```

Now after you refresh the page, you should see logs in the console on update of the input.

But we want to get the value and to change it, by default, `inputChangeHandler()` will recive event, which can be used.

so if we add the parameter to the function, and try to print the event, we will see the event data, also, we will print the item we need from the even, which is `.target.value`

```
methods: {
    inputChangeHandler(event){
        console.log(event) <- the event object
        console.log(event.target.value) <- Value we need
    }
}
```
so in order to change `inputValue` all we need to do is to write the function as follows:
```
inputChangeHandler(event){
    this.inputValue = event.target.value
}
```

if you want to show it now in real time, just add it somewhere, for example:
```
<div class="container">
    <h2>current: {{ inputValue }}</h2>
</div>
```
---
#### **NOTE** : *There is a better way to handle inputs, but for now this is wat is used to understand how it works.*

----
### **Make the button do something:**

This should be a simple one, we used `v-on:click` in the previous tutorial, so if we want to create a todo list which gets the todo from the input on click, all we need to do is:
1. add an array of todos:
```
return {
    title: "Todo List",
    placeholderString: "Add a new todo",
    inputValue: '',
    todos: [] <- this thingy.
}
```
2. Create a new function that adds the current input to the list, and clears the input after it's added:

```
addTodo(){
    this.todos.push(this.inputValue) <- takes current input, and adds it.
    this.inputValue = '' <- cleans the current input.
    console.log(this.todos) <- just so you can see the current array of items.
}
```
----
### **Show todos list:**
Well, all we need to do now is just to show the list of the todos, so let's add something to the html to represent it, you can add this under the button.
```
<hr>
<ul class="list">
    <li class="list-item">
        {{ todos[0] }}
    </li>
    <li class="list-item">
        {{ todos[1] }}
    </li>
</ul>
```
as you can see, here we show only 2 todos, so it's not the right way to do so.  
we will need to `loop` the todos, and show them, the way to do so is:

```
<ul class="list">
    <li class="list-item" v-for="todo in todos">
        {{ todo }}
    </li>
</ul>
```
---
**explanation:** *we need to find the element we want to iterate it, meaning, we want `li` elements to generate for each item, so we add the `v-for` into it, and then it's not different than any other loop `todo in todos` (`todo` can be anything you want to name it, but `todos` reffers to the data which is binded to the page.) and as you see we use the `{{ todo }}` to show the item (again, you are the one to select that variable name, so if you want to call it for example `item` it will look like this:*
```
<ul class="list">
    <li class="list-item" v-for="item in todos">
        {{ item }}
    </li>
</ul>
```
---
### **Little upgrade - pressing `Enter`:**
You may noticed that if you write something in the input field, and you press `Enter`, nothing actually happens, to manage that, Vue has Modifiers.
Let's do the following:
- Add a modifier to the field.
```
<input type="text"
v-bind:placeholder="placeholderString" 
v-bind:value="inputValue"
v-on:input="inputChangeHandler"
v-on:keypress="submitEnter" <- this
>
```
- Create a function that connects to that modifier.
```
submitEnter(event){
    console.log(event.key) <- shows the button you press
}
```
- Make the function behave as expected (call `addTodo()`)
```
submitEnter(event){
    if (event.key == "Enter") {
        this.addTodo()
    }
}
```
---
### **A better way to press `Enter`:**
Actually, there is a better way to create what we just created, you can delete the function, we dont need it, actually the only thing we need to do is to modify one thing:
```
v-on:keypress.enter="addTodo"
```
So we get the same result, without creating the function, and it looks like this:
```
<input type="text"
v-bind:placeholder="placeholderString" 
v-bind:value="inputValue"
v-on:input="inputChangeHandler"
v-on:keypress.enter="addTodo" <- This
>
```
---
### **Deleting todos:**
Let's do it fast, because we already know how:
1. Add a button:
```
<li class="list-item" v-for="todo in todos">
    {{ todo }}
    <button class="btn danger">delete</button>
</li>
```
2. Add event (`v-on:click`) on the button:
```
<button class="btn danger" v-on:click="deleteTodo">delete</button>
```
3. Create a function.
```
deleteTodo(){
    
}
```
Ok, what now? what do we exactly delete? which index? 
Vue gives you the option to modify the `v-for`, and add indexation to it:
```
<li class="list-item" v-for="(todo,index) in todos">
    {{index}} : {{ todo }}
    <button class="btn danger" v-on:click="deleteTodo">delete</button>
</li>
```
In the code above, if you add new todos, you will see that now it shows in index from the loop *(`index` is just a name, you can name it whatever)*  
So, now we have the index of the todo.
besides that, Vue also allows you to call functions with variables, so instead of 
```
v-on:click="deleteTodo"
```
we will use
```
v-on:click="deleteTodo(index)"
```
and ofcourse we update the function accordingly:
```
deleteTodo(index){
    console.log(index)
}
```
So now when you press the Delete button, you will see the index in the logs.  
Now we can modify the function so it will delete the item by index.

```
deleteTodo(index){
    this.todos.splice(index,1)
}
```
That's pretty much all, it will delete the Todo for you, and will remove it from the page.

---
#### **NOTE** : *Let's say we want to get the index and the event? vue allows you to do it with the following syntax: (`$event`)*

```
v-on:click="deleteTodo(index,$event)"
```
```
deleteTodo(index,event){
    console.log(index,event)
}
```
*This will be left in the code, but it's just for information porpuses right now*

----
### **Minor upgrade : `v-if` & `v-else`**
One problem with our app, is that it looks ugly, and when we don't have todo's we just get an annoying line, and an empty box, lets fix it, using `v-if` and `v-else`, which is as sounds, an if.

let's add a condition, if the list of todos is empty, we wont generate the `ul` element.
```
...
<ul class="list" v-if="todos.length !== 0">
    <li class="list-item" v-for="(todo,index) in todos">
....
```
`v-if="todos.length !== 0"` will check if the list is empty or not, if its not empty, it will render the `ul` element.  
and if the list is empty, we will use `v-else` and just show some text, so in the end, it will look like this:
```
<ul class="list" v-if="todos.length !== 0"> <- if list is not empty
    <li class="list-item" v-for="(todo,index) in todos">
        {{index}} : {{ todo }}
        <button class="btn danger" v-on:click="deleteTodo(index,$event)">delete</button>
    </li>
</ul>
<div v-else> <- else (aka list is empty)
    There are no todos yet, please add some.
</div>
```
---
#### **NOTE** : *There is also `v-else-if`, which works as you imagine, and looks like this:*
```
<div v-if="condition">
...
</div>
<div v-else-if="condition2">
...
</div>
<div v-else-if="condition3">
...
</div>
<div v-else>
...
</div>
```
---
### **Let's fix some things**
1. Currently, we can add empty items as todos, meaning if you don't write anything in the input, it will still add a new todo, so lets fix it with a simple condition.
```
addTodo(){
    if (this.inputValue !== ''){ <- check if value is empty.
        this.todos.push(this.inputValue)
        this.inputValue = ''
    }
},
```
2. We can make the code more clean, we can replace `v-bind:` with just `:`, and `v-on` with just `@`, so instead of:
```
<input type="text"
    v-bind:placeholder="placeholderString" 
    v-bind:value="inputValue"
    v-on:input="inputChangeHandler"
    v-on:keypress.enter="addTodo"
>
```
we will get (Which is also the right syntax):
```
<input type="text"
    :placeholder="placeholderString" 
    :value="inputValue"
    @input="inputChangeHandler"
    @keypress.enter="addTodo"
>
```
---
### **Computed - AKA Caching**
Let's say we want to display how much Todo's we have, and to double that number, just because we can, and if its 10, we will log something.

lets create a function that retuns the amount:
```
doubledTodos(){
    console.log('called') <- Note this
    return this.todos.length * 2
}
```
add something to represent it:
```
<div>
    Total {{ todos.length }} | Doubled {{ doubledTodos() }}
</div>
```
Ok, cool, it works, but if you open the console, you will notice that for every change in the input, you can see 'called' meaning, every time you are writting something, the function is calling, which is bad for performance, and is not optimazied at all.
that's where [Computed](https://v3.vuejs.org/guide/computed.html#computed-properties) ([Video](https://vueschool.io/lessons/computed-properties-in-vue-3?friend=vuejs)) properties come to help.

The big picture - They are chaching the date, untill its actually is changed, and return the changed data only then, meaning, we are not calling a function everytime we write something.

In order to implement this magical thing, we need to create somthing called `computed` in the app and pass the function there:
```
const App = {
    data(){...},
    methods: {...},
    computed: {
        doubledTodos(){
            console.log('called')
            return this.todos.length * 2
        }
    }
}
```
and also remove the brackets in the html from the `doubledTodos()`.
```
<div>
    Total {{ todos.length }} | Doubled {{ doubledTodos }}
</div>
```
Now, you will notice that the value is called only when the value is actually changed.

Meaning - if `todos` is not changed, the `doubledTodos` wont be called.  
it seems like a minor thing right now, but ideally it can optimize a lot of the code, remmber, computed properties must return something.

---
### **Watchers**
Another cool feature that vue probides us, is the option to watch over variables, let's create a watcher.  

This watcher will see if there are any changes in the input field, and if so it will print then, also, it will match, to a certain pattern, lets say, if a user will write "send nudes" it will clear the field, note that the watcher name should be the same as the property name.
if we watch `inputValue` then we need to name the watchers accordingly.
```
const App = {
    data(){
        return {
            title: "Todo List",
            placeholderString: "Add a new todo",
            inputValue: '',
            todos: []
        }
    },
    methods: {},
    computed: {},
    watch: {
        inputValue(value){
            if (value == "send nudes"){
                this.inputValue = ''
                console.log('Input cleared, no nudes for you.')
            }
            console.log(`Input value is: ${this.inputValue}`)
        }
    }
}
```
---
### A bit of optimization!
Let's optimize the code a bit, and make the code even more clear.
first, we created the binding, and a listener to the input:
```
<input type="text"
:placeholder="placeholderString" 
:value="inputValue"               <- This
@input="inputChangeHandler"       <- And this
@keypress.enter="addTodo"
>
```
When using vue, we don't really need to use it, we can use a better option, called `v-model` [More info](https://v3.vuejs.org/guide/forms.html).  
So we will use `v-model` and it will look like this:
```
<input type="text"
:placeholder="placeholderString" 
v-model="inputValue"
@keypress.enter="addTodo"
>
```
and you can remove the `inputChangeHandler` function from `app.js` we don't need anymore.

---
### Styling with Vue inside HTML
Vue also allows you to use javascript inside different tags, for example `styles`:
```
<h1 :style="{color: 'red'}" >{{ title }}</h1>
```
But what if we want something more interesting?
we can use conditions:
In this condition we will check if the input is above or under 25 characters, if it's under, the title will be green, else it will be red.
```
<h1 :style="{color: inputValue.length < 25 ? 'green' : 'red'}" >{{ title }}</h1>
```
The same thing is ofcourse true for `class` attributes, lets wrap the todo item and show it:
in the code below, we srapped the representation of the todo, we made it so, that if the todo is longer than 10 chars, we will make it bold.
```
<span :class="todo.length > 10 ? 'bold' : ''">{{index}} : {{ todo }}</span>
```
Another way to do it:
we set "primary" to always be true while showing the todo, and `bold` to be added only if the todo is longer then 10.
```
<span :class="{
    'primary':true,
    'bold': todo.length > 10
}">{{index}} : {{ todo }}</span>
```
And yet another way:
```
<span :class="['primary', {'bold': todo.length > 10}]">{{index}} : {{ todo }}</span>
```

All three of these ways are doing the exact same thing.

# We're done for this part!
