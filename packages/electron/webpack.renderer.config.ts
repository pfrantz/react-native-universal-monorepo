/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';
import path from "path";

//@ts-ignore
import { getWebpackTools } from "react-native-monorepo-tools";


const monorepoWebpackTools = getWebpackTools();
rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

const configure = (webpackConfig: Configuration) => {
  // Ensure nohoisted libraries are resolved from this workspace.
  monorepoWebpackTools.addNohoistAliases(webpackConfig);
  return webpackConfig;
}

const config: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      'react-native$': 'react-native-web'
    },

    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};

export const rendererConfig: Configuration = configure(config);
