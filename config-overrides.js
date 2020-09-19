const WorkerPlugin = require('worker-plugin');
const { addWebpackPlugin, override } = require('customize-cra');

module.exports = override(addWebpackPlugin(new WorkerPlugin()));
