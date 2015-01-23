var app = app || {};

app.GifModelView = Backbone.View.extend({
	tagName: 'div',

	attributes: {
		class: 'item', 
		//'data-gif_id': this.model.attributes.Gif.gif_id
	},

	template: $('#gifTemplate').html(),  	
	
	events: {
		//'click .clipboard-button': 'copyToClipboard', --> see copyToClipboard commentary
		'click .favorite': 'toggleFavorites',
		'click .delete': 'deleteModel',
		'click .open-gallery': 'openGallery',
		'click .close-gallery': 'closeGallery',
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

	deleteModel: function(event) {
		
		/*this.$el.fadeOut('slow',function(){
			this.remove();
		});*/
		//this.remove();
		
		//toast("Successfully deleted your gif.", 1000);

		var collection = this;

		iso.isotope('remove', $(event.target).parents('.item') ).isotope('layout');

		this.$el.fadeOut('slow', 
			toast(
				'Gif deleted <a class="btn-flat yellow-text" id="gif_undo_delete" data-gif-id="'+collection.model.id+'" href="#">Undo<a>', 
				5000,
				'',
				function() {
					// delete action
					collection.model.destroy();
					collection.remove();
					$('#gif_list').isotope('reloadItems');
				}
			)
		);
	},

	restoreModel: function() {
		// add the model to the collecton
		// display on dom again
	},

	openGallery: function(event){
		var self = this;
		
		this.lastModel = null;

		// Remove the flex-image class and add gallery-view
		$('.gif_wrapper').removeClass('list-view').addClass('gallery-view');

		// Remove all inline css styles from flex-image
		$('.gif_wrapper .item').removeAttr('style');

		// Add the .active class to our event target
		$(event.target).parents('.item').addClass('active');

		// Display and initialize the controls
		if($(event.target).parents('.item').prevUntil(':visible').length > 0) {
			$('.gallery-controls .left-control').fadeIn('fast');
		}
		else {
			$('.gallery-controls .left-control').hide();	
		}

		if($(event.target).parents('.item').nextUntil(':visible').length > 0) {
			$('.gallery-controls .right-control').fadeIn('fast');
		}	
		else {
			$('.gallery-controls .right-control').hide();	
		}	
	},

	closeGallery: function(event) {
		$('.gif_wrapper').removeClass('gallery-view');
		$('.gif_wrapper').addClass('list-view');

		// Remove the .active class from our event target
		$(event.target).parents('.item').removeClass('active');

		// Recalculate our images with fleximages
		/*$('#gif_list').flexImages({
			rowHeight: 300
		});*/

		iso.isotope('reloadItems');

		iso.isotope({
			sortBy : 'created_at',
    		sortAscending: true
		});
	},

	render: function(){
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.attributes.Gif));
    	return this;
  	},
});
