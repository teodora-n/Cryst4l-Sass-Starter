var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    bulkSass = require('gulp-sass-bulk-import'),
    sourcemaps = require('gulp-sourcemaps'),
    stylesDir = 'source/scss/';

gulp.task('css', function() {
    return gulp.src(stylesDir+'styles.scss')
        .pipe(sourcemaps.init())
        .pipe(bulkSass())
        .pipe(sass({
            includePaths: [stylesDir]
        }).on('error', sass.logError))
        .pipe(autoprefixer({
                browsers: ['last 4 versions'],
                cascade: false
            }))
            //.pipe(cssnano())
            .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('default', ['css'], function() {
    gulp.watch('source/scss/**/*.scss', ['css']);
});