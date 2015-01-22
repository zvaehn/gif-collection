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
		'click .clipboard-button': 'copyToClipboard',
		'click .favorite': 'toggleFavorites',
		'click .delete': 'deleteModel',
	},

	initialize: function() {
		
	},
	
	copyToClipboard: function(){
		var client = new ZeroClipboard( document.getElementById("copy-button") );

		client.on( "ready", function( readyEvent ) {
 		 // alert( "ZeroClipboard SWF is ready!" );

  client.on( "aftercopy", function( event ) {
    // `this` === `client`
    // `event.target` === the element that was clicked
    event.target.style.display = "none";
    alert("Copied text to clipboard: " + event.data["text/plain"] );
  } );
} );
	},

	toggleFavorites: function(){
		var self = this;
		this.model.set({action: "favorite", payload: { isFavorite: !this.model.get('Gif').is_favorite}});
		this.model.save(null,{
			success: function(model, response, options) {
				self.model.attributes.Gif.is_favorite = !self.model.attributes.Gif.is_favorite;
				self.$el.html(_.template(self.template)(self.model.attributes.Gif));
				toast("Toggled favorite.", 3000);
			},
			error: function(model, response, options) {
				toast(response.message, 3000);
			}
		});
	},

	deleteModel: function() {
		this.model.destroy();
		this.$el.fadeOut('slow',function(){
			this.remove();
		});
		//this.remove();
		toast("Successfully deleted your gif.", 3000);
	},

	render: function(){
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.attributes.Gif));
    	return this;
  	},


});
