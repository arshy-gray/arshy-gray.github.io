const log = require("fancy-log"),
  colors = require("ansi-colors"),
  deploy = require("gulp-gh-pages");
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

  function deployTask() {
    return gulp.src(config.deploy.src).pipe(deploy());
  }
  deployTask.description = "dist, resource, html 등 gh-pages branch 배포";

  gulp.task(deployTask);
  gulp.task("deploy", gulp.series("deployTask"));
};
