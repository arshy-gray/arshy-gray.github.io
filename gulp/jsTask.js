const concat = require("gulp-concat"),
  uglify = require("gulp-uglify");

/**
 * @param gulp
 * @param $
 * @param config
 */
module.exports = (gulp, $, config) => {
  function jsLibTask() {
    return gulp
      .src(config.jsLib.src, { since: gulp.lastRun("jsLibTask") })
      .on("error", (err) => {
        console.log(err);
      })
      .pipe(gulp.dest(config.jsLib.dest));
  }
  jsLibTask.description = "js 라이브러리 파일을 dist로 복사합니다";

  function jsPrdTask() {
    return gulp
      .src(config.jsPrd.src, { since: gulp.lastRun("jsPrdTask") })
      .on("error", (err) => {
        console.log(err);
      })
      .pipe(uglify())
      .pipe(concat("arshy.js"))
      .pipe(gulp.dest(config.jsPrd.dest));
  }
  jsPrdTask.description = "js 자체 제작 파일을 압축 후 한 개의 파일로 합쳐 dist로 복사합니다";

  gulp.task(jsLibTask);
  gulp.task(jsPrdTask);
  gulp.task("jsTask", gulp.parallel("jsLibTask", "jsPrdTask"));
};
