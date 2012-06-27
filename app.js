
/**
 * Module dependencies.
 */
var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, reds = require('reds')
	, search = reds.createSearch('url')
	, urlList = require('./list')
	, answersList = require('./listNLP');

var app = express.createServer();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/search/:query', function(request, response){
	search = reds.createSearch('url');
	var query = request.params.query;

	search.query(query).end(function(err, ids){
		var result = ids.map(function(id){
			return urlList[id];
		});

		return response.send(result);
	});
});

app.get('/nlp/:query', function(request, response){
	var search = reds.createSearch('questions')
	var query = request.params.query;

	console.log("Nlp query is: " + query);

	search.query(query).end(function(err, ids){
		var result = ids.map(function(id){
			return answersList[id];
		});

		return response.send(result);
	});

});

app.listen(3000, function(){
	console.log("Server started listening on port %d, in %s", app.address().port, app.settings.env);
});

