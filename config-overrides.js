const { override } = require('customize-cra');

const addWebWorkerLoader = (loaderOptions) => (config) => {
  const mergedLoaderOptions = Object.assign({}, loaderOptions);
  if (loaderOptions.use) {
    if (Array.isArray(loaderOptions.use))
      mergedLoaderOptions.use = Array.from(loaderOptions.use);
    else mergedLoaderOptions.use = [loaderOptions.use];
  } else if (loaderOptions.loader) {
    delete mergedLoaderOptions.loader;
    delete mergedLoaderOptions.options;
    mergedLoaderOptions.use = [
      {
        loader: loaderOptions.loader,
        options: loaderOptions.options,
      },
    ];
  } else throw new Error('loaderOptions should have .use or .loader');

  const rules = config.module.rules;
  for (const rule of rules) {
    if (rule.oneOf) {
      for (const one of rule.oneOf) {
        if (
          one.test.toString() === '/\\.(js|mjs|jsx|ts|tsx)$/' ||
          one.test.toString() === '/\\.(js|mjs|jsx)$/'
        ) {
          if (!mergedLoaderOptions.include)
            mergedLoaderOptions.include = one.include;
          mergedLoaderOptions.use.push({
            loader: one.loader,
            options: one.options,
          });

          rule.oneOf.unshift(mergedLoaderOptions);
          break;
        }
      }

      break;
    }
  }

  config.output['globalObject'] = 'self';

  return config;
};

module.exports = override(
  addWebWorkerLoader({
    test: /\.worker\.(js|ts)$/,
    use: 'worker-loader',
  }),
  (config) => {
    config.output.filename = '[name].js';
    return config;
  },
);
