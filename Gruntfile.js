module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      expanded: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'public/css/app.css': 'public/src/scss/app.scss'
        }
      },
      compressed: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'public/css/app.min.css': '/public/src/scss/app.scss'
        }
      }
    },
    concat: {
      dist: {
        src: [
          'public/src/js/app.js',
          'public/src/js/**/*.js'
        ],
        dest: 'public/js/app.js'
      }
    },
    uglify: {
      'public/js/app.min.js': 'public/js/app.js'
    },
    watch: {
      configFiles: {
        files: ['Gruntfile.js', 'package.json'],
        options: {
          reload: true
        }
      },
      scss: {
        files: ['public/src/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['public/src/js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          livereload: true
        }
      },
      index: {
        files: ['index.html'],
        options: {
          livereload: true
        }
      }
    },
    replace: {
      production: {
        options: {
          patterns: [{
            match: /app\.js/,
            replacement: 'app.min.js'
          }, {
            match: /app\.css/,
            replacement: 'app.min.css'
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['index.html']
        }]
      },
      development: {
        options: {
          patterns: [{
            match: /app\.min\.js/,
            replacement: 'app.js'
          }, {
            match: /app\.min\.css/,
            replacement: 'app.css'
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['index.html']
        }]
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['sass:expanded', 'concat', 'watch']);
  grunt.registerTask('deploy', ['sass:compressed', 'concat', 'uglify']);
};
