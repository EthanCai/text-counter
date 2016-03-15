module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            banner: '/*\n' +
                ' *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
                ' *  <%= pkg.description %>\n' +
                ' *  <%= pkg.url %>\n' +
                ' *\n' +
                ' *  Made by <%= pkg.author %>\n' +
                ' *  Under <%= pkg.license %> License\n' +
                ' */\n'
        },

        concat: {
            scripts: {
                src: ['src/text-counter.js'],
                dest: 'dist/text-counter.js'
            },
            styles: {
                src: ['src/text-counter.css'],
                dest: 'dist/text-counter.css'
            },
            options: {
                banner: '<%= meta.banner %>'
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'tests/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        qunit: {
            all: ['tests/unit-tests.html']
        },

        cssmin: {
            styles: {
                src: ['dist/text-counter.css'],
                dest: 'dist/text-counter.min.css'
            },
            options: {
                banner: '<%= meta.banner %>'
            }
        },

        uglify: {
            scripts: {
                src: ['dist/text-counter.js'],
                dest: 'dist/text-counter.min.js'
            },
            options: {
                banner: '<%= meta.banner %>'
            }
        },

        watch: {
            build: {
                files: ['src/**/*.js', 'src/**/*.css'],
                tasks: ['concat']
            },
            lint: {
                files: ['**/*.js'],
                tasks: ['jshint']
            },
            test: {
                files: ['src/**/*.js', 'tests/**/*'],
                tasks: ['concat', 'qunit']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['jshint', 'concat']);
    grunt.registerTask('test', ['jshint', 'concat', 'qunit']);
    grunt.registerTask('min', ['uglify', 'cssmin']);

    grunt.registerTask('default', ['test', 'min']);
};
