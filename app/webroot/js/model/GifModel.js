var app = app || {};

app.GifModel = Backbone.Model.extend({
	url: function() {
		var base = '/gifs';
		if (this.isNew())
			return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.attributes.Gif.gif_id;
		else
			return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.attributes.Gif.gif_id;
	},

	create: function(){
		this.set({
			Gif: {
				url: $('#gif_input').val()
			}
		});

		this.save({}, {
			success: function(model, response) {
				if(response.status == "ok") {
					$('#gif_input').val("");
					toast(response.message, 3000);

					$('#gif_list').prepend('<div class="item" data-w="300" data-h="400"><img src="'+model.attributes.Gif.url+'"></div>');

					$('#gif_list').flexImages({
						rowHeight: 300
					});
				}
				else {
					toast(response.message.url[0], 3000);
				}
			},
			error: function(model, response) {
				console.log("error");
				console.log(response);
			}
		});
	},

	delete: function() {
		console.log(this);

		this.destroy({
			success: function(model, response) {
				console.log(response);
			},
			error: function(model, response) {
				console.log(response);
			}
		});
	},

	copy_to_clipboard: function() {
		// ToDo
	},

	idAttribute: 'Gif.gif_id'
});