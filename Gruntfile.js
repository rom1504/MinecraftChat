module.exports = function(grunt) {

  grunt.initConfig({

    browserify: {
      dev: {
        files: {
          'public/js/app.js': ['app/client/**/*.js'],
        },
        options: {
          browserifyOptions: {
            debug: true
          }
        }
      },
      pro: {
        files: {
          'public/js/app.js': ['app/client/**/*.js'],
        },
        options: {
          browserifyOptions: {
            debug: false
          }
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('build', ['browserify:pro']);
  grunt.registerTask('debug', ['browserify:dev']);

}