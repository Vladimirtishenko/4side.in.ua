var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    concatCss = require('gulp-concat-css'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    react = require('gulp-react');


gulp.task('js', function () {
    return gulp.src('./public/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/build/'));
});

gulp.task('jsx', function () {
    return gulp.src('./public/js/manage/jsx/*.jsx')
        .pipe(react())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./public/js/manage/js/'));
});

gulp.task('styl', function() {
    return gulp.src('./public/styl/*.styl')
        .pipe(stylus({
            linenos: false
        }))
        .pipe(autoprefixer([
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6'
        ]))
        .pipe(concatCss('styl.css'))
        .pipe(gulp.dest('./public/css/'));

});

gulp.task('css', function () {
    return gulp.src('./public/css/*.css')
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./public/build/'));
});

gulp.task('css-manage', function () {
    return gulp.src('./public/css/Manage/*.css')
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./public/css/Manage/build/'));
});


gulp.task('image', function () {
    return gulp.src('public/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('public/images/'));
});


gulp.task('watch', function() {
    gulp.watch("./public/styl/*.styl", ['styl']);
    gulp.watch("./public/css/*.css", ['css']);
    gulp.watch("./public/css/Manage/*.css", ['css-manage']);
    gulp.watch("./public/js/*.js", ['js']);
    gulp.watch("./public/js/manage/jsx/*.jsx", ['jsx']);
});