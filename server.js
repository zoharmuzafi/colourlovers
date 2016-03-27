var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    request = require('request'),
    url = require("url");
    hbs = require('hbs');

// Configs bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serves static files from public folder
app.use(express.static(__dirname + '/public'));

// Set view engine to hbs (handlebars)
app.set('view engine', 'hbs');

//listens to external port or 3000
app.listen(process.env.PORT ||3000, function() {
  console.log('server started');
});

//Calls the colourlover api - new
app.get('/api/new', function (req, res) {
  var parsedUrl = url.parse(req.url, true); 
  var queryAsObject = parsedUrl.query;
  var urlToSend = 'http://www.colourlovers.com/api/palettes/new?format=json&showPaletteWidths=1';
  if(queryAsObject.hueOption){
    urlToSend = urlToSend + '&hueOption=' + queryAsObject.hueOption;
  }
  request(urlToSend, function(error, response, body){
  var dataNew = JSON.parse(body);
  res.json(dataNew); 
  });
});

//Call to the colourlover api - top
app.get('/api/top', function (req, res) {
  var parsedUrl = url.parse(req.url, true); 
  var queryAsObject = parsedUrl.query;
  var urlToSend = 'http://www.colourlovers.com/api/palettes/top?format=json&showPaletteWidths=1';
  if(queryAsObject.hueOption){
    urlToSend = urlToSend + '&hueOption=' + queryAsObject.hueOption;
  }
  request(urlToSend, function(error, response, body){
  var dataTop = JSON.parse(body);
  res.json(dataTop); 
  });
});

// Catch all routes angular
app.get('*', function (req, res) {
  res.render('index');
});

