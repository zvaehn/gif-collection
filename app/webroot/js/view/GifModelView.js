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
	
	initialize: function() {
		
	},
	events: function() {
		
	},
	render: function(){
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.attributes.Gif));
    	return this;
  	},


});