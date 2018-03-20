
var gulp = require('gulp'),
	less = require('gulp-less'),
	cssmin = require('gulp-cssmin'),
	autoprefixer = require('gulp-autoprefixer'),
	rev = require('gulp-rev'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	revCollector = require('gulp-rev-collector');
//css
gulp.task('css',function(){
	return gulp.src('./public/less/main.less')
		.pipe(less())
		.pipe(cssmin())
		.pipe(autoprefixer())
		.pipe(rev())
		.pipe(gulp.dest('./release/public/css'))
		.pipe(rev.manifest())
		.pipe(rename('css-manifest.json'))
		.pipe(gulp.dest('./release/rev'))
});
//image
gulp.task('image',function(){
	return gulp.src(['./public/images/**/*','./uploads/*'],{base: './'})
		.pipe(imagemin())
		.pipe(rev())
		.pipe(gulp.dest('./release'))
		.pipe(rev.manifest())
		.pipe(rename('image-manifest.json'))
		.pipe(gulp.dest('./release/rev'));
});
//useref
gulp.task('useref',function(){
	return gulp.src('./index.html')
		.pipe(useref())
		.pipe(gulpif('*.js',uglify()))
		.pipe(gulpif('*.js',rev()))
		.pipe(gulp.dest('./release'))
		.pipe(rev.manifest())
		.pipe(rename('useref-mainfest.json'))
		.pipe(gulp.dest('./release/rev'))
});
//other
gulp.task('other',function(){
	return gulp.src(['./api/*','./views/*','./public/fonts/*','./public/libs/*'],{base: './'})
		.pipe(gulp.dest('./release'));
});
//替换
gulp.task('rev',['css','image','useref'],function(){
	gulp.src(['./release/rev/*.json','./release/index.html'])
		.pipe(revCollector())
		.pipe(gulp.dest('./release'));
});

gulp.task('default',['rev','other']);