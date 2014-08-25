module.exports = function(grunt) { 'use strict';

  var
  config = grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      html: {
        files: ['**/*.css', '**/*.html'],
        tasks: [],
        options: {
          spawn: false,
          livereload: 9000
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};