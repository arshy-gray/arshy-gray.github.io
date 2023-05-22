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
      pfScss: gulp.watch(config.pfScss.src, gulp.series(gulp.task("pfsass"), reload)),
      pfHtml: gulp.watch(config.pfHtml.src, gulp.series(gulp.task("pfhtml"), reload)),
      imgSprite: gulp.watch(config.imgSprite.src, gulp.series(gulp.task("imgSprite"), reload)),
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
  watch.description = "html/SCSS/SVG 파일의 변경점을 감시합니다.";

  gulp.task(watch);
  gulp.task(clearCache);
  gulp.task("server", gulp.series(clearCache, gulp.parallel(serverInit, watch)));
};
