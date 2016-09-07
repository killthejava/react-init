/* eslint no-console:0 */

const express = require('express');
const config = require('../webpack');

const app = express();

/*
 * RUTAS
 */

// Requerido para archivo de fuentes de Font-Awesome
app.use(express.static('assets'));

// Enviar script dependiendo del entorno
app.get(`/${config.assetsScript}`, (req, res) => {
  // Archivo generado
  if (config.production) {
    res.sendFile(config.assetsScriptPath, { root: config.rootPath });
  } else {
    res.redirect(`${config.webpackUrl}/${config.assetsDirectory}/${config.assetsScript}`);
  }
});

// Similar a lo anterior
app.get(`/${config.assetsStyle}`, (req, res) => {
  if (config.production) {
    res.sendFile(config.assetsStylePath, { root: config.rootPath });
  } else {
    res.redirect(`${config.webpackUrl}/${config.assetsDirectory}/${config.assetsStyle}`);
  }
});

// Ruta wildcard, recomendada x react-router
// https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#configuring-your-server
app.get('*', (req, res) => {
  res.sendFile(config.assetsIndexPath);
});

/*
 * SERVIDOR
 */

// Express
const server = app.listen(config.port, config.hostname, () => {
  const {
    address: hostname,
    port
  } = server.address();
  console.log('Listening at http://%s:%s', hostname, port);
});

// Webpack Dev Server
// http://webpack.github.io/docs/webpack-dev-server.html
if (config.development) {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');

  const webpackConfig = config.getWebpackConfig();
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    noInfo: true
  }).listen(config.webpackPort, config.webpackHostname, (err) => {
    console.err(err);
  });
}
