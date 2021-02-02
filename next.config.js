module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.module.rules.push({
      test: /\.wav$/,
      loader: "file-loader",
      options: {
        publicPath: "/_next/static/sounds/",
        outputPath: "static/sounds/",
        name: "[name].[ext]",
        esModule: false,
      },
    });

    return config;
  },
};
