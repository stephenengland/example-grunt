module.exports = function (grunt) {
  var allJavascriptFiles = 'www/**/*.js';
  var allHtmlFiles = 'www/**/*.html';
  var distributionFolder = 'dist';
  var devFolder = 'dev';
  var helloWorldScript = 'www/js/helloWorld.js';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Step 1
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      actualCode: [allJavascriptFiles],
      all: ['Gruntfile.js', allJavascriptFiles]
    },

    //Step 3
    connect: {
      dev: {
        options: {
          port: 8080,
          livereload: true,
          base: devFolder + '/www',
          open: {
            target: 'http://localhost:8080/'
          }
        }
      },
      dist: {
        options: {
          port: 8080,
          livereload: false,
          keepalive: true,
          base: distributionFolder + '/www',
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
        files: [allJavascriptFiles],
        tasks: ['jshint', 'uglify:helloWorld']
      },
      html: {
        files: [allHtmlFiles],
        tasks: ['htmlmin:dev']
      }
    },
    uglify: {
      options: {
        mangle: false,
        sourceMap : true
      },
      allScripts: {
        options: {
          sourceMapName : distributionFolder + '/all.min.js.map'
        },
        src: allJavascriptFiles,
        dest: distributionFolder + '/all.min.js'
      },
      helloWorld: {
        options: {
          sourceMapName: distributionFolder + "/" + helloWorldScript + '.map'
        },
        src: 'www/js/helloWorld.js',
        dest: distributionFolder + "/" + helloWorldScript
      }
    },
    copy: {
      dev: {
        files: [
          { expand: true, src: [allHtmlFiles], dest: devFolder + '/' },
          { expand: true, src: [allJavascriptFiles], dest: devFolder + '/' }
        ]
      },
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [
          { expand: true, src: [allHtmlFiles], dest: distributionFolder }
        ]
      }
    },
    clean: {
      dev: {
        src: [devFolder]
      },
      dist: {
        src: [distributionFolder]
      },
    },
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

  //https://github.com/gruntjs/grunt-contrib-copy
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-clean');

  //Set the default task - this will be what happens when you run the command  "grunt" in your directory.
  grunt.registerTask('default', ['buildDev', 'connect:dev', 'watch']);
  //Additional tasks

  grunt.registerTask('buildDev', ['jshint', 'clean:dev', 'copy:dev']);
  grunt.registerTask('build', ['jshint', 'clean:dist', 'uglify:helloWorld', 'htmlmin:dist']);
  grunt.registerTask('spotCheck', ['build', 'connect:dist']);
};