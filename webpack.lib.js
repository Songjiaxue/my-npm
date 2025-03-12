const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');
module.exports = merge(common, {
	entry: path.join(__dirname, './src/index.ts'),
	mode: 'production',
	target: ['web', 'es5'],
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
					// 'style-loader',
					{
						loader: MiniCssExtractPlugin.loader,
						options: { publicPath: './' },
					},
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
		new MiniCssExtractPlugin({
			filename: 'index.min.css',
			chunkFilename: '[id].min.css',
		}),
		// new CopyWebpackPlugin({
		//   patterns: [
		//     {
		//       from: path.join(__dirname, './src/assets/calendar.png'),
		//       to: path.join(__dirname, './dist/assets'),
		//       toType: 'dir',
		//     },
		//   ],
		// }),
	],
	optimization: { minimizer: [new CssMinimizerPlugin()] },
	output: {
		filename: 'index.bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		publicPath: '/',
		globalObject: 'this',
		libraryTarget: 'umd',
		library: 'CalendarTable',
	},
	externals: {
		// 定义外部依赖，避免把react和react-dom打包进去
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react',
		},
		'react-dom': {
			root: 'ReactDOM',
			commonjs2: 'react-dom',
			commonjs: 'react-dom',
			amd: 'react-dom',
		},
		dayjs: {
			root: 'dayjs',
			commonjs2: 'dayjs',
			commonjs: 'dayjs',
			amd: 'dayjs',
		},
	},
});
