var config = require('./config.json');
var App    = require('./app');

app = new App(config);
app.start();
