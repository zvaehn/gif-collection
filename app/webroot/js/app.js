var app = app || {};
	
var self = this;
this.collection = new app.GifCollection();

this.collection.fetch().done(function(){
	new app.DocumentView({collection: self.collection});
});


app.GlobalEventHandler = _.extend({}, Backbone.Events);