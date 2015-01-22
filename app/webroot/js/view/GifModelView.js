var app = app || {};

app.GifModelView = Backbone.View.extend({
	
	initialize: function() {
		var self = this;
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
		//'click .clipboard-button': 'copyToClipboard', --> see copyToClipboard commentary
		'click .favorite': 'toggleFavorites',
		'click .delete': 'deleteModel',
	},

	initialize: function() {
		
	},
	
	/*
	we dont need this function cuz the zeroclipboard has already an click event handler
	 */
	/*
	copyToClipboard: function(event) {
		var button_id = event.target.id;
	},*/

	toggleFavorites: function(){
		var self = this;
		this.model.set({action: "favorite", payload: { isFavorite: !this.model.get('Gif').is_favorite}});
		this.model.save(null,{
			success: function(model, response, options) {
				self.model.attributes.Gif.is_favorite = !self.model.attributes.Gif.is_favorite;
				self.$el.html(_.template(self.template)(self.model.attributes.Gif));
				toast("Toggled favorite.", 1000);
			},
			error: function(model, response, options) {
				toast(response.message, 1000);
			}
		});
	},

	deleteModel: function() {
		this.model.destroy();
		this.$el.fadeOut('slow',function(){
			this.remove();
		});
		//this.remove();
		
		toast("Successfully deleted your gif.", 1000);

		
	},

	render: function(){
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.attributes.Gif));
    	return this;
  	},


});
