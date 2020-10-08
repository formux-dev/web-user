module.exports = {
  trailingSlash: true,
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.scss$/,
      loader: ["style-loader", "css-loader", "sass-loader"],
    });
    return config;
  },
};
