const nunjucks = require('nunjucks');

module.exports = {
  // Takes a ramlObj and outputs the Confluence Wiki
  processRamlObj(ramlObj, config) {
    const env = nunjucks.configure(__dirname, { autoescape: false });

    return new Promise((resolve) => {
      const result = env.render('index.nunjucks', ramlObj);
      if (config.processOutput) {
        resolve(config.processOutput(result));
      }

      return resolve(result);
    });
  },

  // Takes the Confluence Wiki and post processes it further
  postProcessHtml(data) {
    data = data.replace(/([{}])/g, '\\$1');
    return data.replace(/\n{3,}/g, '\n\n');
  },
}