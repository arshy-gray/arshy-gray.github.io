/**
 * @param gulp
 * @param $
 * @param config
 */
module.exports = (gulp, $, config) => {
  function dbTask() {
    return gulp
      .src(config.db.src, { since: gulp.lastRun("dbTask") })
      .pipe($.replace("/dist/", ""))
      .on("error", (err) => {
        console.log(err);
      })
      .pipe(gulp.dest(config.db.dest));
  }
  dbTask.description = "데이터 파일을 dist로 복사합니다";

  gulp.task(dbTask);
};
