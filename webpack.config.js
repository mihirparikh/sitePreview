var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");

module.exports = {
	// context: path.resolve(__dirname, 'app'),
	entry: {
		vendor: ["./app/vendor.js"],
		app: ["webpack/hot/dev-server", "./app/app.js"]
	},
	// output: {
	// 	path: __dirname + '/js',
	// 	filename: 'app.bundle.js'
	// },
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "build"),
		publicPath: ""
	},
	devServer: {
		port: 9900,
		proxy: {
			'/thumb-api*': {
				target: 'https://api.thumbalizr.com',
				changeOrigin: true,
				// rewrite: function(req) {
				// 	req.url = req.url.replace(/^\/thumb-api/, '');
				// }
				pathRewrite: {
					'^/thumb-api': ''
				}
			}
		}
	},
	devtool: "source-map",

	eslint: {
		failOnError: true
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'jshint-loader',
				exclude: /node_modules/
			}
		],
		loaders: [
			{
				test: /\.js$/,
				loader: 'ng-annotate?add=true',
				exclude: /node_modules/
			},
			{
				test: /.html$/,
				loaders: ["raw-loader"]
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'autoprefixer-loader?browsers=last 2 versions', 'sass']
			},
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/font-woff"
			},
			{
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/font-woff"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/octet-stream"
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file"
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=image/svg+xml"
			},
			{
				test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=100000&mimetype=image/png+xml"
			},
			{
				test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=image/gif+xml"
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor"
		}),
		new HtmlWebpackPlugin({
			template: "./app/index.html",
			inject: true
		})
	]
};

