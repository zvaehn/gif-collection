var app = app || {};

app.GifModelView = Backbone.View.extend({
	tagName: 'div',
	attributes: {
		class: 'item', 
		'data-w': '300', 
		'data-h': '400',
		//'data-gif_id': this.model.attributes.Gif.gif_id
	},
	template: $('#gifTemplate').html(),  	
	
	events: {
		'click .mdi-action-favorite-outline': 'addToFavorites',
		'click .mdi-action-delete': "deleteModel"
	},

	initialize: function() {
		
	},

	addToFavorites: function(){
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