var app = app || {};

app.DocumentView = Backbone.View.extend({
	el: $('.container'),

	events: {
		'click .gif_add': 'addModel',
		'keyup #gif_input': 'keyStrokeEventHandler'
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

	addModel: function() {
		app.GlobalEventHandler.trigger('addModel');
	},
	render: function(){
		new app.GifCollectionView({collection: this.collection})
  	},


});