const join = require('path').join;
const hostenv = require('hostenv');

const config = module.exports;

// Determinar entorno (PRODUCTION=1 equivale a producción)
config.production = Boolean(process.env.PRODUCTION);
config.development = !config.production;

// URLs
config.port = hostenv.PORT || 8080;
config.hostname = hostenv.HOSTNAME || 'localhost';
config.url = `http://${config.hostname}:${config.port}`;

// Paths
config.rootPath = join(__dirname, '..');

// Directorio aplicación
config.sourceDirectory = 'client';
config.sourcePath = join(config.rootPath, config.sourceDirectory);

// Directorio static
config.assetsDirectory = 'assets';
config.assetsPath = join(config.rootPath, config.assetsDirectory);

// Archivo principal de aplicación
config.sourceScript = 'index.jsx';
config.sourceScriptPath = join(config.sourcePath, config.sourceScript);

// Bundle de aplicación
config.assetsScript = 'bundle.js';
config.assetsScriptPath = join(config.assetsDirectory, config.assetsScript);

// Bundle de estilos
config.assetsStyle = 'bundle.css';
config.assetsStylePath = join(config.assetsDirectory, config.assetsStyle);

// Plantilla HTML inicial
config.assetsIndex = 'index.html';
config.assetsIndexPath = join(config.assetsPath, config.assetsIndex);

// Extensiones procesadas x Webpack
config.extensions = ['', '.js', '.jsx', 'css', '.scss'];

// Plugins PostCSS
config.postCSS = [
  require('autoprefixer')
];

// Webpack
config.webpackPort = config.webpackPort = 9090;
config.webpackHostname = config.webpackHostname = config.hostname;
config.webpackUrl = config.webpackUrl = `http://${config.webpackHostname}:${config.webpackPort}`;
config.getWebpackConfig = config.production
  ? () => require('./webpack.production')
  : () => require('./webpack.development');
