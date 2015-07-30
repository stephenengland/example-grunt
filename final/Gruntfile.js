module.exports = function (grunt) {
  var allJavascriptFiles = 'www/**/*.js';
  var allHtmlFiles = 'www/**/*.html';
  var allStyleFiles = 'www/**/*.scss';
  var distributionFolder = 'dist';
  var devFolder = 'dev';
  var helloWorldScript = 'www/js/helloWorld.js';

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
        dest: distributionFolder + '/all.min.js'
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
            files: [{ src: [allStyleFiles], dest: devFolder + '/www/styles/main.css' }]
        },
        dist: {
            files: [{ src: [allStyleFiles], dest: distributionFolder + '/www/styles/main.css' }]
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
        tasks: ['jshint', 'uglify:helloWorld']
      },
      html: {
        files: [allHtmlFiles],
        tasks: ['htmlmin:dev']
      },
      styles: {
        files: [allStyleFiles],
        tasks: ['sass:dev']
      }
    },
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
    githooks: { build: { 'pre-commit': 'jsbeautifier jshint' } }
  });

  require('load-grunt-tasks')(grunt);

  //Set the default task - this will be what happens when you run the command  "grunt" in your directory.
  grunt.registerTask('default', ['buildDev', 'connect:dev', 'watch']);
  //Additional tasks

  grunt.registerTask('buildDev', ['jshint', 'jsbeautifier', 'clean:dev', 'sass:dev', 'copy:dev']);
  grunt.registerTask('build', ['jshint', 'clean:dist', 'sass:dist', 'uglify:helloWorld', 'htmlmin:dist']);
  grunt.registerTask('spotCheck', ['build', 'connect:dist']);
};