const path = require('path');

module.exports = {
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    symlinks: false, // 不使用 symlinks（例如 npm link 或者 yarn link）
    cacheWithContext: false, // 使用自定义 resolve plugin 规则，并且没有指定 context 上下文
    alias: {
      '@views': path.join(__dirname, './src/views'),
      '@styles': path.join(__dirname, './src/styles'),
      '@images': path.join(__dirname, './src/images'),
      '@components': path.join(__dirname, './src/components'),
      '@utils': path.join(__dirname, './src/utils'),
      '@lang': path.join(__dirname, './src/lang'),
      '@configure': path.join(__dirname, './src/configure'),
    },
  },
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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name]',
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors', // 将第三方库提取到单独的 vendor chunk 文件中
          chunks: 'all',
        },
      },
    },
    moduleIds: 'deterministic',
    usedExports: true,
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      // This makes all dependencies of this file - build dependencies
      config: [__filename],
      // 默认情况下 webpack 与 loader 是构建依赖。
    },
  },
};
