var reds = require('reds')
	,search = reds.createSearch('pets')
	,list = require('./list')
	,agent = require('superagent');

var numURL = list.length;

list.forEach(function(url, i){
	//scrap html data off sites and index results into redis using 'reds' module
	agent.get(url).end(function(response){

		if(response.ok){
			var body = removeTags(response.text);

			search.index(body, i, function(err){
				if(err) throw err;

				console.log("Url: %s --completed", url);
				--numURL || done();
			})
		}
		else {
			console.log('error');
		}
	});

});

function done(){
	console.log("Done indexing");
	process.exit();
}

function removeTags(html){
	return String(html).replace(/<\/?([^>]+)>/g, '');
}

