var app = app || {};

app.GifCollectionView = Backbone.View.extend({
	el: $('#gif_list'),

	initialize: function(options){
		app.GlobalEventHandler = _.extend({}, Backbone.Events);
		var self = this;
		this.collection = options.collection;
		this.render();
		app.GlobalEventHandler.on('addModel',function(){
			self.addModel();
		});
		this.listenTo(this.collection,'add', function(model){
			model.save();
		})
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

	addModel: function(){
		this.undelegateEvents();
		var url = $('#gif_input').val();
		$('#gif_input').val('');
		this.collection.add(new app.GifModel({Gif:{url: url}}))
		this.renderModel(this.collection.last());
		$('#gif_list').flexImages({
			rowHeight: 300
		});

		toast("Successfully added your gif.", 3000);
	},

	renderModel: function(item) {
		this.View = new app.GifModelView({model: item});
		this.$el.append(this.View.render().el);
	}

});