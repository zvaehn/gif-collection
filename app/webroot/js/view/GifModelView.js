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
				
		var collection = this;

		toast("Deleted gif.", 2000);

		iso.isotope('remove', $(event.target).parents('.item') ).isotope('layout');

		collection.model.destroy();
		collection.remove();
		

		/*this.$el.fadeOut('slow', 
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
		);*/
	},

	restoreModel: function() {
		// add the model to the collecton
		// display on dom again
	},

	openGallery: function(event){
		var self = this;

		$('html, body').animate({ scrollTop: 0 }, 500);

		// Disable sort and filter panel
		$('#gif_input_wrapper .toggle_options i').removeClass('expanded');
		$('#gif_input_wrapper .toggle_options').addClass('disabled');
		$('#option_panel').slideUp('fast');

		// Remove the flex-image class and add gallery-view
		$('.gif_wrapper').removeClass('list-view').addClass('gallery-view');

		// Remove all inline css styles from flex-image
		//$('.gif_wrapper .item').removeAttr('style');

		// Add the .active class to our event target
		$(event.target).parents('.item').addClass('active');

		// Save the top offset so we can scroll down there later
		$(event.target).parents('.item').data('offset-top', $(event.target).parents('.item').css('top'));

		// Display and initialize the controls
		if($(event.target).parents('.item').prevUntil().length > 0) {
			$('.gallery-controls .left-control').fadeIn('fast');
		}
		else {
			$('.gallery-controls .left-control').hide();	
		}

		if($(event.target).parents('.item').nextUntil().length > 0) {
			$('.gallery-controls .right-control').fadeIn('fast');
		}	
		else {
			$('.gallery-controls .right-control').hide();	
		}	
	},

	closeGallery: function(event) {

		$('.gif_wrapper').removeClass('gallery-view');
		$('.gif_wrapper').addClass('list-view');

		$('#gif_input_wrapper .toggle_options').removeClass('disabled');

		// Remove the .active class from our event target
		$(event.target).parents('.item').removeClass('active');

		$('html, body').animate({
			scrollTop: $(event.target).parents('.item').data('offset-top')//.offset().top
    	}, 500);

		$(event.target).parents('.item').removeData('offset-top');
	},

	render: function(){
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.attributes.Gif));
    	return this;
  	},
});
