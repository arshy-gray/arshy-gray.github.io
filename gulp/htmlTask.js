const htmlmin = require("gulp-htmlmin");

/**
 * @param gulp
 * @param $
 * @param config
 */
module.exports = (gulp, $, config) => {
  function htmlTask() {
    return gulp
      .src(config.html.src, { since: gulp.lastRun("htmlTask") })
      .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
      .pipe($.replace("/dist/", "/"))
      .on("error", (err) => {
        console.log(err);
      })
      .pipe(gulp.dest(config.html.dest));
  }
  htmlTask.description = "html 내 경로를 운영 환경에 맞춰 변경 후 dist로 복사합니다";

  gulp.task(htmlTask);
};
