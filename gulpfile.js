var gulp = require('gulp');
// var glob = require('glob');
var elixir = require('laravel-elixir');
// var templateCache = require('gulp-angular-templatecache');

// require("laravel-elixir-ng-templates");
require('laravel-elixir-ngtemplatecache');
/*elixir.extend('ngTemplates', function(source, output, options) {
    new elixir.Task('ngTemplates', function() {
        return gulp.src(source)
            .pipe(templateCache(options))
            .pipe(gulp.dest(output));
    }).watch(source).ignore(output);
});*/

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {

    mix.ngTemplateCache('/**/**/*.html', 'public/js', 'resources/assets/templates', {
        templateCache: {
            standalone: true
        },
        htmlmin: {
            caseSensitive: true,
            // collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            removeComments: true
        }
    });
    // mix.styles([]);

    // complie js
    mix.browserify('main.js');
    mix.browserify('angular.js');

    mix.scripts([
        'app.js',
        'controllers.js',
        // Modules
        '../templates/winners/winners.js',

        'directives.js',
        'services.js',
        'utils.js'
    ]).version(["css/app.css", "js/app.js"]);;
});
