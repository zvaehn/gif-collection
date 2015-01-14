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
		'click .clipboard-button': 'copy_to_clipboard',
		'click .favorite': 'toggle_favorite',
		'click .delete': 'delete',
	},

	copy_to_clipboard: function() {
		this.model.copy_to_clipboard();
	},

	delete: function() {
		this.model.delete();
	},

	toggle_favorite: function() {
		console.log("test");
	},
	
	create: function(){
		this.model.create();
	}, 

	render: function(){
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.attributes.Gif));
    	return this;
  	},


});