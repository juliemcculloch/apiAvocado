var avocadoApp = {};

avocadoApp.apiKey = '60a49ee8a36667f33e115ce04ed7d81e';
avocadoApp.apiID = '82c551aa';
avocadoApp.avocadoContainer = $('#recipes')

avocadoApp.init = function (){
	$('#userIngredients .button').on('click', function(event){
		event.preventDefault(); 
		var ingredient = $(".ingredientOne").val(); 

		avocadoApp.getRecipes(ingredient);
	});
};

avocadoApp.getRecipes = function(extraIngredient){
	$.ajax({
		url:'http://api.yummly.com/v1/api/recipes',
		type: 'GET',
		dataType: 'jsonp',
		data:{
			format: 'jsonp',
			_app_id: avocadoApp.apiID,
			_app_key: avocadoApp.apiKey,
			requirePictures: true,
			maxResult: 2, 
			start: 0,
			q: 'avocado+'+extraIngredient,
		},
		success: function(result){
			$('#recipes').empty();
			avocadoApp.displayRecipes(result);
		}
	});
};

avocadoApp.displayRecipes = function (data){
	console.log(data); 
	//console.log(data.matches[0].recipeName)
	//console.log(data.matches[1].recipeName)

	for(i = 0; i < data.matches.length; i++){ //need spaces in ingredients
		$('#recipes').append('<div class="recipe"></div');

		$('#recipes .recipe:last').append( "<h2>"+data.matches[i].recipeName+"</h2>" );
		$('#recipes .recipe:last').append( '<img src="'+data.matches[i].imageUrlsBySize["90"]+'">');
		$('#recipes .recipe:last').append( "<p>ingredients: "+data.matches[i].ingredients+"</p>" );
		$('#recipes .recipe:last').append( "<p>cooking time: "+data.matches[i].totalTimeInSeconds/60+" mins</p>" );
	};
};

$(function(){
	avocadoApp.init();
});