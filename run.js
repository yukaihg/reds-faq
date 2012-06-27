var reds = require('reds')
	,search = reds.createSearch('url')
	,list = require('./list')
	,agent = require('superagent')
	,listNLP = require('./listNLP');

var numURL = list.length;

//scrap html data off sites and index results into redis using 'reds' module
list.forEach(function(url, i){
	agent.get(url).end(function(response){

		if(response.ok){
			var body = removeTags(response.text);

			search.index(body, i, function(err){
				if(err) throw err;

				console.log("Url: %s --completed", url);
				--numURL || runNextList();
			})
		}
		else {
			console.log('error');
		}
	});

});

//add fake answers lol
function runNextList(){
	var numAnswers = listNLP.length;
	search = reds.createSearch('questions');

	listNLP.forEach(function(answer, i){
		search.index(answer, i, function(err){
			if(err) throw err;

			console.log("Indexed answer: %s", answer);
			--numAnswers || done();
		});

	});
}

//'reds' acts up and won't exit unless you call process.exit
function done(){
	console.log("Done indexing");
	process.exit();
}

function removeTags(html){
	return String(html).replace(/<\/?([^>]+)>/g, '');
}


