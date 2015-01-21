var app = app || {};

app.GifModelView = Backbone.View.extend({
	
	initialize: function() {
		
	},

	tagName: 'div',

	attributes: {
		class: 'item', 
		'data-w': '300', 
		'data-h': '400',
		//'data-gif_id': this.model.attributes.Gif.gif_id
	},

	template: $('#gifTemplate').html(),  	
	
	events: {
		'click .clipboard-button': 'copyToClipboard',
		'click .favorite': 'toggleFavorites',
		'click .delete': 'deleteModel',
	},

	initialize: function() {
		
	},
	
	copyToClipboard: function(){
		//this.model.set({isFavorite: true});
		//this.model.save();
	},

	toggleFavorites: function(){
		this.model.set({isFavorite: true});
		this.model.save({
			success: function(model, response, options) {
				console.log("success callback");
				console.log(model);
				console.log(response);
				console.log(options);
			},
			error: function(model, response, options) {
				console.log("error callback");
				console.log(model);
				console.log(response);
				console.log(options);
			}
		});
	},

	deleteModel: function() {
		this.model.destroy();
		this.remove();
		toast("Successfully deleted your gif.", 3000);
	},

	render: function(){
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.attributes.Gif));
    	return this;
  	},


});
