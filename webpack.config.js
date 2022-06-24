const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    console.log('RUNNING IN DEV MODE. Service worker will not generate.')
  } else {
    console.log('RUNNING IN NON-DEV MODE. Service worker will generate.')
  }

  const htmlPlugin = new HtmlWebpackPlugin({
    // Need to use template because need 'root' div for react injection. templateContent doesn't play nice with title, so just use a template file instead.
    template: "./src/index.html",
  })

  const serviceWorkerPlugin = new WorkboxPlugin.GenerateSW({
    // these options encourage the ServiceWorkers to get in there fast
    // and not allow any straggling "old" SWs to hang around
    clientsClaim: true,
    skipWaiting: true,
  })

  const faviconPlugin = new FaviconsWebpackPlugin({
    logo: "./src/images/favicon.png",
    mode: "webapp", // optional can be 'webapp', 'light' or 'auto' - 'auto' by default
    devMode: "webapp", // optional can be 'webapp' or 'light' - 'light' by default
    favicons: {
      appName: "Monkeys of the Caribbean",
      short_name: "Monkeys",
      start_url: "../.",
      // scope: ".",
      appDescription: "A spatial strategy game",
      display: "standalone",
      orientation: "landscape",
      developerName: "skedwards88",
      developerURL: null, // prevent retrieving from the nearest package.json
      background: "#ccbe3d",
      theme_color: "#00FFFF",
      icons: {
        coast: false,
        yandex: false,
      },
    },
  })

  const plugins = argv.mode === 'development' ? [htmlPlugin, faviconPlugin] : [htmlPlugin, faviconPlugin, serviceWorkerPlugin]

  return {
    entry: "./src/index.js",
    mode: "production",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: { presets: ["@babel/env"] },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
      publicPath: "",
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true, // removes unused files from output dir
    },
    devServer: {
      static: "./dist",
      port: 4001,
    },
    plugins: plugins,
  }
};
