module.exports = function(grunt) {
  'use strict';
  var project = {
            dirs: {
                input     : 'src',
                output    : 'dist',
                temp      : 'temp'
            },

            files: {
                scripts     : '/assets',
                vendor      : '/vendor',
                any         : '/**/*',
                thisDir     : '/*',
                dot         : {
                    javascript  : '.js',
                    html        : '.html'
                }
            }
        },
  // Project configuration
  gruntConfig = {
  	project: project,

    pkg: grunt.file.readJSON('package.json'),

    copy: {
	  main: {
	    expand: true,
	    cwd: 'src/',
	    src: '**/*',
	    dest: 'dist/'
	  },
	},
	// Useref will got through all html files in output
    useref: {
        html: project.dirs.output + project.files.any + project.files.dot.html,
        temp: project.dirs.output

    },
   //  concat: {
	  //   js: {
	  //     src: [
	  //     	'src/vendor/jquery/dist/jquery.js', 
	  //     	'src/vendor/bootstrap/dist/js/bootstrap.js',
	  //     	'src/assets/js/main.js'
	  //     	],
	  //     dest: 'dist/assets/js/built.js'
	  //   },
	  //   css:{
	  //     src: [
	  //     	'src/vendor/normalize-css/normalize.css', 
	  //     	'src/vendor/bootstrap/dist/css/bootstrap.css',
	  //     	'src/vendor/font-awesome/css/font-awesome.css',
	  //     	'src/assets/css/main.css'
	  //     	],
	  //     dest: 'dist/assets/css/built.css'
	  //   }
  	// },
  	// uglify: {
  	// 	js: {
  	// 		src: 'dist/assets/js/built.js',
  	// 		dest: 'dist/assets/js/built.min.js'
  	// 	}
  	// },
  	// cssmin: {
  	// 	css: {
	  // 		src: 'dist/assets/css/built.css',
	  // 		dest: 'dist/assets/css/built.min.css'
  	// 	}
  	// },
  	jshint: {
	  files: ['Gruntfile.js', 'src/assets/js/*.js'],
	  // configure JSHint (documented at http://www.jshint.com/docs/)
	  options: {
	    // more options here if you want to override JSHint defaults
	    globals: {
	      jQuery: true,
	      console: true,
	      module: true
	    }
	  }  
  	},
  	imagemin: {
	   dynamic: {                         
	      files: [{
	        expand: true,                  
	        cwd: 'src/',                    
	        src: ['**/*.{png,jpg,gif}'],    
	        dest: 'dist/'                  
	      }]
       }
	},
	browserSync: {
	    bsFiles: {
	        src : [
	        	   'src/*.html', 
	        	   'src/assets/css/*.css', 
	        	   'src/assets/js/*.js'
	        	  ]
	    },
	    options: {
	        server: {
	            baseDir: "src/"
	        }
	    }
	},
  	watch: {
	  js: {
	    files: ['/**/*.js', 'dist/**/*.js'],
	    tasks: ['copy', 'concat', 'uglify'],
	    options: {
	      spawn: false,
	    },
	  },
	  css: {
	    files: ['/**/*.css', 'dist/**/*.css'],
	    tasks: ['copy', 'concat', 'cssmin'],
	    options: {
	      spawn: false,
	    },
	  },
	  html: {
	    files: ['/**/*.html', 'dist/**/*.html'],
	    tasks: ['copy', 'concat'],
	    options: {
	      spawn: false,
	    },
	  },
	  jshint:{
	  	files: ['Gruntfile.js', 'src/assets/**/*.js'],
  		tasks: ['jshint']
	  }
	}
  };
  grunt.initConfig(gruntConfig);

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-useref');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('build', ['jshint', 'copy', 'useref', 'concat', 'uglify', 'cssmin', 'imagemin', 'browserSync', 'watch']);

};