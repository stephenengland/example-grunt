# ExampleGrunt
A tutorial on using Grunt.js with examples

## Getting Started
* Install Node.js
```
git clone https://github.com/thealah/example-grunt.git
npm install -g grunt-cli
```

## Step 1

```
npm install grunt --save-dev
npm install grunt-contrib-jshint --save-dev
```

Notice this changed the package.json file - it added "devDependencies". When someone else downloads your package.json file and runs "npm install", it will install those dependencies automatically.

Open the Gruntfile.js and copy paste step-1/Gruntfile.js into it.

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

## Step 2

```
npm install --save-dev grunt-contrib-connect grunt-contrib-watch
```

Open the Gruntfile.js and copy paste step-2/Gruntfile.js into it.

Try out the static http server with live-reload! It automatically runs jshint on javascript changes and reloads the browser on all changes.

```
grunt
```

## Other Tips and Tricks

* Bash Shell tab auto-completion

Add the following to your ~/.bashrc file
```
eval "$(grunt --completion=bash)"
```

* Split your grunt config into multiple files

[https://github.com/creynders/load-grunt-configs]