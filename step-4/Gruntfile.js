module.exports = function (grunt) {
  var timestamp = new Date().getTime();

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Step 1
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      actualCode: ['www/**/*.js'],
      all: ['Gruntfile.js', 'www/**/*.js']
    },

    //Step 3
    uglify: {
      options: {
        mangle: false
      },
      allScripts: {
        options: {
          sourceMap : true,
          sourceMapName : 'dist/all' + timestamp + '.min.js.map'
        },
        src: 'www/**/*.js',
        dest: 'dist/all.min.js'
      },
      helloWorld: {
        options: {
          sourceMap: true,
          sourceMapName: 'dist/helloWorld' + timestamp + '.js.map'
        },
        src: 'www/js/helloWorld.js',
        dest: 'dist/js/helloWorld.js'
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'www/index.html'
        }
      },
      dev: {
        files: {
          'dist/index.html': 'www/index.html'
        }
      }
    },
    clean: {
      build: {
        src: ["dist/*.js.map"]
      }
    },

    //Step 4
    connect: {
      dist: {
        options: {
          port: 8080,
          livereload: true,
          base: 'dist',
          open: {
            target: 'http://localhost:8080/'
          }
        }
      }
    },
    watch: {
      options: {
          livereload: true
      },
      scripts: {
        files: ['www/**/*.js'],
        tasks: ['jshint', 'uglify:helloWorld']
      },
      html: {
        files: ['www/*.html'],
        tasks: ['htmlmin:dev']
      },
      styles: {
        files: ['www/sass/*.scss'],
        tasks: ['sass']
      }
    },

    githooks: {
      build: {
        'pre-commit': 'jshint prettify'
      }
    },
    prettify: {
      html: {
        //This is a special globbing syntax for expanding files in Grunt. - http://gruntjs.com/api/grunt.file#globbing-patterns
        expand: true,
        cwd: 'www/',
        ext: '.html',
        src: ['*.html'],
        dest: 'www/'
      }
    },
    sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'dist/styles/main.css': 'www/sass/**/*.scss'
            }
        }
    }
  });

  //Load grunt "plugins" from npm
  //https://github.com/gruntjs/grunt-contrib-jshint
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  //https://github.com/gruntjs/grunt-contrib-connect
  grunt.loadNpmTasks('grunt-contrib-connect');
  //https://github.com/gruntjs/grunt-contrib-watch
  grunt.loadNpmTasks('grunt-contrib-watch');

  //https://github.com/gruntjs/grunt-contrib-uglify
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //https://github.com/gruntjs/grunt-contrib-htmlmin
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  //https://github.com/gruntjs/grunt-contrib-clean
  grunt.loadNpmTasks('grunt-contrib-clean');

  //https://github.com/wecodemore/grunt-githooks
  grunt.loadNpmTasks('grunt-githooks');

  //https://github.com/jonschlinkert/grunt-prettify
  grunt.loadNpmTasks('grunt-prettify');

  grunt.loadNpmTasks('grunt-sass');

  //Set the default task - this will be what happens when you run the command  "grunt" in your directory.
  grunt.registerTask('default', ['jshint:all', 'prettify', 'sass', 'clean', 'uglify:helloWorld', 'htmlmin:dev', 'connect', 'watch']);
  //Additional tasks
  grunt.registerTask('build', ['jshint', 'sass', 'clean', 'uglify:helloWorld', 'htmlmin:dist']);
};