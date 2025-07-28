import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";

export default {
    ...commonConfig, 
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/template.html"],
    }
};