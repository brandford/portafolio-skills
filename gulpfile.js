// gulpfile.js (ESM) - Modo desarrollo puro

import { src, dest, watch, series } from 'gulp';

// CSS y Sass
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
const sass = gulpSass(dartSass);

import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

// Imágenes
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import avif from 'gulp-avif';

export function css() {
  return src('src/scss/app.scss', { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
      style: 'expanded',
      quietDeps: true,
    }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css', { sourcemaps: true }));
}

export function js() {
    return src( 'src/js/app.js' )
      .pipe( dest('build/js') );
}

export function images() {
  return src('src/img/**/*', { encoding: false })
    //.pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest('build/img'));
}

export function imagesWebp() {
  return src('src/img/**/*.{png,jpg,jpeg}', { encoding: false })
    .pipe(webp({ quality: 80 }))
    .pipe(dest('build/img'));
}

export function imagesAvif() {
  return src('src/img/**/*.{png,jpg,jpeg}', { encoding: false })
    .pipe(avif({ quality: 80 }))
    .pipe(dest('build/img'));
}

export function dev() {
  watch('src/scss/**/*.scss', css);
  watch('src/img/**/*', series(images));
  // watch('src/img/**/*', series(images, imagesWebp, imagesAvif));
  watch('src/js/app.js', js);
}

// Tarea por defecto = desarrollo con watcher
// Ejecuta primero las imágenes y css, luego entra en modo watch
// export default series(css, images, imagesWebp, imagesAvif, dev);
export default series(css, images, dev);