const argv = require('yargs').argv;
const del = require('del');
const eslint = require('gulp-eslint');
const exec = require('child_process').exec;
const git = require('gulp-git');
const gulp = require('gulp');
const install = require('gulp-install');
const less = require('gulp-less');
const mkdirp = require('mkdirp');
const notifier = require('node-notifier');
const rimraf = require('rimraf');
const runSequence = require('run-sequence');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

const ELECTRON_CMD = 'DEBUG=1 '+ __dirname+ '/node_modules/.bin/electron';
const PACKAGER_CMD = __dirname+ '/node_modules/.bin/electron-packager';
const WORK_DIR = __dirname+ '/release';
const WORK_REPO_DIR = __dirname+ '/release/aqdicedit';
const APP_PACKAGE_NAME = 'AqDicEdit-darwin-x64';

const ELECTRON_VERSION = '1.8.8';
const APP_VERSION = require('./package.json').version;

// default task
gulp.task('default', () => {
  /* eslint-disable-next-line no-console */
  console.log(`
usage:
    gulp --tasks-simple
    gulp tsc
    gulp lint
    gulp lint-js
    gulp lint-q
    gulp less
    gulp clean
    gulp app
    gulp package
  `);
});

// tsc
gulp.task('tsc', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('.'));
});

// lint
gulp.task('lint', () => {
  return gulp.src(['*.ts','js/*.ts'])
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format());
});
gulp.task('lint-js', ['tsc'], () => {
  return gulp.src(['*.js','js/*.js'])
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format());
});
gulp.task('lint-q', ['tsc'], () => {
  return gulp.src(['*.ts','js/*.ts','js/*.js'])
    .pipe(eslint({ useEslintrc: true, quiet: true }))
    .pipe(eslint.format());
});

// less
gulp.task('less', () => {
  return gulp.src(['css/*.less'], { base: '.' })
    .pipe(less())
    .pipe(gulp.dest('.'));
});

// clean
gulp.task('clean', ['_rm-package', '_rm-workdir']);

// run app
gulp.task('app', ['tsc'], (cb) => {
  exec(ELECTRON_CMD+ ' .', (err, stdout, stderr) => {
    cb(err);
  });
});

// package
gulp.task('package', (cb) => {
  runSequence(
    'tsc', '_package-release', '_notify',
    (err) => {
      if (err) { _notifyError(); }
      cb(err);
    }
  );
});

// workdir
gulp.task('_rm-workdir', (cb) => {
  rimraf(WORK_DIR, (err) => {
    cb(err);
  });
});
gulp.task('_mk-workdir', (cb) => {
  mkdirp(WORK_DIR, (err) => {
    cb(err);
  });
});
gulp.task('_ch-workdir', () => {
  process.chdir(WORK_DIR);
});

// git
gulp.task('_git-clone', (cb) => {
  const opts = (argv && argv.branch)? {args: '-b '+argv.branch}: {args: '-b master'};
  git.clone('git@github.com:taku-o/aqdicedit.git', opts, (err) => {
    cb(err);
  });
});
gulp.task('_git-submodule', (cb) => {
  git.updateSubmodule({ args: '--init' }, cb);
});
gulp.task('_ch-repodir', () => {
  process.chdir(WORK_REPO_DIR);
});

// npm
gulp.task('_npm-install', (cb) => {
  gulp.src(['./package.json'])
  .pipe(gulp.dest('./'))
  .pipe(install({
    npm: '--production'
  }, cb));
});

// open
gulp.task('_open-appdir', (cb) => {
  exec('open '+ APP_PACKAGE_NAME, (err, stdout, stderr) => {
    cb(err);
  });
});

// notify
gulp.task('_notify', () => {
  return notifier.notify({
    title: 'gulp-task',
    message: 'finished.',
    sound: 'Glass',
  });
});
function _notifyError() {
  return notifier.notify({
    title: 'gulp-task',
    message: 'error.',
    sound: 'Frog',
  });
}

// package
gulp.task('_rm-package', () => {
  return del(['AqDicEdit-darwin-x64']);
});

gulp.task('_package-release', (cb) => {
  exec(PACKAGER_CMD+ ` . AqDicEdit \
          --platform=darwin --arch=x64 \
          --app-version=${APP_VERSION} \
          --electron-version=${ELECTRON_VERSION} \
          --icon=icns/myukkurivoice.icns --overwrite --asar.unpackDir=vendor \
          --protocol-name=aqdicedit --protocol=aqdicedit \
          --ignore="^/AqDicEdit-darwin-x64" \
          --ignore="^/docs" \
          --ignore="^/icns" \
          --ignore="^/test" \
          --ignore="^/vendor/aqk2k_mac" \
          --ignore="/ffi/deps/" \
          --ignore="/node_modules/angular/angular-csp\\.css$" \
          --ignore="/node_modules/angular/angular\\.js$" \
          --ignore="/node_modules/angular/angular\\.min\\.js\\.gzip$" \
          --ignore="/node_modules/angular/index\\.js$" \
          --ignore="/node_modules/angular/package\\.json$" \
          --ignore="/node_modules/intro\\.js/intro\\.js$" \
          --ignore="/node_modules/intro\\.js/introjs-rtl\\.css$" \
          --ignore="/node_modules/intro\\.js/introjs\\.css$" \
          --ignore="/node_modules/intro\\.js/minified/introjs-rtl\\.min\\.css$" \
          --ignore="/node_modules/intro\\.js/themes" \
          --ignore="/node_modules/photon/CNAME$" \
          --ignore="/node_modules/photon/_config\\.yml$" \
          --ignore="/node_modules/photon/dist/template-app/" \
          --ignore="/node_modules/photon/fonts/" \
          --ignore="/docs/" \
          --ignore="/example/" \
          --ignore="/examples/" \
          --ignore="/man/" \
          --ignore="/sample/" \
          --ignore="/test/" \
          --ignore="/tests/" \
          --ignore="/.+\\.Makefile$" \
          --ignore="/.+\\.cc$" \
          --ignore="/.+\\.coffee$" \
          --ignore="/.+\\.gyp$" \
          --ignore="/.+\\.h$" \
          --ignore="/.+\\.js\\.gzip$" \
          --ignore="/.+\\.js\\.map$" \
          --ignore="/.+\\.jst$" \
          --ignore="/.+\\.less$" \
          --ignore="/.+\\.markdown$" \
          --ignore="/.+\\.md$" \
          --ignore="/.+\\.py$" \
          --ignore="/.+\\.scss$" \
          --ignore="/.+\\.swp$" \
          --ignore="/.+\\.target\\.mk$" \
          --ignore="/.+\\.tgz$" \
          --ignore="/.+\\.ts$" \
          --ignore="/AUTHORS$" \
          --ignore="/CHANGELOG$" \
          --ignore="/CHANGES$" \
          --ignore="/CONTRIBUTE$" \
          --ignore="/CONTRIBUTING$" \
          --ignore="/ChangeLog$" \
          --ignore="/Gruntfile\\.js$" \
          --ignore="/HISTORY$" \
          --ignore="/History$" \
          --ignore="/LICENCE$" \
          --ignore="/LICENSE$" \
          --ignore="/LICENSE-MIT\\.txt$" \
          --ignore="/LICENSE-jsbn$" \
          --ignore="/LICENSE\\.APACHE2$" \
          --ignore="/LICENSE\\.BSD$" \
          --ignore="/LICENSE\\.MIT$" \
          --ignore="/LICENSE\\.html$" \
          --ignore="/LICENSE\\.txt$" \
          --ignore="/License$" \
          --ignore="/MAKEFILE$" \
          --ignore="/Makefile$" \
          --ignore="/OWNERS$" \
          --ignore="/README$" \
          --ignore="/README\\.hbs$" \
          --ignore="/README\\.html$" \
          --ignore="/Readme$" \
          --ignore="/\\.DS_Store$" \
          --ignore="/\\.babelrc$" \
          --ignore="/\\.cache/$" \
          --ignore="/\\.editorconfig$" \
          --ignore="/\\.eslintignore$" \
          --ignore="/\\.eslintrc$" \
          --ignore="/\\.eslintrc\\.json$" \
          --ignore="/\\.eslintrc\\.yml$" \
          --ignore="/\\.git$" \
          --ignore="/\\.gitignore$" \
          --ignore="/\\.gitmodules$" \
          --ignore="/\\.hound.yml$" \
          --ignore="/\\.jshintrc$" \
          --ignore="/\\.keep$" \
          --ignore="/\\.npmignore$" \
          --ignore="/\\.npmignore$" \
          --ignore="/\\.prettierrc$" \
          --ignore="/\\.prettierrc\\.json$" \
          --ignore="/\\.prettierrc\\.yaml$" \
          --ignore="/\\.python-version$" \
          --ignore="/\\.stylelintrc$" \
          --ignore="/\\.stylelintrc\\.json$" \
          --ignore="/\\.travis\\.yml$" \
          --ignore="/appveyor\\.yml$" \
          --ignore="/bower\\.json$" \
          --ignore="/component\\.json$" \
          --ignore="/example\\.js$" \
          --ignore="/favicon\\.ico$" \
          --ignore="/gulpfile\\.js$" \
          --ignore="/license$" \
          --ignore="/package-lock\\.json$" \
          --ignore="/project\\.pbxproj$" \
          --ignore="/test\\.js$" \
          --ignore="/tsconfig\\.json$" \
          --ignore="/usage\\.txt$" \
          --ignore="/yarn\\.lock$"`
        , (err, stdout, stderr) => {
          cb(err);
        }
  );
});

