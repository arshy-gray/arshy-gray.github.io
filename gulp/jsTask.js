/**
 * @param gulp
 * @param $
 * @param config
 */
module.exports = (gulp, $, config) => {
  function jsTask() {
    return gulp.src(config.js.src).pipe(
      $.plumber({
        errorHandler: (err) => {
          console.log("js Task 수행중 에러가 발생했습니다.");
        },
      })
    );
  }

  gulp.task(jsTask);
};
