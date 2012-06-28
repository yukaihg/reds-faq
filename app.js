
/**
 * Module dependencies.
 */
var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, reds = require('reds')
	, search = reds.createSearch('search');

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
	var query = request.params.query
		,results = [];

	search.query(query).end(function(err, ids){

		var numOfIds = ids.length;

		//if no ids' turn up, return empty result
		if(numOfIds === 0){
			return response.send(results);
		}

		//fetch the corresponding fakeData object for each id
		ids.forEach(function(id, i){
			search.client.get(id, function(err, data){

				results.push(JSON.parse(data));

				if(--numOfIds === 0){
					return response.send(results);
				}
			});
		});

	});



});

app.listen(3000, function(){
	console.log("Server started listening on port %d, in %s mode", app.address().port, app.settings.env);
});

