
// const fs = require('fs');
// const cert = fs.readFileSync('server_cert.pem');

module.exports = {
  lintOnSave: true,
  assetsDir: 'assets',
  publicPath: '',

  // configureWebpack: config => {
  //   return {
  //     plugins: [
  //       new webpack.DefinePlugin({
  //         'cert': cert,
  //       })
  //     ]
  //   };
  // },
};
