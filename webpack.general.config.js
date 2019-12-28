module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /.(jpg|jpeg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
}
