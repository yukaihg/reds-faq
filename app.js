
/**
 * Module dependencies.
 */
var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, queryController = require('./controller/queryController');


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
	var query = request.params.query;

	queryController.getQuery(query, function(results){
		return response.send(results);
	});
});

app.post('/search', function(request, response){
	var query = request.body.query;

	console.log(query);

	queryController.addQuestion(query, function(){
		queryController.getQuery(query, function(results){
			return response.send(results);
		});
	});
});



app.listen(3000, function(){
	console.log("Server started listening on port %d, in %s mode", app.address().port, app.settings.env);
});

