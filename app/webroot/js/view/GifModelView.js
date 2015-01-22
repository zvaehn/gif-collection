var app = app || {};

app.GifModelView = Backbone.View.extend({
	tagName: 'div',

	attributes: {
		class: 'item', 
		'data-w': '300', 
		'data-h': '400',
		//'data-gif_id': this.model.attributes.Gif.gif_id
	},

	template: $('#gifTemplate').html(),  	
	
	events: {
		//'click .clipboard-button': 'copyToClipboard', --> see copyToClipboard commentary
		'click .favorite': 'toggleFavorites',
		'click .delete': 'deleteModel',
		'click .mdi-image-crop-free': 'enlargeGif',
		'click .arrow-left': 'moveLeft',
		'click .arrow-right': 'moveRight'
	},

	initialize: function(options) {
		this.collection = options.collection;
	},
	
	/*
	we dont need this function cuz the zeroclipboard has already an click event handler
	 */
	/*
	copyToClipboard: function(event) {
		var button_id = event.target.id;
	},*/

	toggleFavorites: function(){
		var self = this;
		this.model.set({action: "favorite", payload: { isFavorite: !this.model.get('Gif').is_favorite}});
		this.model.save(null,{
			success: function(model, response, options) {
				self.model.attributes.Gif.is_favorite = !self.model.attributes.Gif.is_favorite;
				self.$el.html(_.template(self.template)(self.model.attributes.Gif));
				toast("Toggled favorite.", 1000);
			},
			error: function(model, response, options) {
				toast(response.message, 1000);
			}
		});
	},

	deleteModel: function() {
		
		/*this.$el.fadeOut('slow',function(){
			this.remove();
		});*/
		//this.remove();
		
		//toast("Successfully deleted your gif.", 1000);

		var collection = this;

		this.$el.fadeOut('slow', 
			toast(
				'Gif deleted <a class="btn-flat yellow-text" id="gif_undo_delete" data-gif-id="'+collection.model.id+'" href="#">Undo<a>', 
				5000,
				'',
				function() {
					// delete action
					collection.model.destroy();
					collection.remove();
				}
			)
		);
	},

	restoreModel: function() {
		// add the model to the collecton
		// display on dom again
	},

	enlargeGif: function(){
		var self = this;
		
		this.lastModel = null;
		
		$('.arrow-left').fadeIn('fast');
		$('.arrow-right').fadeIn('fast');
		
		var isFirstGif = this.collection.last() === this.model ? true : false;
		var isLastGif = this.collection.first() === this.model ? true : false;

		if(isFirstGif){
			$('.arrow-left').fadeOut('fast');
		} else if(isLastGif){
			$('.arrow-right').fadeOut('fast');
		}

		$('.blur').fadeIn('slow',function(){
			self.renderInFullScreen(self.model);
		});
		
		$('.arrow-left').on('click', function(){
			self.moveLeft(self.model);
  		});
  		
  		$('.arrow-right').on('click', function(){
			self.moveRight(self.model);
  		});
  		
  		$('.close-lightbox').on('click', function(){
			self.closeLightbox();
  		});
	},

	moveLeft:function(model){
		var self = this;
		
		$('.arrow-right').fadeIn('fast')
		
		if(this.lastModel === null) {
			currentModel = this.model;
		} else {
			currentModel = this.lastModel
		}

		var isFirstGif = this.collection.last() === currentModel ? true : false;
		var nextGifFirstGif = this.collection.last() === this.collection.at(this.collection.indexOf(currentModel)+1) ? true : false;
		var currentIndex = this.collection.indexOf(currentModel);
				
		if(isFirstGif || nextGifFirstGif ){
			$('.arrow-left').fadeOut('fast')
		} 
		var renderGif = this.collection.at(currentIndex + 1);

		$('.lightbox').fadeOut('slow',function(){
			self.renderInFullScreen(renderGif);
		});

		this.lastModel = renderGif;


	},

	moveRight:function(model){
		var self = this;
		
		$('.arrow-left').fadeIn('fast')
		
		if(this.lastModel === null) {
			currentModel = this.model;
		} else {
			currentModel = this.lastModel
		}
		
		var isLastGif = this.collection.first() === currentModel ? true : false;
		var nextGifLastGif = this.collection.first() === this.collection.at(this.collection.indexOf(currentModel)-1) ? true : false;
		var currentIndex = this.collection.indexOf(currentModel);
				
		if(isLastGif || nextGifLastGif ){
			$('.arrow-right').fadeOut('fast')
		}
		
		var renderGif = this.collection.at(currentIndex - 1);

		$('.lightbox').fadeOut('slow',function(){
			self.renderInFullScreen(renderGif);
		});

		this.lastModel = renderGif;
		this.collection.reset

	},

	closeLightbox: function(){
		$('.blur').fadeOut('slow');
		$('.lightbox').html('');
		//this.collection.reset(this.previousModels);
		$('.arrow-left').unbind('click');
  		$('.arrow-right').unbind('click');
  		$('.close-lightbox').unbind('click');

	},

	render: function(){
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.attributes.Gif));
    	return this;
  	},

  	renderInFullScreen: function(gif){
  		var self = this;
  		$('.lightbox').fadeIn('slow').html(_.template(this.template)(gif.attributes.Gif));
  		
  	}


});
