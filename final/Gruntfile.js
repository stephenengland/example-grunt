module.exports = function (grunt) {
  var allJavascriptFiles = 'www/**/*.js';
  var helloWorldScript = 'www/js/helloWorld.js';
  var scriptsCompiled = '/www/js/all.min.js';
  
  var allHtmlFiles = 'www/**/*.html';
  
  var allStyleFiles = 'www/**/*.scss';
  var mainStyleFile = 'www/sass/main.scss';
  var stylesCompiled = '/www/styles/main.css';

  var distributionFolder = 'dist';
  var devFolder = 'dev';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Scripts
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      actualCode: [allJavascriptFiles],
      all: ['Gruntfile.js', allJavascriptFiles]
    },
    uglify: {
      options: {
        mangle: false,
        sourceMap : true
      },
      together: {
        src: allJavascriptFiles,
        dest: distributionFolder + scriptsCompiled
      },
      separately: {
        files: [
          {
            expand: true,
            src: allJavascriptFiles,
            dest: distributionFolder
          }
        ]
      }
    },
    //Beautifier - Script and Html files
    jsbeautifier : {
        files : [allJavascriptFiles, allHtmlFiles, allStyleFiles],
        options : {
          js: {
              breakChainedMethods: false,
              e4x: false,
              evalCode: false,
              indentWithTabs: false,
              jslintHappy: false,
              keepArrayIndentation: false,
              keepFunctionIndentation: false,
              spaceBeforeConditional: true,
              spaceInParen: false,
              unescapeStrings: false,
              wrapLineLength: 0,
              endWithNewline: true
          },
          html: { },
          css: {
              fileTypes: [".scss"]
          }
        }
    },
    //Html
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true,
          caseSensitive: true,
          minifyJS: true,
          minifyCSS: true,
        },
        files: [
          { expand: true, src: [allHtmlFiles], dest: distributionFolder }
        ]
      }
    },
    //Styles
    sass: {
        options: {
            sourceMap: true
        },
        dev: {
            files: [{ src: [mainStyleFile], dest: devFolder + stylesCompiled }]
        },
        dist: {
            files: [{ src: [mainStyleFile], dest: distributionFolder + stylesCompiled }]
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
    clean: {
      dev: { src: [devFolder] },
      dist: { src: [distributionFolder] },
    },
    watch: {
      options: {
          livereload: true
      },
      scripts: {
        files: [allJavascriptFiles],
        tasks: ['newer:jshint', 'newer:uglify']
      },
      html: {
        files: [allHtmlFiles],
        tasks: ['newer:htmlmin:dev']
      },
      styles: {
        files: [allStyleFiles],
        tasks: ['sass:dev']
      }
    },
    //Static HTTP Server w/ livereload
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
    availabletasks: { 
      tasks: {
        options: {
          filter: 'exclude',
          tasks: ['any-newer', 'availabletasks', 'newer-postrun'] //These aren't commands you should/would call
        }
      }
    },
    githooks: { build: { 'pre-commit': 'jsbeautifier jshint' } }
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-available-tasks'); //For some reason, load-grunt-tasks doesn't like this NpmTask.

  //Set the default task - this will be what happens when you run the command  "grunt" in your directory.
  grunt.registerTask('default', ['buildDev', 'connect:dev', 'watch']);

  grunt.registerTask('buildDev', ['jshint', 'jsbeautifier', 'clean:dev', 'sass:dev', 'copy:dev']);
  grunt.registerTask('build', ['jshint', 'clean:dist', 'sass:dist', 'uglify:helloWorld', 'htmlmin:dist']);
  grunt.registerTask('spotCheck', ['build', 'connect:dist']);

  //Discover all the tasks you can run by running "grunt availabletasks"
};