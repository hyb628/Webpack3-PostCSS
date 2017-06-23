var express = require('express'),
    webpack = require('webpack'),
    config= require('./webpack.config.js'),
    app = express();
    // config.entry.main.unshift("webpack-dev-server/client?http://localhost:9000/", "webpack/hot/dev-server");

var compiler = webpack(config);

compiler.apply(new webpack.ProgressPlugin());
// app.use(require('connect-history-api-fallback')());
app.use(require('webpack-dev-middleware')(compiler, {
    hot: true,
    noInfo: true,
    reload: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(9000, '127.0.0.1', function(err) {
    err && console.log(err);
});
