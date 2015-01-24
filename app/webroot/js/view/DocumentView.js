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

	// Toggles the gif view option panel
	toggle_options: function(event) {
		if($('#gif_input_wrapper .toggle_options').hasClass('disabled')) {
			return;
		}
		else {
			$('#gif_input_wrapper .toggle_options i').toggleClass('expanded');
			$('#option_panel').slideToggle('fast');
		}
	},

	// Sorts the image collection depending on the creation date (ascending)
	order_creationdate_asc: function() {
		iso.isotope({
    		sortBy : 'created_at',
    		sortAscending: false 
    	});
	},

	// Sorts the image collection depending on the creation date (descending)
	order_creationdate_desc: function() {
		iso.isotope({
    		sortBy : 'created_at',
    		sortAscending: true
    	});
	},

	// Filters the image collection whether favorite or not
	filter_favorite: function(event) {
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
		app.GlobalEventHandler.trigger('restoreModel');
	},

	addModel: function() {
		app.GlobalEventHandler.trigger('addModel');
	},

	render: function(){
		new app.GifCollectionView({collection: this.collection})
  	},
});