module.exports = (on, config) => {
  const options = {
    webpackOptions: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules\/(?!(cheerio)\/).*/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
          },
        ],
      },
    },
  };

  on("file:preprocessor", require("@cypress/webpack-preprocessor")(options));

  return config;
};
