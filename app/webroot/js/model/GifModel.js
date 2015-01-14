var app = app || {};

app.GifModel = Backbone.Model.extend({
	url: function() {
		var base = '/gifs';
		if (this.isNew())return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.attributes.model._id;
		return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.attributes.model._id;
	},
	idAttribute: '_id'
});