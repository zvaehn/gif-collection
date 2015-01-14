var app = app || {};
	
	var self = this
	this.collection = new app.GifCollection();

	this.collection.fetch().done(function(){
		new app.GifCollectionView({collection: self.collection})
	});
	 
