const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('rollup-plugin-postcss');

// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    const newConfig = {
      ...config,
      input: path.resolve('src', 'index.tsx'),
    };

    newConfig.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({ preset: 'default' }),
        ],
        inject: false,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: !!options.writeMeta,
      })
    );

    return newConfig;
  },
};
