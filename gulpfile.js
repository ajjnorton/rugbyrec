var gulp=require('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect');
	uglify = require('gulp-uglify');


var jsFiles = ['app/*.js','app/controllers/*.js'];
var htmlFiles =['app/*.html', 'app/views/*.html'];
// relaods the browser 
gulp.task('js', function(){
	gutil.log('Something changed !')
	gulp.src(jsFiles)
	.pipe(connect.reload())
});

gulp.task('moveit', function(){
	gulp.src(jsFiles)
	.pipe(concat('test.js'))
	.pipe(uglify())
	.pipe(gulp.dest('bin/'))

});

// watches for changes
gulp.task('watch',function(){
	gulp.watch(jsFiles,['js'])
	gulp.watch(htmlFiles,['html'])
});
// relaods the browser 
gulp.task('html', function(){
	gulp.src(htmlFiles)
	.pipe(connect.reload())
});

gulp.task('connect',function(){
	connect.server({
		root:'',
		livereload:true
	});
});

gulp.task('default',['html', 'connect', 'watch']);