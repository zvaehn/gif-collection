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

		/*var date = new Date();
		// 2015-01-23 21:26:15
		var time_string = date.getFullYear()+"-"+date.getMonth()
*/
		this.collection.add(new app.GifModel({
			Gif:{
				url: url,
			}
		}));

		this.collection.last().save(/*{
			success: function(model, response, options) {
				if(response.status == "ok") {
					console.log(response.message);
				}
				else {
					toast('Unable to add this URL.', 3000);
				}
			},
			error: function(model, response, options) {
				console.log(response);	
			}*/
		/*}*/);
		this.renderModel(this.collection.last());

		iso.isotope('reloadItems');
		iso.isotope({
			sortBy : 'created_at',
    		sortAscending: true
		});

		toast("Successfully added your gif.", 3000);
	},

	renderModel: function(item) {
		this.View = new app.GifModelView({model: item, collection: this.collection});

		iso.append(this.View.render().el).isotope('appended', this.View.render().el);
		//this.$el.prepend(this.View.render().el);
	}

});