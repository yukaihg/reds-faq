var reds = require('reds')
	, search = reds.createSearch('search');

exports.getQuery = function(query, callback){

	var results = [];

	search.query(query).end(function(err, ids){

		var numOfIds = ids.length;
		//if no ids' turn up, return empty result
		if(numOfIds === 0){
			console.log('Search result empty, nothing turned up');
			callback(results);
		}

		//fetch the corresponding fakeData object for each id
		ids.forEach(function(id, i){
			console.log("found: %s", id);
			search.client.get(id, function(err, data){
				results.push(JSON.parse(data));

				if(--numOfIds === 0){
					callback(results);
				}
			});
		});
	});
};

exports.addQuestion = function(question, callback){

	var data = {'question':question, 'answer': []};

	search.index(question, question, function(err){
		if (err) throw err;

		search.client.set(question, JSON.stringify(data), function(err){
			if (err) throw err;
			callback();
		})
	})

}
