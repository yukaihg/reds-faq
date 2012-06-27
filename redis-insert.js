var reds = require('reds')
	,search = reds.createSearch('url')
	,list = require('./list')
	,agent = require('superagent')
	,listNLP = require('./fakeData');

search.client.flushall();

var numAnswers = listNLP.length;
var keyPair;
search = reds.createSearch('answers');

listNLP.forEach(function(answer, i){

	search.index(answer.question, JSON.stringify(answer), function(err){
		if(err) throw err;

		console.log("Indexed answer: %s", answer.question);
		--numAnswers || done();
	});
});

function done(){
	console.log("Done indexing");
	search.client.save();
	search.client.end();
}


