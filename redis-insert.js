var reds = require('reds')
	,search = reds.createSearch('answers')
	,agent = require('superagent')
	,fakeData = require('./fakeData')
	,numAnswers = fakeData.length;

search.client.flushall();

fakeData.forEach(function(answer, i){

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


