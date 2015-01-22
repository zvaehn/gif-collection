var app = app || {};
	
var self = this;
this.collection = new app.GifCollection();

this.collection.fetch().done(function(){
	new app.GifCollectionView({collection: self.collection});
});

new app.DocumentView({collection: self.collection});	 

$(document).ready(function(){
	$('.parallax').parallax();
    $('.button-collapse').sideNav();

    $('#global-zeroclipboard-html-bridge').on('mouseover', function() {
    	$('.zeroclipboard-is-hover').parents('.menu').show();
    });

    $('#global-zeroclipboard-html-bridge').on('mouseout', function() {
    	$('.zeroclipboard-is-hover').parents('.menu').hide();
    });
});


