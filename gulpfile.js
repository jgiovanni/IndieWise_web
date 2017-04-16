var gulp = require('gulp');
// var glob = require('glob');
var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');
require('laravel-elixir-vue-2');

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

    // VueJS file
    // mix.webpack('vendor.js');
    // mix.webpack('resources.vue.js');
    mix.webpack('main.vue.js');
    mix.webpack('projects.vue.js');
    mix.webpack('users.vue.js');

    // Versioning
    mix.version(["css/app.css", "css/all.css", "js/main.vue.js", "js/projects.vue.js", "js/users.vue.js"]);

    /*mix.browserSync({
        proxy: 'indiewise.dev'
    });*/
});
