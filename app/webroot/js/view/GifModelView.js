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

	toogleFavorites: function(){
		this.model.set({isFavorite: true});
		this.model.save();
	},

	deleteModel: function() {
		this.model.destroy();
		this.remove();
	},

	render: function(){
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.attributes.Gif));
    	return this;
  	},


});
