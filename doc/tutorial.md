
# Todo App Tutorial

## ECMAScript 6 or 5?

This tutorial will use primarily ES5 because it is simple enough. ZenJS was made with ES6 from the ground up and certain advanced concepts are easier to use in ES6 (using e.g. classes and generators). This does not mean that you cannot do it in ES5 and we will cover this in another tutorial.

## Starting a server

Create a directory that will hold our project, in this case let's call is ToDoApp.

    $ mkdir ToDoApp
    $ cd ToDoApp
    
Then, install ZenJS locally using `npm`.

    $ npm install zenjs

Finally, create a file named `ToDoApp.js` that contains the following:

    require('zenjs');

That's it! When you run the file, ZenJS will start a server with the default config. To start it, simply run:

    $ node ToDoApp.js

And access [`http://localhost:4000`](http://localhost:4000).
In this case it will show you a page with some basic informations from your app. That page will always be accessible in development mode (and in production using special flags) by using [`http://localhost:4000/@status`](http://localhost:4000/@status).

## Hello World

Now we will add a configuration for our server. By default, ZenJS uses AngularJS as the frontend framework, and include all of it by default in your page.

By default, the serving is done by checking for a `app.html` file in your project directory. Add a new file named `app.html` that contains the following:

    <zen-app>Hello World</zen-app>

Voilà. If your server is already running it will update automatically and show the App.

## ToDo

The Simple package exists to make really simple apps; it will include AngularJS scripts and source maps (in debug), and will include the `body.html` file as well as packing all your client JavaScript files automatically, by default. It includes its own Angular providers to fill in the void on the client side, such as auto updating components and packages, and getting the data from databases when needed.

Now that we can add HTML, we'll try to add some forms to get the task interface going.

    <body>
      <h1>Task Manager</h1>
      <todo zen-data="tasks: model('tasks')">
        <div ng-for="task: tasks">
          <input type="checkbox" ng-check="task.done">
          <label>{{task.description}}</label>
        </div>
      </todo>
    </body>

The only problem now is we lack _data_. For this we need to create a model. ZenJS allows us to create models rather complex, but in our case we simply need to use a helper called JsonModel that creates models that can be exported as JSON. These are useful for REST APIs or (as in our case), simple models.

In your `ToDoApp.js` file, add the following code:

    var zenjs = require('zenjs');
    var model = new zenjs.models.JsonModel({
        // _options contains meta information related to the model.
        _options: {
            // There is a way to not specify the name, but creating a model
            // this way we need to specify one (otherwise it will throw).
            // This name needs to be globally unique.
            name: 'tasks',
        },
    
        // Everything is a field declaration.
        done: Boolean,
        description: String,
    });

    model.on('createTable').do(() => {
        var first = model.create();
        first.done = false;
        first.description = "First Task";
        first.$save();
    });

Now if you refresh the page you'll see... an empty page. 