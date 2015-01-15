var app = app || {};

app.GifModel = Backbone.Model.extend({
	url: function() {
		var base = '/gifs';
		if (this.isNew())return base;
		return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
	},

	initialize: function() {
    	this.set({'id': this.get('Gif').gif_id})
    },

	
});