var animalVar = ['cat', 'dog', 'hamster', 'gerbil'];

function createButton(){

	$('#buttonGoesHere').empty();

	for(i=0; i<animalVar.length; i++){
		var button = $('<button>');

		button.attr('data-name', animalVar[i]);
		button.text(animalVar[i]);
		button.addClass('btn btn-primary');
		button.addClass('gifffs');

		$('#buttonGoesHere').append(button);
	};


};
$('#addAnimal').on('click', function(){

	var animal = $('#addAnimaltext').val().trim();
	if(animal == ""){}
		else{
			animalVar.push(animal);
			}
	
	createButton();
	$('#addAnimaltext').val('');
	return false;

});

$('#buttonGoesHere').on('click', '.btn', function(){
	var gif = $(this).attr('data-name');
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gif+"&api_key=dc6zaTOxFJmzC&limit=20";
	$('#gifGoesHere').empty();
	$.ajax({url: queryURL, method: 'GET'})
	.done(function(response){
		console.log(response);
		
		$.each(response.data, function(index, value){
		var ImageStill = value.images.original_still.url;
		var ImageAnimate = value.images.original.url;
		var gifImg = $('<img>');

		gifImg.attr('src', ImageStill);
		gifImg.attr('alt', 'gifs');
		gifImg.attr("data-state", "still");
		// gifImg.addClass('img img-responsive')
		
		$('#gifGoesHere').append(gifImg);
		
		console.log(ImageStill);
		console.log(ImageAnimate);
		//pause/play still not working
		$(gifImg).on('click', function(){
			var state = $(this).data('state');
	

		if('still' == state){
		
		
		$(this).attr('src', ImageAnimate).data('state', 'animate');

		}
		else{
		
		
		$(this).attr('src', ImageStill).data('state', 'still');	
		}
		});
			
	});
	
	});


});

	

createButton();