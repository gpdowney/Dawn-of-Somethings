// define markdown-it plugins for anchors, attributes, and TOCs
const markdownItAnchor = require("markdown-it-anchor")
const markdownItTOC = require("markdown-it-table-of-contents")
const markdownItAttrs = require("markdown-it-attrs")

// add <base> plugin
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  // Copy `src/style.css` to `_site/style.css`
  eleventyConfig.addPassthroughCopy("src/style.css");

  // Passthrough for fonts
  eleventyConfig.addPassthroughCopy("src/fonts");

  // add markdown-it plugins
  eleventyConfig.amendLibrary("md", mdLib => mdLib.use(markdownItAnchor))
  eleventyConfig.amendLibrary("md", mdLib => mdLib.use(markdownItAttrs))

  // include and change TOC settings
  eleventyConfig.amendLibrary("md", mdLib => mdLib.use(markdownItTOC, {"includeLevel": [2,2]}))

  // include <base> plugin
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  return {
    // When a passthrough file is modified, rebuild the pages:
    passthroughFileCopy: true,
    // Set custom directories for input, output, includes, and data
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    // set path to subpage for <base> plugin
    pathPrefix: process.env.NODE_ENV === "production" ? "/dawn" : "",
  };
};
