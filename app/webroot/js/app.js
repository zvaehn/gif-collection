$(function(){

	// Backbone Models
	var Gif = Backbone.Model.extend({
		idAttribute: 'gif_id',
		urlRoot: '/gifs',
    	defaults: {
			Gif: {
				gif_id: null,
				user_id: null,
				url: null,
				created_at: new Date()
			}
		},
		create: function(){
			this.set({
				Gif: {
					url: $('#gif_input').val()
				}
			});

			this.save({}, {
				success: function(model, response) {
					console.log(model);
					if(response.status == "ok") {
						$('#gif_input').val("");
						toast(response.message, 3000);

						$('#gif_list').prepend('<div class="item" data-w="300" data-h="400"><img src="'+model.attributes.Gif.url+'"></div>');

						$('#gif_list').flexImages({
							rowHeight: 300
						});
					}
					else {
						toast(response.message.url[0], 3000);
					}
				},
				error: function(model, response) {
					console.log("error");
					console.log(response);
				}
			});
		},
	}); 

	// Backbone Views
	var DocumentView = Backbone.View.extend({
		el: $('body'),
		initialize: function() {
			
		}
	});

	var GifInput = Backbone.View.extend({
		el: $('#gif_input_wrapper'),
		events: {
			'click #gif_add': 'add_gif',
			'submit #gif_input': 'add_gif',
		},
		add_gif: function(e) {
			e.preventDefault();
			this.model.create();
		}
	});

	var GifView = Backbone.View.extend({
		//tagName: 'li',
  		//id: 'gif-wrapper',
		//className: 'gif-container',
		//el: "div",
		//el: "li",
		initialize: function() {
			this.render();
		},
		template: _.template('<h3><%= Gif.url %></h3>'),
		render: function(){
	    	//this.$el.html(this.template('<img src="'+this.model.get('Gif').url+'">'));
	    	this.$el.html(this.template(this.model.toJSON()));
	    	return this;
	  	},
	});

	// Backbone Collections
	var GifList = Backbone.Collection.extend({
		//model: Gif
  		url: '/gifs',
	});


	// Application 
	var giflist = new GifList();
	giflist.fetch().done(function() {

		// mdi-action-open-with or mdi-image-crop-free or mdi-navigation-fullscreen
		// 			mdi-navigation-fullscreen-exit
		// mdi-action-get-app
		// mdi-action-delete
		// mdi-action-favorite
		// mdi-action-favorite-outline
		// mdi-av-play-arrow
		// mdi-av-pause
		// mdi-hardware-keyboard-arrow-left
		// mdi-hardware-keyboard-arrow-right
		// mdi-social-share
		
		var menu = "<ul class='menu'>";
		menu += "<li><a href='#0' class='mdi-action-open-with'></li>";
		menu += "<li><a href='#0' class='mdi-social-share'></li>";
		menu += "<li><a href='#0' class='mdi-action-favorite-outline'></li>";
		menu += "<li><a href='#0' class='mdi-action-delete'></li>";
		menu += "</ul>";
		
		giflist.each(function(gif, i) {
			$('#gif_list').append('<div class="item" data-w="300" data-h="400"><img src="'+gif.attributes.Gif.url+'">'+menu+'</div>');
		});

		$('#gif_list').flexImages({
			rowHeight: 300
		});
	});

	var gifinput = new GifInput({model: new Gif()});
	var documentview = new DocumentView();

	//$('select').material_select();
	$('.subnavigation').pushpin({ 
		top: $('.subnavigation').offset().top,
	});
});

$('#gif_list .item').on('click', function() {
	console.log("TEST");
});


