const gulp = require('gulp');
const browserify = require('browserify');
const envify = require('envify/custom');
const babelify = require('babelify');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');
const fs = require('fs');
const {distJS} = require('./common');


const babelrc = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'));
const babelifyPresets = babelify.configure(babelrc);

const buildAppTask = (dest) => () => {
    const b = browserify('source/js/index.js', {
        transform: [babelifyPresets],
        bundleExternal: false
    }).transform(envify({
        NODE_ENV: process.env.NODE_ENV || 'development',
        DEBUG: false
    }), {
        global: true
    });

    let stream = b.bundle()
        .pipe(source('script.js'))
        .pipe(rename({
            suffix: '.bundle'
        }));

    if (process.env.NODE_ENV === 'production') {
        stream = stream.pipe(streamify(uglify()));
    }

    stream.pipe(gulp.dest(dest))
        .on('error', (e) => console.error(e));

    return stream;
};


// Browserify build task
gulp.task('javascript', buildAppTask(distJS));
