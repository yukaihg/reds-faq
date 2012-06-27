$(document).ready(function(){

	$('#searchBox').keyup(function(){

		var val = $(this).val().trim()
			, results = $('#results').empty();

		if(!val) return;

		jQuery.get("/search/" + val, function(data, textStatus, xhr){
			console.log("got response");
			console.log(data);

			data.forEach(function(result){
				results.append('<li> <b>Question</b>: ' + result.question +
					'<br/><b>Answer</b>: '+ result.answer +'</li><br/>')
			})
		});
	});

})