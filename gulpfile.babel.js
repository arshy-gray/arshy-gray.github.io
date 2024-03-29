const gulp = require("gulp"),
  $ = require("gulp-load-plugins")({
    pattern: ["gulp-*", "gulp.*"],
    scope: ["devDependencies"],
  }),
  gulpConfig = require("./gulp/config/gulp.config");

require("./gulp/cleanTask.js")(gulp, $, gulpConfig);
require("./gulp/jsonTask.js")(gulp, $, gulpConfig);
require("./gulp/htmlTask.js")(gulp, $, gulpConfig);
require("./gulp/jsTask.js")(gulp, $, gulpConfig);
require("./gulp/scssTask.js")(gulp, $, gulpConfig);
require("./gulp/imgTask.js")(gulp, $, gulpConfig);
require("./gulp/serverTask.js")(gulp, $, gulpConfig);
require("./gulp/purifyTask.js")(gulp, $, gulpConfig);
require("./gulp/buildTask.js")(gulp, $, gulpConfig);
require("./gulp/deployTask.js")(gulp, $, gulpConfig);

gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("jsonTask", "htmlTask", "jsLibTask", "jsPrdTask", "imgDftTask", gulp.series("scssSprite", "scssTask"))
  )
);
