import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";

export default {
    ...commonConfig,
    mode: 'production',
    optimization: {
      minimize: true,
    },
}