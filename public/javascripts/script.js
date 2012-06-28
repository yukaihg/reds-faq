$(document).ready(function(){


	$('#searchBox').keyup(function(){

		var val = $(this).val().trim()
			, results = $('#results').empty()
			, logMsg = 	$('#logMsg').empty()
			, searchBox = $('#search');

		$('#questionInputBox').remove();

		if(!val) return;

		jQuery.get("/search/" + val, function(data, textStatus, xhr){

			if(data.length !== 0){
				console.log(data);
				data.forEach(function(result, i){
					appendSearchResults(result);
				});
			}
			else {
				logMsg.append('<p>не найдено</p>');
				searchBox.append(submitQuestion());
			}
		});
	});

	$('form').bind('submit', function(){
		console.log('submit');

		var val = $('#searchBox').val().trim()
			, results = $('#results').empty()
			, data = {};

		$('#questionInputBox').remove();
		$('#logMsg').empty();

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

	result.answer.forEach(function(answer){
		output += '<li>' + answer + '</li>' +'<br/>';
	});

	output += '</ul></p>';
	$('#results').append(output);
}

function submitQuestion(){
	return '<input type="submit" value="ask" id="questionInputBox">';
}