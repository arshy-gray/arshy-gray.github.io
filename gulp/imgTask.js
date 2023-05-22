const merge = require("merge-stream"),
  vinyl = require("vinyl-buffer"),
  imagemin = require("gulp-imagemin"),
  isProduction = require("./config/gulp.env");

/**
 * @param gulp
 * @param $
 * @param config
 */
module.exports = (gulp, $, config) => {
  function sassSprite() {
    const opts = {
      spritesmith: (options, sprite, icons) => {
        //options.imgPath = `../spr/${options.imgName}`;
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
        $.if(
          isProduction,
          imagemin({
            optimizationLevel: 7,
          })
        )
      )
      .pipe(gulp.dest("./dist/css/spr/"));

    const cssStream = spriteData.css.pipe(gulp.dest("./resources/sass/vendors/img"));

    return merge(imgStream, cssStream);
  }
  sassSprite.description =
    "자동 이미지 스프라이트 생성 및 관련 이미지 스프라이트 관련 SCSS파일을 css로 컴파일 및 소스맵 생성";

  gulp.task(sassSprite);
  gulp.task("imgSprite", gulp.series("imgclean", "sassSprite", "pfsass"));
  gulp.task("imgSpriteBuild", gulp.series("imgclean", "sassSprite"));
};