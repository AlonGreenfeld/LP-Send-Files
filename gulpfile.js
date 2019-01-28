var gulp   = require('gulp'),
    //uglify = require('gulp-uglify'),
    //rename = require('gulp-rename'),
    stripDebug = require('gulp-strip-debug'),
    concat = require('gulp-concat'),
    //imagemin = require('gulp-imagemin'),
    minify = require('gulp-minify'),
    cleanCss = require('gulp-clean-css');
    //rev = require('gulp-rev');
// Named tasks

// Error log
function errorLog( error ) {
	console.log(error.toString());
	this.emit('end');
}

// gulp.task('scripts', function(){
// 	gulp.src(['./js/*.js'])
// 		.pipe(uglify())
// 		.pipe(rename({
// 		  suffix: '.min'
// 		}))
//         .on('error', errorLog)
// 	   .pipe(gulp.dest('./dist/js'));
// });

gulp.task('pack-js', function () {    
    return gulp.src(['./js/*.js'])
        .pipe(concat('scripts.min.js'))
        .pipe(stripDebug())
        .pipe(minify({
            ext:{
                min:'.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('./js'));
        //.pipe(gulp.dest('public/build'));
});


gulp.task('pack-css', function () {    
    return gulp.src(['./css/*.css'])
        .pipe(concat('style.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('./css'));
});

// gulp.task('img', function(){
// 	gulp.src(['./images/*'])
// 	      .pipe(imagemin())
// 	      .pipe(gulp.dest('./dist/img'));
// });

gulp.task('watch', function() {
    gulp.watch('./js/*.js',  gulp.series('pack-js'));
    gulp.watch('./css/*.css',  gulp.series('pack-css'));
});

//gulp.task('default', gulp.parallel('watch'));

gulp.task('default', gulp.parallel('pack-css', 'pack-js'));