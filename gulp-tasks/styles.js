const gulp = require('gulp');
const sass = require('gulp-sass');
const inlineImage = require('gulp-base64-image');
const autoprefixer = require('gulp-autoprefixer');
const {browserSync, distCSS} = require('./common');

// Sass task
gulp.task('sass', () => gulp
    .src('source/styles/**/*.scss')
    .pipe(sass({
        outputStyle: 'compressed',  // expanded
        functions: inlineImage({
            url: 'source/images/'
        })
    })
    .on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: [
            'Chrome >= 8',
            'Firefox >= 3.5',
            'ie >= 8',
            'Safari >= 4',
            'Opera >= 12',
            'Android 2.3',
            'Android >= 4',
            'iOS >= 6'
        ],
        cascade: false
    }))
    .pipe(gulp.dest(distCSS))
    .pipe(browserSync.stream()));
