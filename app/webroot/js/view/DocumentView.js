var app = app || {};

app.DocumentView = Backbone.View.extend({
	el: $('.container'),

	events: {
		'click .gif_add': 'addModel',
	},	
	
	initialize: function(options) {
		this.collection = options.collection;
		this.render();
	},
	addModel: function() {
		var url = $('#gif_input').val();
		this.collection.add(new app.GifModel({url: url}))
		this.render();
	},
	render: function(){
		new app.GifCollectionView({collection: this.collection})
  	},


});