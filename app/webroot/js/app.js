$(function(){

	// Backbone Models
	var Gif = Backbone.Model.extend({
		urlRoot: '/gifs',
		/*initialize: function(){
        	this.fetch();
    	}*/
    	defaults: {
			Gif: {
				id: null,
				user_id: null,
				url: null,
				created_at: new Date()
			}
		}
	}); 

	// Backbone Views
	var MainView = Backbone.View.extend({
		el: "body",
		events: {
			'click #gif_add': 'gif_add',
		},
		gif_add: function(){
			alert("You clicked me");
			console.log("You clicked me.");
		},
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
  		url: '/gifs'
	});


	var giflist = new GifList();
	giflist.fetch().done(function() {
		giflist.each(function(gif) {
			console.log(gif.attributes.Gif.url);
		});
	});

	var gifitem = new Gif({id: 1});
	gifitem.fetch().done(function() {
		var gifview = new GifView({ 
			model: gifitem
		});

		gifview.render();

		console.log(gifview.el);
	});
	
	

});