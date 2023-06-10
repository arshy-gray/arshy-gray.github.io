/**
 * @param gulp
 * @param $
 * @param config
 */
module.exports = (gulp, $, config) => {
  gulp.task("build", gulp.series("clean", "scssSprite", "scssTask"));
};
