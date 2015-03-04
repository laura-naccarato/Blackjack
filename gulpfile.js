//load in the gul plugin to this file, so we can use it to make our builds	

var gulp = require("gulp");
var sass = require("gulp-sass");
var jade = require("gulp-jade");
//we are going to create our first gulp task
//this will compile our sass into our CSS
gulp.task('styles', function () {
    gulp.src('styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

gulp.task("templates", function(){
	gulp.src("templates/*.jade")
		.pipe(jade({pretty : true}))
		.pipe(gulp.dest("./html"))
});

gulp.task("watch", function(){
	// when the scss files change, run the styles command
	gulp.watch("styles/*.scss",["styles"]);
	//when the jade files change, run the templates command
	gulp.watch("templates/*.jade", ["templates"]);
});