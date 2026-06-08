const path = require('path');

/**
 * Ensure Turbopack uses the `tatrai_studio` directory as the workspace root
 * so it resolves devDependencies from the correct package.json/node_modules.
 */
module.exports = {
  turbopack: {
    root: path.resolve(__dirname),
  },
};
