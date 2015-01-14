var app = app || {};

app.GifModelView = Backbone.View.extend({
		tagName: 'li',
		template: $('#gifTemplate').html(),  		
		
		initialize: function() {
		},
		render: function(){
			var tmpl = _.template(this.template);
			this.$el.html(tmpl(this.model.attributes.Gif))
	    	return this;
	  	},
	});