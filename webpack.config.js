var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'bread-engine.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'lib'),
      'node_modules'
    ],
    extensions: ['.js', '.min.js'],
  },
};
