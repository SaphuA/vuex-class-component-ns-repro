var path = require("path");
var webpack = require("webpack");
var VueLoaderPlugin = require("vue-loader/lib/plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var { CleanWebpackPlugin } = require("clean-webpack-plugin");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const pages = [{
  name: "main",
  entry: path.resolve(__dirname, "src/main.ts"),
  template: "auto",
}];

const entry = pages.reduce((prev, page) => {
  prev[page.name] = page.entry;
  return prev;
}, {});

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry,
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name]/[name].[contenthash:8].js" : "[name]/[name].js",
      publicPath: "",
    },
    resolve: {
      extensions: [".vue", ".ts", ".js", ".css"],
      alias: {
        "vue$": "vue/dist/vue.esm.js",
        "@": path.resolve(__dirname, "src"),
      }
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader", options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true } },
        { test: /\.vue$/, loader: "vue-loader" },
        { test: /\.css$/, use: ["vue-style-loader", "css-loader"] },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }]
        }
      ]
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new ForkTsCheckerWebpackPlugin({ tslint: true, vue: true }),
      new VueLoaderPlugin(),
      ...pages.map((page) => new HtmlWebpackPlugin({
        chunks: [page.name],
        title: page.title,
        template: page.template,
        filename: page.name + "/index.html"
      })),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({ "ENABLE_STUBS": JSON.stringify(!!argv.stubs) }),
    ],
    devServer: {
      port: 8081,
      contentBase: path.resolve(__dirname, "dist"),
      openPage: "main/",
    }
  }
}