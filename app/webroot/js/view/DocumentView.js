var app = app || {};

app.DocumentView = Backbone.View.extend({
	el: $('.container'),

	events: {
		'click .gif_add': 'addModel',
		'keyup #gif_input': 'keyStrokeEventHandler',
		'click #gif_input_wrapper .toggle_options': 'toggle_options',
		'click #filter_favorites': 'filter_favorite',
		'click #order_by_newest': 'order_creationdate_desc',
		'click #order_by_oldest': 'order_creationdate_asc',
		
	},	
	
	initialize: function(options) {
		this.collection = options.collection;
		this.render();
	},

	keyStrokeEventHandler: function(event){
		if(event.keyCode == 13){
			this.addModel();
		}
		event.preventDefault();
	},

	toggle_options: function(event) {
		$('#gif_input_wrapper .toggle_options i').toggleClass('expanded');
		$('#option_panel').slideToggle('fast');
	},

	order_creationdate_asc: function() {
		this.collection.comparator = function(model, model2) {
		    return model.get('Gif').created_at < model2.get('Gif').created_at;
		}

		this.collection.sort();
		this.view = new app.GifCollectionView({collection: this.collection});
		$('#gif_list').html('');
		this.view.render();
	},

	order_creationdate_desc: function() {
		this.collection.comparator = function(model, model2) {
		    return model.get('Gif').created_at > model2.get('Gif').created_at;
		}

		this.collection.sort();
		this.view = new app.GifCollectionView({collection: this.collection});
		$('#gif_list').html('');
		this.view.render();
	},

	filter_favorite: function() {
		$('.mdi-action-favorite-outline').parents('.item').fadeOut('slow');

		$('#gif_list').flexImages({
			rowHeight: 300
		});
	},

	addModel: function() {
		app.GlobalEventHandler.trigger('addModel');
	},

	render: function(){
		new app.GifCollectionView({collection: this.collection})
  	},
});