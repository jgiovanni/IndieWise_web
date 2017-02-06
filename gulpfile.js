var gulp = require('gulp');
// var glob = require('glob');
var elixir = require('laravel-elixir');
// require('laravel-elixir-vueify');
require('laravel-elixir-vue-2');
// var templateCache = require('gulp-angular-templatecache');

// require("laravel-elixir-ng-templates");
// require('laravel-elixir-ngtemplatecache');
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

    mix.styles([
        'custom.css',
        // '../../../node_modules/slippry/dist/slippry.css',
        '../../../node_modules/videojs-sublime-skin/dist/videojs-sublime-skin.css',
        // '../../../node_modules/videojs-airplay/dist/videojs.airplay.css',
        // '../../../node_modules/videojs-resolution-switcher/lib/videojs-resolution-switcher.css',
        // '../../../node_modules/videojs-chromecast/dist/videojs-chromecast.css',
        // '../../../node_modules/videojs-suggestedvideoendcap/videojs.suggestedVideoEndcap.css',
        // '../../../node_modules/videojs-socialshare/videojs.socialShare.css',
        '../../../node_modules/vue-material/dist/vue-material.css',

    ]);
    mix.sass('app.scss');
    // complie js
    // mix.combine('resources/assets/js/main.js');
    // mix.webpack('resources/assets/js/videojs.js');
    mix.webpack('resources/assets/js/vendor.js');
    // mix.browserify('angular.js');

    // VueJS file
    mix.webpack('main.vue.js');

    // Versioning
    mix.version(["css/app.css", "css/all.css",/* "js/main.js", "js/angular.js", "js/templates.js",*/ "js/vendor.js", "js/main.vue.js"]);

    /*mix.browserSync({
        proxy: 'indiewise.dev'
    });*/
});
