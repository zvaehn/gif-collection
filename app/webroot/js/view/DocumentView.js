var app = app || {};

app.DocumentView = Backbone.View.extend({
	el: $('.container'),

	events: {
		'click .gif_add': 'addModel',
		'keyup #gif_input': 'keyStrokeEventHandler',
		'click #gif_input_wrapper .toggle_options': 'toggle_options',
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
		$('#option_panel').toggle('fast');
	},

	addModel: function() {
		app.GlobalEventHandler.trigger('addModel');
	},

	render: function(){
		new app.GifCollectionView({collection: this.collection})
  	},
});