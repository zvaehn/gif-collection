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
		}
		else {
			//$('#gif_list').html('<i class="mdi-alert-warning"></i> You dont have any gifs yet.');
		}

		// every element with the .clipboard-button class becomes a zeroclipboard
		var client = new ZeroClipboard($('.clipboard-button'));

		client.on( "aftercopy", function( event ) {
			// `this` === `client`
			// `event.target` === the element that was clicked
			toast('Copied to Clipboard.', 1000);
		});

		// News elements with this class will be automaticly registered as a ZeroClipboard object (hopefully)
		client.clip($('.clipboard-button'));

	},

	addModel: function(){
		this.undelegateEvents();
		var url = $('#gif_input').val();
		$('#gif_input').val('');

		this.collection.add(new app.GifModel({
			Gif:{
				url: url,
			}
		}));

		var _this = this;

		this.collection.last().save(null, {
			success: function(model, response, options) {
				if(response.status == "ok") {
					toast(response.message, 2000);
						
					collection.last().set({ 
						Gif: {
							created_at: model.attributes.payload.Gif.created_at,
							url: model.attributes.payload.Gif.url,
							gif_id: model.attributes.payload.Gif.gif_id,
							is_favorite: model.attributes.payload.Gif.is_favorite
						} 
					});

					_this.prependModel(collection.last());
				}
				else {
					toast(response.message, 2000);	
				}
			},
			error: function(model, response, options) {
				toast("Something went wrong!", 2000);	
				console.log(response);	
			}
		});
	},

	prependModel: function(item) {
		this.View = new app.GifModelView({model: item, collection: this.collection});
		iso.prepend(this.View.render().el).isotope('prepended', this.View.render().el);
	},

	renderModel: function(item) {
		this.View = new app.GifModelView({model: item, collection: this.collection});

		iso.append(this.View.render().el).isotope('appended', this.View.render().el);
		
		//this.$el.prepend(this.View.render().el);
	}

});