'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/**\n' +
      ' * <%= pkg.description %>\n' +
      ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @author <%= pkg.author.name %> - <%= pkg.author.email %>\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
      ' */\n'
    },
    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: 'nofunc',
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        node: true,
        devel: true,
        globals: {
          angular: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      test: {
        src: ['test/**/*.js']
      },
      src: {
        src: ['<%= dirs.src %>/*.js']
      }
    },
    dirs: {
      src: 'src',
      dest: 'dist'
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['<%= dirs.src %>/*.js', '<%= dirs.src %>/**/*.js'],
        dest: '<%= dirs.dest %>/<%= pkg.name %>.js'
      }
    },
    autoprefixer: {
      source: {
        //options: {
          //browsers: ['last 2 version']
        //},
        src: '<%= dirs.dest %>/<%= pkg.name %>.css',
        dest: '<%= dirs.dest %>/<%= pkg.name %>.css'

      }
    },
    sass: {
      dist: {
        files: {
          '<%= dirs.dest %>/<%= pkg.name %>.css': '<%= dirs.src %>/<%= pkg.name %>.scss'
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          '<%= dirs.dest %>/<%= pkg.name %>.min.css': ['<%= dirs.dest %>/<%= pkg.name %>.css']
        }
      }
    },
    ngAnnotate: {
      dist: {
        files: {
          '<%= concat.dist.dest %>': ['<%= concat.dist.dest %>']
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: '<%= dirs.dest %>/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      dev: {
        files: ['<%= dirs.src %>/*'],
        tasks: ['build', 'jshint:src'],
        options: {
          livereload: true,
        },
      },
      html: {
        files: 'index.html',
        tasks: ['build', 'jshint:src'],
        options: {
          livereload: true,
        },
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  // Build Task
  grunt.registerTask('build', ['jshint', 'concat', 'ngAnnotate', 'uglify', 'sass', 'autoprefixer', 'cssmin']);

  // Default task.
  grunt.registerTask('default', ['build', 'watch']);

};
