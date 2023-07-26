const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const webpack = require('webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  if (
    process.env.NX_TASK_TARGET_CONFIGURATION === 'production' &&
    !process.env.NX_WITH_DEFINE_PLUGIN
  ) {
    // remove DefinePlugin for production (Caddy will handle it!)
    const plugins = config.plugins.map((plugin) => {
      if (plugin instanceof webpack.DefinePlugin) {
        return new webpack.DefinePlugin({ 'process.env': {} });
      }
      return plugin;
    });
    return { ...config, plugins };
  }
  return config;
});
