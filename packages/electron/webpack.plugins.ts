import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import webpack from "webpack";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  // Inject the "__DEV__" global variable.
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== "production",
  }),
  // Inject the "__SUBPLATFORM__" global variable.
  // It can be used to determine whether we're running within Electron or not.
  new webpack.DefinePlugin({
    __SUBPLATFORM__: JSON.stringify("electron"),
  })
];
