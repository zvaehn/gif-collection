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
});


/*
var client = new ZeroClipboard($(".clipboard-button"));

client.on("ready", function(readyEvent) {
  client.on("aftercopy", function( event ) {
    // `this` === `client`
    // `event.target` === the element that was clicked
    event.target.style.display = "none";
    alert("Copied text to clipboard: " + event.data["text/plain"]);
  });
});
*/




