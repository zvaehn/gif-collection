var app = app || {};

app.GifCollection = Backbone.Collection.extend({
  		model: app.GifModel,
  		url: '/gifs',
	});
