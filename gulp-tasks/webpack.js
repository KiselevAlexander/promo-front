const gulp = require('gulp');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const browserSyncWebpack = require('browser-sync').create();
const webpackConfig = require('../webpack.config');

const compiler = webpack(webpackConfig);

gulp.task('browser-sync-webpack', () => {
    browserSyncWebpack.init({
        ui: false,
        open: false,
        server: {
            baseDir: 'public',
            middleware: [
                historyApiFallback(),
                webpackDevMiddleware(compiler, {
                    publicPath: webpackConfig.output.publicPath,
                    stats: {colors: true}
                }),
                webpackHotMiddleware(compiler, {
                    heartbeat: 2500
                })
            ]
        },
        files: [
            'public/static/css/**/*.css',
            'public/*.html'
        ]
    });
});

gulp.task('webpack', ['sass', 'browser-sync-webpack'], () => {
    gulp.watch('source/styles/**/*.scss', ['sass']);
});
