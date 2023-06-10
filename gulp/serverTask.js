const log = require("fancy-log"),
  colors = require("ansi-colors"),
  browserSync = require("browser-sync").create(),
  browserSyncReuseTab = require("browser-sync-reuse-tab")(browserSync),
  cache = require("gulp-cache");

/**
 * @param gulp
 * @param $
 * @param config
 */
module.exports = (gulp, $, config) => {
  function serverInit() {
    return browserSync.init(
      {
        open: false,
        server: {
          baseDir: "./",
          port: "3000",
          index: "./index.html",
        },
        reloadOnRestart: true,
        injectChanges: true,
      },
      browserSyncReuseTab
    );
  }

  function clearCache(done) {
    return cache.clearAll(done);
  }

  function reload(done) {
    browserSync.reload();
    done();
  }

  function watch() {
    let watcher = {
      scssTask: gulp.watch(config.scss.src, gulp.series(gulp.task("scssTask"), reload)),
      htmlTask: gulp.watch(config.html.src, gulp.series(gulp.task("htmlTask"), reload)),
      jsPrdTask: gulp.watch(config.jsPrd.src, gulp.series(gulp.task("jsPrdTask"), reload)),
      jsLibTask: gulp.watch(config.jsLib.src, gulp.series(gulp.task("jsLibTask"), reload)),
      dbTask: gulp.watch(config.db.src, gulp.series(gulp.task("dbTask"), reload)),
      imgDftTask: gulp.watch(config.imgDft.src, gulp.series(gulp.task("imgDftTask"), reload)),
      scssSprite: gulp.watch(config.imgSprite.src, gulp.series(gulp.task("scssSprite"), reload)),
    };

    for (let key in watcher) {
      watcher[key].on("add", (path) => log("File", colors.yellow(path), "has been", colors.green("added")));
      watcher[key].on("change", (path) => log("File", colors.yellow(path), "has been", colors.green("changed")));
      watcher[key].on("unlink", (path) => log("File", colors.yellow(path), "has been", colors.green("removed")));
      watcher[key].on("addDir", (path) => log("File", colors.yellow(path), "has been", colors.green("added")));
      watcher[key].on("unlinkDir", (path) =>
        log("Directory", colors.yellow(path), "has been", colors.green("removed"))
      );
    }
  }
  watch.description = "html/js/SCSS/img 파일의 변경점을 감시합니다.";

  gulp.task(watch);
  gulp.task(clearCache);
  gulp.task("server", gulp.series(clearCache, gulp.parallel(serverInit, watch)));
};
