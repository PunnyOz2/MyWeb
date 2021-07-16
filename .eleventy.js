const { DateTime } = require('luxon');
module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/css');
    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.addPassthroughCopy('src/js');
    eleventyConfig.addFilter("postYear",(dateObj) => {
        return DateTime.fromJSDate(dateObj).toObject().year;
    })
    eleventyConfig.addFilter("postMonth",(dateObj) => {
        return DateTime.fromJSDate(dateObj).toObject().month;
    })
    eleventyConfig.addFilter("postDay",(dateObj) => {
        return DateTime.fromJSDate(dateObj).toObject().day;
    })
    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
  };
