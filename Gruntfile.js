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
    },

    watch: {
      client: {
        files: ['app/client/**/*.js'],
        tasks: ['debug']
      }
    },

    nodemon: {
      dev: {
        script: ['app/server'],
        options: {
          watch: ['app/server']
        }
      }
    },

    eslint: {
      src: ["app"]
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-eslint');

  grunt.registerTask('build', ['browserify:pro', 'uglify']);
  grunt.registerTask('debug', ['browserify:dev']);
  grunt.registerTask('server', ['nodemon']);

}