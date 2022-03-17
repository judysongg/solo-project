const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  target: "web",
  entry: path.join(__dirname, "client", "index.js"),
  output: {
    path:path.resolve(__dirname, "dist"),
  },
  
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|otf|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        name : 'assets/img/[name].[ext]'
                    }
                }
            ]
      }
      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "client", "index.html"),
    }),
  ],
  
  // devServer: {
  //   proxy: {
  //       '/**': 'http://localhost:3000'
  //     }
  // }

  // fetch('/')
}








