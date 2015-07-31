module.exports = function (grunt) {
  var allJavascriptFiles = 'www/**/*.js';
  var allHtmlFiles = 'www/**/*.html';
  var allStyleFiles = 'www/**/*.scss';
  var mainStyleFile = 'www/sass/main.scss';
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
    uglify: {
      options: {
        mangle: false,
        sourceMap : true
      },
      allScripts: {
        options: {
          sourceMapName : distributionFolder + '/www/js/all.min.js.map'
        },
        src: allJavascriptFiles,
        dest: distributionFolder + '/www/js/all.min.js'
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

    //Step 4
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
    githooks: {
      build: {
        'pre-commit': 'jshint jsbeautifier'
      }
    },
    //Beautifier - Script and Html files
    jsbeautifier : {
        files : [allJavascriptFiles, allHtmlFiles, allStyleFiles],
        options : {
          config: ".jsbeautifyrc",
          css: {
              fileTypes: [".scss"]
          }
        }
    },
    sass: {
        options: {
            sourceMap: true
        },
        dev: {
            files: [{ src: [mainStyleFile], dest: devFolder + '/www/styles/main.css' }]
        },
        dist: {
            files: [{ src: [mainStyleFile], dest: distributionFolder + '/www/styles/main.css' }]
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

  //https://github.com/gruntjs/grunt-contrib-copy
  grunt.loadNpmTasks('grunt-contrib-copy');

  //https://github.com/gruntjs/grunt-contrib-clean
  grunt.loadNpmTasks('grunt-contrib-clean');

  //https://github.com/wecodemore/grunt-githooks
  grunt.loadNpmTasks('grunt-githooks');

  grunt.loadNpmTasks('grunt-jsbeautifier');

  grunt.loadNpmTasks('grunt-sass');

  //Set the default task - this will be what happens when you run the command  "grunt" in your directory.
  grunt.registerTask('default', ['buildDev', 'connect:dev', 'watch']);
  //Additional tasks

  grunt.registerTask('buildDev', ['jshint', 'jsbeautifier', 'clean:dev', 'sass:dev', 'copy:dev']);
  grunt.registerTask('build', ['jshint', 'clean:dist', 'sass:dist', 'uglify:helloWorld', 'htmlmin:dist']);
  grunt.registerTask('spotCheck', ['build', 'connect:dist']);
};