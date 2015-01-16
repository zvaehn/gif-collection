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
		//erstellt automatisch ein delete request auf /gifs/gif_id
		console.log("deleting...");
		console.log(this.model);
		this.model.destroy();
		//die model view muss noch vom dom gelöscht werde
		//glaube mit this.remove();
	},

	toggle_favorite: function() {
		this.model.set({isFavorites: true})
		// erstellt automatisch ein put request auf /gifs/gif_id
		this.model.save();
	},
	
	create: function(){
		//this.model.set({Gif{gif_url: inputValue}})
		//erstellt automatisch einen post request auf /gifs
		//this.model.save();
	}, 

	render: function(){
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.attributes.Gif));
    	return this;
  	},


});
