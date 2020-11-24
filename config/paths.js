const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

exports.root = resolveApp('.');
exports.src = resolveApp('src');
exports.nodeModules = resolveApp('node_modules');
exports.packageJson = resolveApp('package.json');
exports.webpackConfig = resolveApp('webpack.config.js');
exports.out = resolveApp('dist');
exports.public = process.env.NODE_ENV === 'production' ? '/public/' : '/';
