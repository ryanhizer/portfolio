module.exports = function(grunt) {

	// Configure tasks(s)
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
		    server: {
				options: {
					port: 9001,
					base: 'www-root'
				}
		    }
		},
		uglify: {
			dist: {
				src: 'src/js/**/*.js',
				dest: 'js/script.min.js'
			},
			dev: {
				options: {
					beautify: true,
					compress: false,
					mangle: false,
					preserveComments: 'all'
				},
				src: 'src/js/**/*.js',
				dest: 'js/script.min.js'
			}
		},
		sass: {
			dist: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'css/styles.css' : 'src/scss/application.scss'
				}
			},
			dev: {
				options: {
					outputStyle: 'expanded',
					beautify:true
				},
				files: {
					'css/styles.css' : 'src/scss/application.scss'
				}
			}
		},
		watch: {
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['uglify:dev'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['src/scss/**/*.scss'],
				tasks: ['sass:dev'],
				options: {
					livereload: 9001
				}
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');

	// Register task(s)
	grunt.registerTask('default', ['uglify:dev','sass:dev']);
	grunt.registerTask('build', ['uglify:dist','sass:dist']);
	grunt.registerTask('serve', ['connect:server']);

}