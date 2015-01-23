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
		'click #gif_undo_delete': 'restoreModel',
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

		if($('#gif_input_wrapper .toggle_options').hasClass('disabled')) {
			return;
		}
		else {
			$('#gif_input_wrapper .toggle_options i').toggleClass('expanded');
			$('#option_panel').slideToggle('fast');
		}
	},

	order_creationdate_asc: function() {
		/*this.collection.comparator = function(model, model2) {
		    return model.get('Gif').created_at < model2.get('Gif').created_at;
		}

		this.collection.sort();
		this.view = new app.GifCollectionView({collection: this.collection});
		$('#gif_list').html('');
		this.view.render();*/

		//$container.isotope({ sortBy : 'created_at' });

		iso.isotope({
    		sortBy : 'created_at',
    		sortAscending: false 
    	});
	},

	order_creationdate_desc: function() {
		/*this.collection.comparator = function(model, model2) {
		    return model.get('Gif').created_at > model2.get('Gif').created_at;
		}

		this.collection.sort();
		this.view = new app.GifCollectionView({collection: this.collection});
		$('#gif_list').html('');
		this.view.render();*/

		iso.isotope({
    		sortBy : 'created_at',
    		sortAscending: true
    	});
	},

	filter_favorite: function(event) {
		//$('.mdi-action-favorite-outline').parents('.item').fadeOut('slow');

		var _this = event.target;

		if($(_this).is(':checked')) {
			iso.isotope({ 
				filter: function() {
				    return $(this).find('.menu .mdi-action-favorite').length;
				}
			});			
		}
		else {
			iso.isotope({ 
				filter: '*'
			});	
		}
	},

	restoreModel: function(e, el) {
		console.log(e);
		console.log(el);
		console.log(this);

		app.GlobalEventHandler.trigger('restoreModel');
	},

	addModel: function() {
		app.GlobalEventHandler.trigger('addModel');
	},

	render: function(){
		new app.GifCollectionView({collection: this.collection})
  	},
});