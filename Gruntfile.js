'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    develop: {
      server: {
        file: 'bin/www'
      }
    },

    clean: {
        dev:[ 'client/**/*','client/**/**/*' ],
        prod:[ 'client/**/*'],
        temp: ['clientSrc/tmp/**/*']
    },

    // Copies directories and files from one location to another.
    copy: {
        dev: {
            files: [
                { 'client/index.html' : 'clientSrc/html/app.dev.html' },
                { cwd : 'clientSrc/json/',  src : '**/*', dest : 'client/json/',     flatten : false, expand : true },
                { cwd : 'clientSrc/img/',   src : '**/*', dest : 'client/content/img/',     flatten : false, expand : true },
                { cwd : 'clientSrc/fonts/', src : '**/*', dest : 'client/fonts/',   flatten : false, expand : true },
                { cwd : 'clientSrc/fonts/', src : '**/*', dest : 'client/content/fonts/',   flatten : false, expand : true },
                { cwd : 'clientSrc/tpl/',   src : '**/*', dest : 'client/content/tpl/',     flatten : false, expand : true }
            ]
        },
        prod: {
            files: [
                { 'client/index.html': 'clientSrc/html/app.prod.html' },
                { cwd: 'clientSrc/json/',  src : '**/*', dest : 'client/json/',     flatten : false, expand : true },
                { cwd: 'clientSrc/img/', src: '*', dest: 'client/content/img/', flatten: false, expand: true },
                { cwd: 'clientSrc/fonts/', src: '**/*', dest: 'client/fonts/', flatten: false, expand: true },
                { cwd: 'clientSrc/tpl/', src: '**/*', dest: 'clientSrc/tmp/tpl/', flatten: false, expand: true },
                { cwd: 'clientSrc/less/', src: '**/*', dest: 'clientSrc/tmp/less/', flatten: false, expand: true },
                { cwd: 'clientSrc/js/', src: '**/*', dest: 'clientSrc/tmp/js/', flatten: false, expand: true }
            ]
        }
    },

    // Compile LESS (.less) files to CSS (.css).
    less: {
        options : { 'dumpLineNumbers' : grunt.option('lessDumpLineNumbers') || false },
        devComp: {
            files   : { 'client/content/css/comp.css' : 'clientSrc/less/comp.less' }
        },
        devBase: {
            files   : { 'client/content/css/base.css' : 'clientSrc/less/base.less' }
        },
        devApp: {
            files   : { 'client/content/css/app.css' : 'clientSrc/less/app.less' }
        },
        prod: {
            files: { 'clientSrc/tmp/css/app.css' : ['clientSrc/tmp/less/comp.less', 'clientSrc/tmp/less/base.less', 'clientSrc/tmp/less/app.less'] }
        }
    },

    // CSS minification
    cssmin: {
        prod: {
            options: { keepSpecialComments: 0 },
            expand: true,
            cwd: 'clientSrc/tmp/css/',
            src: ['app.css'],
            dest: 'client/Content/',
            ext: '.min.css'
        }
    },

    // HTML Minification
    htmlmin: {
        prod: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            files: [{
                cwd: 'clientSrc/tmp/tpl/', src: '**/*.html', dest: 'client/content/tpl/', flatten: false, expand: true, dot: false
            }]
        }
    },
    // Concatinationg JS files
    concat: {
        // RE-USE
        libsList: [
            'clientSrc/js/lib/jquery/jquery.js',
            'clientSrc/js/lib/lodash/lodash.js',
            'clientSrc/js/lib/moment/moment.js',
            'clientSrc/js/lib/angular/angular.js',
            'clientSrc/js/lib/angular/angular-animate.js',
            'clientSrc/js/lib/angular/angular-route.js',
            'clientSrc/js/lib/angular/angular-storage.js',
            'clientSrc/js/lib/angular/angular-cookies.js',
            'clientSrc/js/lib/bootstrap/bootstrap.js',
            'clientSrc/js/lib/ui-bootstrap/ui-bootstrap-tpls-2.5.0.min.js'
        ],
        prodLibsList: [
            'clientSrc/js/lib/jquery/jquery.min.js',
            'clientSrc/js/lib/lodash/lodash.min.js',
            'clientSrc/js/lib/moment/moment.min.js',
            'clientSrc/js/lib/angular/angular.min.js',
            'clientSrc/js/lib/angular/angular-animate.min.js',
            'clientSrc/js/lib/angular/angular-route.min.js',
  	        'clientSrc/js/lib/angular/angular-storage.min.js',
            'clientSrc/js/lib/angular/angular-cookies.min.js',
            'clientSrc/js/lib/bootstrap/bootstrap.min.js',
            'clientSrc/js/lib/ui-bootstrap/ui-bootstrap-tpls-2.5.0.min.js'

        ],
        ieLibsList: [
            'clientSrc/js/lib/ie/*.js',
        ],
        // DEVELOPMENT
        devA: {
            options : { separator : ';' },
            files   : { 'client/scripts/app.js' : ['clientSrc/js/app/*.js'] }
        },
        devC: {
            options : { separator : ';' },
            files   : { 'client/scripts/controllers.js' : ['clientSrc/js/controllers/*.js'] }
        },
        devD: {
            options : { separator : ';' },
            files   : { 'client/scripts/directives.js' : ['clientSrc/js/directives/*.js'] }
        },
        devF: {
            options : { separator : ';' },
            files   : { 'client/scripts/filters.js' : ['clientSrc/js/filters/*.js'] }
        },
        devS: {
            options : { separator: ';' },
            files   : { 'client/scripts/services.js' : ['clientSrc/js/services/*.js'] }
        },
        devLibs: {
            options : { separator: ';' },
            files   : { 'client/scripts/libraries.js' : '<%= concat.libsList %>' }
        },
        prod: {
            files: [
                { 'client/scripts/libraries.min.js': '<%= concat.prodLibsList %>' },
                { 'clientSrc/tmp/js/tapp.js': ['clientSrc/tmp/js/app/*.js'] },
                { 'clientSrc/tmp/js/controllers.js': ['clientSrc/tmp/js/controllers/*.js'] },
                { 'clientSrc/tmp/js/directives.js': ['clientSrc/tmp/js/directives/*.js'] },
                { 'clientSrc/tmp/js/filters.js': ['clientSrc/tmp/js/filters/*.js'] },
                { 'clientSrc/tmp/js/services.js': ['clientSrc/tmp/js/services/*.js'] },
                { 'clientSrc/tmp/js/app.js': ['clientSrc/tmp/js/tapp.js', 'clientSrc/tmp/js/controllers.js', 'clientSrc/tmp/js/directives.js', 'clientSrc/tmp/js/filters.js', 'clientSrc/tmp/js/services.js'] }
            ]
        }
    },

    closurecompiler: {

        prod: {
            files: {
                // Destination: Sources...
                "client/scripts/app.min.js": ['clientSrc/tmp/js/app.js']
            },
            options: {
                // Any options supported by Closure Compiler, for example:
                "compilation_level": "SIMPLE_OPTIMIZATIONS",

                // Plus a simultaneous processes limit
                "max_processes": 5
            }
        }
    },
    watch: {
        css: {
            files: ['clientSrc/less/*.less',
                    'clientSrc/less/app/*.less',
                    'clientSrc/less/app/suits/*.less',
                    'clientSrc/less/base/*.less',
                    'clientSrc/less/comp/*.less'],
            tasks : ['less:devComp',
                     'less:devBase',
                     'less:devApp']
        },

        // Images, copy
        files: {
            files: ['clientSrc/html/*.html',
                    'clientSrc/tpl/*.html',
                    'clientSrc/tpl/*/*.html',
                    'clientSrc/json/*.json'],
            tasks : ['copy:dev']
        },

        js: {
            files: ['clientSrc/js/app/*.js',
                    'clientSrc/js/controllers/*.js',
                    'clientSrc/js/directives/*.js',
                    'clientSrc/js/filters/*.js',
                    'clientSrc/js/services/*.js',
                    'clientSrc/js/lib/*.js'
                    ],
            tasks : ['concat:devA',
                    'concat:devC',
                    'concat:devD',
                    'concat:devF',
                    'concat:devS',
                    'concat:devLibs']

      }
    }
  });

// PLUGINS:
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-requirejs');
grunt.loadNpmTasks('grunt-closurecompiler');
grunt.loadNpmTasks('grunt-angular-templates');


    grunt.registerTask('dev', 'Running "DEVELOPMENT", watching files and compiling...', [
        'clean:dev',
        'copy:dev',
        'less:devComp',
        'less:devBase',
        'less:devApp',
        'concat:devA',
        'concat:devC',
        'concat:devD',
        'concat:devF',
        'concat:devS',
        'concat:devLibs',
        'clean:temp',
        //'express:dev',
        //'develop',
        'watch'

    ]);

    /* PROD: Compile and export for production deployment
    run: grunt prod */
    grunt.registerTask('prod', 'Running "PRODUCTION", will export for production...', [

        'clean:prod',
        'clean:temp',
        'copy:prod',
        'less:prod',
        'cssmin:prod',
        'htmlmin:prod',
        'concat:prod',
        'closurecompiler:prod',
        'clean:temp',
        //'express:prod',
        //'develop',
        //'watch'
    ]);
  grunt.registerTask('default', 'Running "DEFAULT", compiling everything.', [
    //'develop',
    //'watch'
  ]);
};
