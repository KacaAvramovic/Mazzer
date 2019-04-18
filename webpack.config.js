
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
			{
				test: /\.js$/,
				use: {
				  loader: "babel-loader",
				  options: { presets: ["es2015"] }
				}
			  },
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
				  'file-loader',
				  {
					loader: 'image-webpack-loader',
					options: {
					  disable: true, // webpack@2.x and newer
					},
				  }
				]
			}
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    }
}