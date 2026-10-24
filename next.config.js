const path = require('path');

/**
 * Ensure Turbopack uses the `tatrai_studio` directory as the workspace root
 * so it resolves devDependencies from the correct package.json/node_modules.
 */
module.exports = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    turbopackMemoryLimit: 512 * 1024 * 1024,
    turbopackSourceMaps: false,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/uploads/:path*',
          destination: '/api/uploads/:path*',
        },
      ],
    };
  },
};
