/**
 * @param gulp
 * @param $
 * @param config
 */
module.exports = (gulp, $, config) => {
  function pfpurify() {
    return gulp
      .src("./dist/css/**/*.css")
      .pipe($.purifyCss(["./**/*.js", "./**/*.html"], config.purifyOpt))
      .pipe(gulp.dest("./dist"));
  }
  pfpurify.description = "purify를 이용하여 html/js를 css와 대조후 불필요하거나 안쓰이는 css를 삭제합니다.";

  gulp.task(pfpurify);
};
