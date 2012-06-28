$(document).ready(function(){

	$('#searchBox').on("input", function(){
		var val = $(this).val().trim()
			, results = $('#results').empty()
			, questionBox = $('#question');

		if(!val) return;

		jQuery.get("/search/" + val, function(data, textStatus, xhr){
			if(data.length !== 0){
				console.log(data);
				data.forEach(function(result, i){
					appendSearchResults(result);
				});
			}
			else {
				$('#questionBox').remove();
				questionBox.append(submitQuestion());
			}
		});
	});


	$('form').bind('submit', function(){
		console.log('submit');

		var val = $('#searchBox').val().trim()
			, results = $('#results').empty()
			, data = {};

		$('#questionBox').remove();

		data.query = val;

		jQuery.post("/search", data, function(data, textStatus, xhr){
			console.log('response');

			if(data.length !== 0){

				data.forEach(function(result, i){
					appendSearchResults(result, i);
				});
			}
		});

		return false;
	});

});

function appendSearchResults(result, i){

	var output = '<p><b>Question</b>: ' + result.question + '<br/><b>Answer</b>:<ul>';

	if(result.answer.length === 0){
		output += "<li>It's a trap</li><br/>"
	}
	else{
		result.answer.forEach(function(answer){
			output += '<li>' + answer + '</li><br/>';
		});
	}
	output += '</ul></p>';
	$('#results').append(output);
	$('#questionBox').remove();
}

function submitQuestion(){

	var output = 	'<div id="questionBox">' +
					'<p>No match found. ' +
					'<input type="submit" value="Ask a question"></p></div>';
	return output;
}
