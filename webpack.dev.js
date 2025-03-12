const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
module.exports = merge(common, {
	entry: path.join(__dirname, './src/index.tsx'),
	mode: 'development',
	target: ['web', 'es5'],
	devtool: 'source-map',
	devServer: {
		static: './dist',
		hot: true,
		compress: true,
		open: true,
		historyApiFallback: true,
	},
	watchOptions: { ignored: /node_modules/ },
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				// 用awesome-typescript-loader 会报错
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true, // 关闭类型检查
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(less|css)$/i,
				// webpack 5+ 用use, 不用loader
				use: [
					// compiles Less to CSS
					'style-loader',
					'css-loader',
					'less-loader',
				],
				include: [path.join(__dirname, './src')],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './public/index.html'),
		}),
	],
	optimization: {
		runtimeChunk: 'single', //  runtime 代码拆分为一个单独的 chunk
	},
	output: {
		publicPath: '/',
	},
});
