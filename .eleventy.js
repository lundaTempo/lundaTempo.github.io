const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // Enable line breaks in markdown (single newline → <br>)
  const md = markdownIt({ html: true, breaks: true });
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("partials");
  eleventyConfig.addPassthroughCopy("assets");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_includes",
    },
  };
};
