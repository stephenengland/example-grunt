# ExampleGrunt
A tutorial on using Grunt.js with examples

* [Step 1 - Grunt Basics and jshint](#Step-1)
* [Step 2 - Static Webserver with Livereload and Watch](#Step-2)
* [Step 3 - Minification, variables, and utilizing multiple targets](#Step-3)
* [Step 4 - Git Hooks and more Front-End tasks](#Step-4)

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
npm install --save-dev grunt-contrib-htmlmin grunt-contrib-uglify grunt-contrib-clean grunt-contrib-copy
```

Open the Gruntfile.js and copy paste [step-3/Gruntfile.js](step-3/Gruntfile.js) into it.


Try out the minification and build:
```
grunt buildDev

grunt build

grunt spotCheck
```

The minified javascript and html are output to the "dist" directory. You can use the non-minified versions still in the "dev" directory.

Notice that there is a sourceMap file that references back to full source javascript.

To see a grunt task that minifies and combines all javascript files, run:

```
grunt uglify:allScripts
```

<a name="Step-4"></a>
## Step 4 - Git Hooks and more Front-End tasks

```
npm install --save-dev grunt-githooks grunt-jsbeautifier grunt-sass
```

Open the Gruntfile.js and copy paste [step-4/Gruntfile.js](step-4/Gruntfile.js) into it.

Use githooks by running the following command, then attempt a commit.

```
grunt githooks:build
```

Prettify your HTML/JS/Sass by using grunt-jsbeautifier
```
grunt jsbeautifier
```

Build the css from Sass using grunt-sass
```
grunt sass
```

## Other Tips and Tricks

* Bash Shell tab auto-completion

Add the following to your ~/.bashrc file
```
eval "$(grunt --completion=bash)"
```

* [Enable live-reload on more complex web applications (IIS, Apache, etc)](https://github.com/gruntjs/grunt-contrib-watch#enabling-live-reload-in-your-html)
* [Split your grunt config into multiple files](https://github.com/creynders/load-grunt-configs)
* [Minify images](https://github.com/gruntjs/grunt-contrib-imagemin)
* [Asset revisioning by using file content hashing](https://github.com/yeoman/grunt-filerev)
* [Converting a set of images into a spritesheet](https://github.com/Ensighten/grunt-spritesmith)
* [Replaces references to non-optimized scripts or stylesheets](https://github.com/yeoman/grunt-usemin)