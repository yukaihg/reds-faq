$(document).ready(function(){

	$('#searchBox').keyup(function(){

		var val = $(this).val().trim()
			, results = $('#results').empty();

		if(!val) return;

		jQuery.get("/search/" + val, function(data, textStatus, xhr){

			if(data.length !== 0){
				console.log(data);
				data.forEach(function(result){
					appendSearchResults(result);
				});
			}

		});
	});

});

function appendSearchResults(result){

	var output = '<p><b>Question</b>: ' + result.question + '<br/><b>Answer</b>:<ul>';

	result.answer.forEach(function(answer){
		output += '<li>' + answer + '</li>' + '<br/>';
	});

	output += '</ul></p>';

	$('#results').append(output);
}