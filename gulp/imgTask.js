const merge = require("merge-stream"),
  vinyl = require("vinyl-buffer"),
  imagemin = require("gulp-imagemin");

/**
 * @param gulp
 * @param $
 * @param config
 */
module.exports = (gulp, $, config) => {
  // 일반 이미지
  function imgDftTask() {
    return gulp
      .src(config.imgDft.src, { since: gulp.lastRun("imgDftTask") })
      .on("error", (err) => {
        console.log(err);
      })
      .pipe(gulp.dest(config.imgDft.dest));
  }
  imgDftTask.description = "일반 이미지 파일을 dist로 복사";

  // 이미지 스프라이트
  function imgsSprite() {
    const opts = {
      spritesmith: (options, sprite, icons) => {
        options.imgName = `${sprite}.png`;
        options.cssName = `_${sprite}.scss`;
        options.cssTemplate = `./gulp/helper/sprite.scss.handlebars`;
        options.padding = 5;
        options.cssVarMap = (sp) => {
          sp.name = `${sp.name}`;
        };
        return options;
      },
    };
    const spriteData = gulp
      .src(config.imgSprite.src)
      .pipe($.spritesmithMulti(opts))
      .on("error", (err) => {
        console.log(err);
      });
    const imgStream = spriteData.img
      .pipe(vinyl())
      .pipe(
        imagemin({
          optimizationLevel: 7,
        })
      )
      .pipe(gulp.dest(config.imgSprite.dest));

    const cssStream = spriteData.css.pipe(gulp.dest("./src/resources/sass/vendors/img"));

    return merge(imgStream, cssStream);
  }
  imgsSprite.description =
    "자동 이미지 스프라이트 생성 및 관련 이미지 스프라이트 관련 SCSS파일을 css로 컴파일 및 소스맵 생성";

  gulp.task(imgDftTask);
  gulp.task(imgsSprite);
  gulp.task("scssSprite", gulp.series("imgSprClean", "imgsSprite"));
  gulp.task("scssSpriteBuild", gulp.series("imgSprClean", "imgsSprite", "scssTask"));
};
