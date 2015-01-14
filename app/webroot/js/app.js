$(function(){

	var gif_attributes = { 
		gif_id: null,
		user_id: null,
		url: 'invalid URL',
		created_at: new Date()
	};

	// Backbone Models
	var Gif = Backbone.Model.extend({
		idAttribute: 'Gif.gif_id',
		url: 'gifs',
		/*url: "gifs/"+this.attributes.Gif.gif_id,
		urlRoot: function() {
			if (this.isNew()){
				console.log("model is new.");
     		 	return "";
    		} 
    		else {
    			console.log("model isnt new.");
      			return "/gifs/" + this.Gif.gif_id;
    		}
		},*/

    	defaults: {
			Gif: gif_attributes,
		},
		copy_to_clipboard: function() {
			toast("copied to clipboard", 3000);
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
		model: Gif,
  		//id: 'gif-wrapper',
		//className: 'gif-container',
		initialize: function() {
			this.render();
		},
		//template: _.template('<% _.each(collection, function(model) { %> %><div class="item" data-w="300" data-h="400"><img src="<%= model.Gif.url %>"></div> <% });'),
		template: _.template('TEST'),
		//template: _.template('<% _.each(collection, function(model) { %> a <% });'),
		events: {
			'click .mdi-social-share': 'copy_to_clipboard',
		},
		copy_to_clipboard: function(e) {
			console.log("i was here");
			this.model.copy_to_clipboard();
		},
		render: function(){
	    	this.$el.html(this.template('_TEST'));
	    	//console.log(this.model.toJSON());
	    	//this.$el.html(this.template({collection: this.collection.toJSON()}));
	    	return this;
	  	},
	});

	// Backbone Collections
	var GifList = Backbone.Collection.extend({
		//model: Gif
  		url: '/gifs',
  		/*template: _.template('<% _.each(collection, function(model) { %> %><div class="item" data-w="300" data-h="400"><img src="<%= model.Gif.url %>"></div> <% })'),
		render: function(){
	    	//this.$el.html(this.template('<img src="'+this.model.get('Gif').url+'">'));
	    	//console.log(this.model.toJSON());
	    	this.$el.html(this.template(this.model.toJSON()));
	    	return this;
	  	}*/
	});


	// Application 
	var giflist = new GifList();
	giflist.fetch().done(function() {		
		var menu = "<ul class='menu'>";
		menu += "<li><button class='mdi-file-attachment clipboard-button tooltipped' data-position='bottom' data-tooltip='I am tooltip' data-clipboard-text='TEST'></button></li>";
		menu += "<li><button class='mdi-image-crop-free'></button></li>";
		menu += "<li><button class='mdi-action-favorite-outline toggable'></button></li>";
		menu += "<li><button class='mdi-action-delete'></button></li>";
		menu += "</ul>";

		giflist.each(function(gif, i) {
			$('#gif_list').append('<div class="item" data-w="300" data-h="400" data-gif_id="'+gif.attributes.Gif.gif_id+'"><img src="'+gif.attributes.Gif.url+'">'+menu+'</div>');
			//$('#gif_list').append(gif.el);
			console.log(gif.el);
		});

		$('#gif_list').flexImages({
			rowHeight: 300
		});
	});

	var gifinput = new GifInput({model: new Gif()});
	var documentview = new DocumentView();
	
	var mygif = new Gif({Gif: {gif_id: 3}});

	console.log(mygif);


	//$('select').material_select();
	/*$('.subnavigation').pushpin({ 
		top: $('.subnavigation').offset().top,
	});*/
});


//$('.tooltipped').tooltip({"delay": 50});

var client = new ZeroClipboard($(".clipboard-button"));

$(".button-collapse").sideNav();

client.on("ready", function(readyEvent) {
  client.on("aftercopy", function( event ) {
    // `this` === `client`
    // `event.target` === the element that was clicked
    event.target.style.display = "none";
    alert("Copied text to clipboard: " + event.data["text/plain"]);
  });
});


