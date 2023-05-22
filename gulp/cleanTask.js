const del = require("del");
/**
 * @param gulp
 * @param $
 * @param config
 */
module.exports = (gulp, $, config) => {
  function clean() {
    return del("dist/*/css");
  }
  clean.description = "css 폴더를 삭제합니다.";

  function imgclean() {
    return del(config.imgSprite.clean);
  }
  imgclean.description = "img sprite 이미지파일과 관련SCSS 파일을 제거합니다.";

  gulp.task(imgclean);
  gulp.task(clean);
};
