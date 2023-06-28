const isProduction = require("./gulp.env");
const config = {
  html: {
    src: "index.html",
    dest: "dist",
  },

  scss: {
    src: "src/resources/sass/**/*.s+(a|c)ss",
    dest: "dist/css",
  },

  imgDft: {
    src: ["src/resources/images/**/*", "!src/resources/images/**/*-sprite/*"],
    dest: "dist/img/dft/",
  },

  imgSprite: {
    src: ["src/resources/images/**/*-sprite/*.png"],
    clean: ["src/resources/sass/vendors/img/*.scss", "dist/img/spr/*.png"],
    dest: "dist/img/spr/",
  },

  jsPrd: {
    src: "src/resources/js/*.js",
    dest: "dist/js/",
  },

  jsLib: {
    src: "src/resources/js/lib/*.js",
    dest: "dist/js/lib/",
  },

  json: {
    src: "src/json/*.json",
    dest: "dist/json/",
  },

  deploy: {
    src: ["manifest.json", "browserconfig.xml"],
    dest: "dist",
  },

  browsers: [
    "last 3 versions",
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
