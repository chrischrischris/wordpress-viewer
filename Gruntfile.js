module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'js/**/*.js',
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/canjs/can.jquery.js',
                    'bower_components/canjs/can.route.pushstate.js',
                    'bower_components/canjs/can.map.backup'
                ],
                dest: 'dist.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'production.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jasmine: {
            test: {
                src: ['src/**/*.js', 'components/**/*.js'],
                options: {
                    specs: ['src/**/*Spec.js', 'components/**/*Spec.js'],
                    helpers: ['src/**/*Helper.js', 'components/**/*Helper.js'],
                    host: 'http://127.0.0.1:8000/',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                            baseUrl: 'src/',
                            paths: {
                                "jquery" : "bower_components/jquery/dist/jquery",
                                "can": "bower_components/CanJS/amd-dev/can"
                            },
                            deps: ['jquery', 'can'],
                            callback: function($) {
                                // do initialization stuff
                            }
                        }
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-serve');
    grunt.registerTask('default', ['concat', 'uglify']);
};
