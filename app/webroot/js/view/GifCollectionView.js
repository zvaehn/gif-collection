var app = app || {};

app.GifCollectionView = Backbone.View.extend({
	el: $('#gif_list'),

	initialize: function(options){
		this.collection = options.collection;
		this.render();
	},

	render: function(){
		var self = this;
		this.collection.each(function(item){
			self.renderModel(item);
		});
		$('#gif_list').flexImages({
			rowHeight: 300
		});
	},

	renderModel: function(item) {
		this.View = new app.GifModelView({model: item});
		this.$el.append(this.View.render().el);
	}

});