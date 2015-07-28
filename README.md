# ExampleGrunt
A tutorial on using Grunt.js with examples

* [Step 1 - Grunt Basics and jshint](#Step-1)
* [Step 2 - Static Webserver with Livereload and Watch](#Step-2)
* [Step 3 - Minification, variables, and utilizing multiple targets](#Step-3)

## Getting Started
* Install Node.js
* Install Grunt's command line tool
```
npm install -g grunt-cli
```

* Clone this repository
```
git clone https://github.com/thealah/example-grunt.git
```

<a name="Step-1"></a>
## Step 1 - Grunt Basics and jshint

```
npm install grunt --save-dev
npm install grunt-contrib-jshint --save-dev
```

Notice this changed the package.json file - it added "devDependencies". When someone else downloads your package.json file and runs "npm install", it will install those dependencies automatically.

Open the Gruntfile.js and copy paste [step-1/Gruntfile.js](step-1/Gruntfile.js) into it.

Try out the jshint by running this command:

```
grunt
```

Here are other example commands to show how Grunt works.
```
grunt jshint
grunt jshint:actualCode
grunt foo
grunt bar
```

<a name="Step-2"></a>
## Step 2 - Static Webserver with Livereload and Watch

```
npm install --save-dev grunt-contrib-connect grunt-contrib-watch
```

Open the Gruntfile.js and copy paste [step-2/Gruntfile.js](step-2/Gruntfile.js) into it.

Try out the static http server with live-reload! It automatically runs jshint on javascript changes and reloads the browser on all changes.

```
grunt
```

<a name="Step-3"></a>
## Step 3 - Minification, variables, and utilizing multiple targets

```
npm install --save-dev grunt-contrib-htmlmin grunt-contrib-uglify grunt-contrib-clean
```

Open the Gruntfile.js and copy paste [step-3/Gruntfile.js](step-3/Gruntfile.js) into it.

Try out the minified javascript and html that is output to the "dist" directory.

```
grunt build

grunt spotCheck
```

Notice that there is a sourceMap file that references back to full source javascript.

To see a grunt task that minifies and combines files, run:

```
grunt uglify:allScripts
```

## Other Tips and Tricks

* Bash Shell tab auto-completion

Add the following to your ~/.bashrc file
```
eval "$(grunt --completion=bash)"
```

* Split your grunt config into multiple files

[load-grunt-configs project](https://github.com/creynders/load-grunt-configs)