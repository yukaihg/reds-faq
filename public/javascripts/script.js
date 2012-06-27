$(document).ready(function(){

	$('#searchBox').keyup(function(){

		var val = $(this).val().trim()
			, results = $('#results').empty();

		if(!val) return;

		jQuery.get("/search/" + val, function(data, textStatus, xhr){
			console.log("got response");
			console.log(data);

			data.forEach(function(result){
				results.append('<li>' + result + '</li>')
			})
		});
	});


	$('#nlpBox').keyup(function(){

		var val = $(this).val().trim()
			, results = $('#nlpResults').empty();

		if(!val) return;

		jQuery.get("/nlp/" + val, function(data, textStatus, xhr){
			console.log("got response");
			console.log(data);

			data.forEach(function(result){
				results.append('<li>' + result + '</li>')
			})
		});
	});
})