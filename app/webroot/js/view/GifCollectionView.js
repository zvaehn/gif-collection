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
	},

	render: function(){
		$('#gif_list_preloader').fadeOut();

		console.log(this.collection.length);
		
		if(this.collection.length > 0) {
			var self = this;
			this.collection.each(function(item){
				self.renderModel(item);
			});
			
			$('#gif_list').flexImages({
				rowHeight: 300
			});
		}
		else {
			$('#gif_list').html('<i class="mdi-alert-warning"></i> You dont have any gifs yet.');
		}
	},

	addModel: function(){
		this.undelegateEvents();
		var url = $('#gif_input').val();
		$('#gif_input').val('');
		this.collection.add(new app.GifModel({Gif:{url: url}}));
		this.collection.last().save();
		this.renderModel(this.collection.last());

		$('#gif_list').flexImages({
			rowHeight: 300
		});

		toast("Successfully added your gif.", 3000);
	},

	renderModel: function(item) {
		this.View = new app.GifModelView({model: item});
		this.$el.prepend(this.View.render().el);
	}

});