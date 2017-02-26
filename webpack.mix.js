const { mix } = require('laravel-mix');


mix.js('src/js/app.js', 'public/build')
   .sass('src/sass/app.scss', 'public/build')
   .browserSync({
        proxy: 'uoptrack.dev',
        files: 'src/**/*'
   });

