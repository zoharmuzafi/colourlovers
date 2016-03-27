var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    request = require('request');
    hbs = require('hbs');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs (handlebars)
app.set('view engine', 'hbs');

app.listen(process.env.PORT ||3000, function() {
  console.log('server started');
});

//call to the colourlover api - new
app.get('/api/new', function (req, res) {
  request('http://www.colourlovers.com/api/palettes/new?format=json&showPaletteWidths=1', function(error, response, body){
  var dataNew = JSON.parse(body);
  res.json(dataNew); 
  });
});

//call to the colourlover api - top
app.get('/api/top', function (req, res) {
  request('http://www.colourlovers.com/api/palettes/top?format=json&showPaletteWidths=1', function(error, response, body){
  var dataTop = JSON.parse(body);
  res.json(dataTop); 
  });
});

// catch all routes angular
app.get('*', function (req, res) {
	console.log("hi");
  res.render('index');
});

