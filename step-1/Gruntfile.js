module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Step 1
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      }
      actualCode: ['www/**/*.js'],
      all: ['Gruntfile.js', 'www/**/*.js']
    },


  });


  grunt.registerTask('bar', 'The bar task.', function() {
    grunt.log.write('The bar task is running now.').ok();
  });


  //Load grunt "plugins" from npm
  //https://github.com/gruntjs/grunt-contrib-jshint
  grunt.loadNpmTasks('grunt-contrib-jshint');


  //Set the default task - this will be what happens when you run the command  "grunt" in your directory.
  grunt.registerTask('default', ['jshint:all']);
  //This will occur when you run the command "grunt foo" in your directory.
  grunt.registerTask('foo', ['jshint:actualCode', 'bar']);

};