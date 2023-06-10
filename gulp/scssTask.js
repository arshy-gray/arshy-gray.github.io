const log = require("fancy-log"),
  colors = require("ansi-colors"),
  isProduction = require("./config/gulp.env"),
  sass = require("gulp-sass")(require("sass")),
  dependents = require("gulp-dependents"),
  changed = require("gulp-changed");
/**
 * @param gulp
 * @param $
 * @param config
 */
module.exports = (gulp, $, config) => {
  function onError(err) {
    console.log(colors.red("[ERROR]"), err.message, colors.red("line:"), err.line, colors.red("column:"), err.column);
    this.emit("end");
  }

  function scssTask() {
    return gulp
      .src(config.scss.src, { since: gulp.lastRun("scssTask") })
      .pipe(dependents())
      .pipe($.if(!isProduction, $.sourcemaps.init()))
      .pipe(
        $.plumber({
          errorHandler: isProduction ? false : true,
        })
      )
      .pipe(sass(config.scssOpt).on("error", onError))
      .pipe($.autoprefixer(config.browsers))
      .pipe($.if(!isProduction, $.sourcemaps.write("./")))
      .pipe(gulp.dest(config.scss.dest));
  }
  scssTask.description = "SCSS compile 후 css로 컴파일 및 소스맵 생성해서 dist로 복사합니다";

  gulp.task(scssTask);
};
