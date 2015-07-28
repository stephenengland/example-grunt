module.exports = function (grunt) {
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

    //Step 2
    connect: {
      server: {
        options: {
          port: 8080,
          base: 'www',
          livereload: true,
          open: true
        }
      }
    },
    watch: {
      options: {
          livereload: true
      },
      scripts: {
        files: ['www/**/*.js'],
        tasks: ['jshint', 'scriptsChanged']
      },
      html: {
        files: ['www/**.html']
      }
    },
  });

  grunt.registerTask('scriptsChanged', 'This shows that javascript changed.', function() {
    grunt.log.write('The javascript changed, guys!!!\r\n').ok();
  });


  //Load grunt "plugins" from npm
  //https://github.com/gruntjs/grunt-contrib-jshint
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  //https://github.com/gruntjs/grunt-contrib-connect
  grunt.loadNpmTasks('grunt-contrib-connect');
  //https://github.com/gruntjs/grunt-contrib-watch
  grunt.loadNpmTasks('grunt-contrib-watch');


  //Set the default task - this will be what happens when you run the command  "grunt" in your directory.
  grunt.registerTask('default', ['jshint:all', 'connect', 'watch']);
};