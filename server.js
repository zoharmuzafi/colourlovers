var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
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

app.get('*', function (req, res) {
	console.log("hi");
  res.render('index');
});
