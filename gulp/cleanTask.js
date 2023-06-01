const del = require("del");
/**
 * @param gulp
 * @param $
 * @param config
 */
module.exports = (gulp, $, config) => {
  function cssClean() {
    return del(config.scss.dest);
  }
  cssClean.description = "css 폴더를 삭제합니다.";

  function imgDftClean() {
    return del(config.imgDft.dest);
  }
  cssClean.description = "일반 img 폴더를 삭제합니다.";

  function imgSprClean() {
    return del(config.imgSprite.clean);
  }
  imgSprClean.description = "sprite img 폴더와 관련 SCSS 파일을 제거합니다.";

  gulp.task(cssClean);
  gulp.task(imgDftClean);
  gulp.task(imgSprClean);
};
