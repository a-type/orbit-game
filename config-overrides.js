const WorkerPlugin = require("worker-plugin");

module.exports = function override(config, env) {
  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.push(new WorkerPlugin());

  return config;
};
