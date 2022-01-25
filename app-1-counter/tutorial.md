# App 1 - Counter

### **Via CDN**
*This tutorial starts when we have created already `index.html`  and `theme.css` and `app.js`(empty)*

**index.html**:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="theme.css">
</head>
<body>
    
</body>
</html>
```

- open the docs on https://v3.vuejs.org/guide/installation.html

- import `<script src="https://unpkg.com/vue@next"></script>` into the index page (just over `</body>`), this will import Vue into the project.

- add `<script src="app.js"></script>` also at the button, to connect to an external JS script (also possible to write inside the index intself, but not a good practice.)

- start the app (Live Server plugin for VSCode is great for this)

- Open the page, and you should see Blue screen which means everything is good.
----
### **Create a simple counter:**
- Create a simple counter in `index.html`.

```
<div class="container pt=5">
    <div class="card center">
        <h1>Counter : 0</h1>
        <div>
            <button class="btn primary">+</button>
            <button class="btn danger">-</button>
        </div>
    </div>
</div>
```
You should see a white card, with two buttons and a counter text.

- Open `app.js` and add the following to the top, this will initialize the application.
```
const App = {

}

Vue.createApp(App)
```
- Now we make vue to be able to return data to the page:
```
const App = {
    data(){
        return {
            counter: 0
        }
    }
}
```
- and we change the HTML, and make it read the field (aka using interpulation).
```
<h1>Counter : {{ counter }}</h1>
```

- if you refresh the page, you will see that we do not show the counter yet, that is because we need to initialize the root element for the application.
in our case, we will use the first div (We added the `id="app"` to mark the root element.)

```
...
<div class="container pt=5" id="app">
...
```
- Now we go to out `app.js`, and tell Vue what is the root element, and mount to it.
```
const app = Vue.createApp(App)
app.mount('#app')
```
- After you refresh now, you will see 0 again, due the fact that now it shows the data from vue on the screen (you can change the value to test it)

You can also change the text before the title to practice it.

**index.html**
```
...
<h1>{{ title }} : {{ counter }}</h1>
...
```
**app.js**

```
...
return {
    counter: 0,
    title: "Counter: "
}
...
```

Now, lets make the buttons work, vue provides a few ways to interact with HTML.  
one simple way to interact is to use vue directly on the page:
```
    <button class="btn primary" v-on:click="counter++">+</button>
```
vue has built-in event listeners for example `v-on:click` which listens to an event on the button, if the button is `click`ed, then `"counter++"` wil happen, meaning we interact with the counter, this way.  

by the same logic we make the same thing, with the negative button, and in the end we have something like this:
```
<div>
    <button class="btn primary" v-on:click="counter++">+</button>
    <button class="btn danger" v-on:click="counter--">-</button>
</div>
```
- `Vue has MUCH MUCH more cool things like this`

The counter should be done now, and functional.
