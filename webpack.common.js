// webpack.config.js
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry : {
    app: "./src/index.js",
  },
plugins: [
  new HtmlWebpackPlugin({
    template: "./src/template.html"
  })
],
output: {
  filename: "main.js",
  path: resolve(__dirname, "dist"),
  clean: true,
},
module: {
  rules: [
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.html$/i,
      loader: "html-loader",
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: "asset/resource",
    }
  ]
}
};