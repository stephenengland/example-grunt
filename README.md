# ExampleGrunt
A tutorial on using Grunt.js with examples

* [Step 1](#Step-1)
* [Step 2](#Step-2)

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
## Step 1

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
## Step 2

```
npm install --save-dev grunt-contrib-connect grunt-contrib-watch
```

Open the Gruntfile.js and copy paste [step-2/Gruntfile.js](step-2/Gruntfile.js) into it.

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

[load-grunt-configs project](https://github.com/creynders/load-grunt-configs)