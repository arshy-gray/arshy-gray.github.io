/**
 * @param gulp
 * @param $
 * @param config
 */
module.exports = (gulp, $, config) => {
  function deployTask() {
    return gulp
      .src(config.deploy.src, { since: gulp.lastRun("deployTask") })
      .on("error", (err) => {
        console.log(err);
      })
      .pipe(gulp.dest(config.deploy.dest));
  }
  deployTask.description = "파비콘 관련 파일 (manifest.json, browserconfig.xml) dist로 복사합니다.";

  gulp.task(deployTask);
  gulp.task("deploy", gulp.series("deployTask"));
};
