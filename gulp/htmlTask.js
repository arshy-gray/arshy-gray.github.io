/**
 * @param gulp
 * @param $
 * @param config
 */
module.exports = (gulp, $, config) => {
  function pfhtml() {
    return gulp.src(config.pfHtml.src).pipe(
      $.plumber({
        errorHandler: (err) => {
          console.log("html Task 수행중 에러가 발생했습니다.");
        },
      })
    );
  }

  gulp.task(pfhtml);
};
