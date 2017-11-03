const gulp = require('gulp');
const browserify = require('browserify');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');
const {distJS} = require('./common');

const libs = [
    'core-js/shim',
    'url-search-params-polyfill',
    'classnames',
    'url',
    'react',
    'react-dom',
    'moment',
    'moment/locale/ru',
    'reselect',
    'react-router',
    'redux',
    'redux-thunk',
    'react-redux',
    'url',
    'whatwg-fetch',
    'prop-types',
    'jquery',
    'react-input-mask',
    'react-dropzone',
    'react-html5video',
    'react-circular-progressbar',
    'rc-slider',
    'react-avatar-editor',
    'react-share',
    'promise-file-reader',
    'react-swipeable',
    'word-wrapper'
];

const vendorTask = (dest) => () => {
    const vendor = 'vendor.js';
    const b = browserify();

    libs.forEach((lib) => {
        b.require(lib, {
            expose: lib
        });
    });

    let stream = b.bundle()
        .pipe(source(vendor))
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

gulp.task('vendor', vendorTask(distJS));
