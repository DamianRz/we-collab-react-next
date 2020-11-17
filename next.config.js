//const withStyles = require('@webdeb/next-styles');
//const withStylus = require("@zeit/next-stylus");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");

//module.exports = withStylus({ 
//  sass: true,
//  modules: true,
//});

module.exports = withCSS(
  withSass({
    sass: true,
    modules: true,
  })
);
