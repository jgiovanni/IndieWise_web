let mix = require('laravel-mix');

mix.options({
    processCssUrls: false
});

mix.sass('resources/assets/sass/app.scss', 'public/css');

mix.js('resources/assets/js/main.vue.js', 'public/js')
    .js('resources/assets/js/projects.vue.js', 'public/js')
    .js('resources/assets/js/users.vue.js', 'public/js')
    .js('resources/assets/js/resources.vue.js', 'public/js')
    .js('resources/assets/js/vendor.js', 'public/js')
    //.extract(['vue', 'jquery', 'scrollmagic', 'moment', 'aos', 'axios', 'video.js', 'tether-shepherd']);

mix.version();

mix.browserSync({
    proxy: 'indiewise.test',
    port: 3009
});