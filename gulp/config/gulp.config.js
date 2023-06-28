const isProduction = require("./gulp.env");
const config = {
  html: {
    src: "index.html",
    dest: "dist",
  },

  scss: {
    src: "resources/sass/**/*.s+(a|c)ss",
    dest: "dist/css",
  },

  imgDft: {
    src: ["resources/images/**/*", "!resources/images/**/*-sprite/*"],
    dest: "dist/img/dft/",
  },

  imgSprite: {
    src: ["resources/images/**/*-sprite/*.png"],
    clean: ["resources/sass/vendors/img/*.scss", "dist/img/spr/*.png"],
    dest: "dist/img/spr/",
  },

  jsPrd: {
    src: "resources/js/*.js",
    dest: "dist/js/",
  },

  jsLib: {
    src: "resources/js/lib/*.js",
    dest: "dist/js/lib/",
  },

  json: {
    src: "json/*.json",
    dest: "dist/json/",
  },

  deploy: {
    src: ["manifest.json", "browserconfig.xml"],
    dest: "dist",
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
    outputStyle: "compressed", // nested, expanded, compact, compressed
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
