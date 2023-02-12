const webpack = require("webpack");
const { getWebpackTools } = require("react-native-monorepo-tools");
const path = require('path');

const monorepoWebpackTools = getWebpackTools();

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Allow importing from external workspaces.
      monorepoWebpackTools.enableWorkspacesResolution(webpackConfig);
      // Ensure nohoisted libraries are resolved from this workspace.
      monorepoWebpackTools.addNohoistAliases(webpackConfig);

      // add the top level package as a app source path so our nohoisted
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
          ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );

      const [ clientSrc ] = webpackConfig.resolve.plugins[scopePluginIndex].appSrcs;
      const psvServices = path.resolve(clientSrc,'../..');

      webpackConfig.resolve.plugins[scopePluginIndex].appSrcs.push(psvServices);

      return webpackConfig;
    },
    plugins: [
      // Inject the "__DEV__" global variable.
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== "production",
      }),
      // Inject the "__SUBPLATFORM__" global variable.
      // It can be used to determine whether we're running within Electron or not.
      new webpack.DefinePlugin({
        __SUBPLATFORM__: JSON.stringify("electron"),
      }),
    ],
  },
};
