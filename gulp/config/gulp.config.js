const isProduction = require("./gulp.env");
const config = {
  pfHtml: {
    src: "**/*.html",
    dest: "dist/html",
  },

  pfScss: {
    src: "resources/sass/**/*.s+(a|c)ss",
    dest: "dist/css",
  },

  imgSprite: {
    src: "resources/images/img-sprite/**/*.png",
    clean: ["resources/css/spr/*.png", "resources/sass/vendors/img/*"],
  },

  browsers: [
    "last 3 versions",
    "Android >= 4",
    "Chrome >= 20",
    "Firefox >= 15",
    "Explorer >= 8",
    "iOS >= 6",
    "Opera >= 12",
    "Safari >= 6",
  ],

  scssOpt: {
    outputStyle: isProduction ? "compressed" : "expanded", // nested, expanded, compact, compressed
    indentType: "space",
    indentWidth: 2, // maximum:10
    precision: 6,
    linefeed: "lf", // cr , crlf, lf , lfcr
  },

  purifyOpt: {
    info: true,
    minify: isProduction ? true : false,
    rejected: true,
  },
};

module.exports = config;
