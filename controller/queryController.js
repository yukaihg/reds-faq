var reds = require('reds')
	, search = reds.createSearch('search');

exports.getQuery = function(query, callback){

	var results = [];

	search.query(query).end(function(err, ids){

		var numOfIds = ids.length;

		//if no ids' turn up, return empty result
		if(numOfIds === 0){
			callback(results);
		}

		//fetch the corresponding fakeData object for each id
		ids.forEach(function(id, i){
			search.client.get(id, function(err, data){

				results.push(JSON.parse(data));

				if(--numOfIds === 0){
					callback(results);
				}
			});
		});
	});
};

