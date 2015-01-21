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
		this.model.set({action: "favorite", payload: { isFavorite: !this.model.get('Gif').is_favorite}});
		this.model.save(null,{
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
