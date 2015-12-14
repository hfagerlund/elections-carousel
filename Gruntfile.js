module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
                jshint: {
                    scripts: {
                        src: ['Gruntfile.js', 'elections-carousel/js/elections/**.js']
                    },

                    tests: { 
                        src: 'test/**/**.js'
                    }
                },
                uglify: { 
		    my_scripts: {
                      files: {
                        'elections-carousel/build/election.all.min.js': ['elections-carousel/js/elections/elections.js']
                      }
                    }
                },
                qunit: {
                    all: ['test/**/*.html']
                },
                clean: {
                    css: {
                        src: ['elections-carousel/stylesheets']
                    },
                    js: {
                        src: ['elections-carousel/build/']
                    }
                },
		compass: {
			dist: {
				options: {
					sassDir: 'elections-carousel/sass',
					cssDir: 'elections-carousel/stylesheets'
				}
			}
		},
                cssmin: {
                    build: {
                        files: {
                            'elections-carousel/stylesheets/application.css': [ 'elections-carousel/stylesheets/**/*.css', '!*.min.css' ]
                        }
                    },
                    production: {
                        expand: true,
                        cwd: 'elections-carousel/stylesheets',
                        src: ['*.css', '!*.min.css'],
                        dest: 'elections-carousel/stylesheets',
                        ext: '.min.css'
                    }
                },
		watch: {
                        scripts: {
                            files: 'elections-carousel/js/elections/**.js',
                            task: 'elections-carousel/jshint:scripts'
                        },
			css: {
				files: '**/*.scss',
				tasks: ['compass']
			}
		}
	});
        require('load-grunt-tasks')(grunt);
	grunt.registerTask('default',['watch']);
        grunt.registerTask('js',['jshint']);
        grunt.registerTask('cleancss',['clean:css']);
        grunt.registerTask('cleanjs',['clean:js']);
        grunt.registerTask('test',['qunit']);
        grunt.registerTask('cssminify',['cssmin']);
        grunt.registerTask('jsmin',['clean:js','uglify']);
        grunt.registerTask('styles',['clean:css','watch','cssmin']);
        grunt.registerTask('dev',['clean','watch','cssmin','jshint','uglify']);
        grunt.registerTask('prod',['cssmin:production','uglify']); 
};
