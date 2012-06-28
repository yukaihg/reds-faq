var reds = require('reds')
	,fullTextSearch = reds.createSearch('search')
	,fakeData = require('./fakeData')
	,fakeDataLength = fakeData.length * 2;

fullTextSearch.client.flushall();

fakeData.forEach(function(data, i){

	//converts data.question into a constant map
	//inserts data.question with id = i, into redis
	fullTextSearch.index(data.question, i, function(err){
		if(err) throw err;

		console.log("Indexed question for full text search: %s", data.question);
		--fakeDataLength || done();
	});

	//inserts data object with key = i, into redis
	fullTextSearch.client.set(i, JSON.stringify(data), function(err){
		if(err) throw err;

		console.log("Indexed question in db: %s", data.question);
		--fakeDataLength || done();
	})
});

function done(){
	console.log("Done indexing");

	fullTextSearch.client.save();
	fullTextSearch.client.end();
}


