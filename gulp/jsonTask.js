/**
 * @param gulp
 * @param $
 * @param config
 */
module.exports = (gulp, $, config) => {
  function jsonTask() {
    return gulp
      .src(config.json.src, { since: gulp.lastRun("jsonTask") })
      .pipe($.replace("/dist/", ""))
      .on("error", (err) => {
        console.log(err);
      })
      .pipe(gulp.dest(config.json.dest));
  }
  jsonTask.description = "데이터 파일을 dist로 복사합니다";

  gulp.task(jsonTask);
};
