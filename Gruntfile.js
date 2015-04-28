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
    },

    uglify: {
     target: {
        files: {
          'public/js/app.js': ['public/js/app.js']
        }
      },
      options: {
        mangle: false
      }
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['browserify:pro', 'uglify']);
  grunt.registerTask('debug', ['browserify:dev']);

}