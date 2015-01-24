var app = app || {};
	
var self = this;
this.collection = new app.GifCollection();

this.collection.fetch().done(function(){
	new app.GifCollectionView({collection: self.collection});
});

iso = $('#gif_list');

iso.isotope({
    itemSelector: '.item',
    layoutMode: 'fitRows',
    getSortData: {
        created_at: function(el) {
            return  $(el).find('[data-created-at]').val();
        },
    },
});

new app.DocumentView({collection: self.collection});	 


(function ($) {
    $.fn.inlineStyle = function (prop) {
        return this.prop("style")[$.camelCase(prop)];
    };
}(jQuery));


$(document).ready(function(){
	$('.parallax').parallax();
    $('.button-collapse').sideNav();

    $('#global-zeroclipboard-html-bridge').on('mouseover', function() {
    	$('.zeroclipboard-is-hover').parents('.menu').show();
    });

    $('#global-zeroclipboard-html-bridge').on('mouseout', function() {
    	$('.zeroclipboard-is-hover').parents('.menu').hide();
    });


    // You can break this shit if you click faster then the fadeOut()
    $('.gallery-controls .left-control').on('click', function() {
       
        var _this = $('.gallery-view .active');
        var gallery = $('.gallery-view #gif_list').children();
        var left_control = $('.gallery-controls .left-control');
        var right_control = $('.gallery-controls .right-control');

        $(_this).removeClass('active');

        _this = $(_this).prev();
        _this.addClass('active');

        console.log("index: "+_this.index());

        // Not First element
        if(_this.index() > 0) {
            left_control.fadeIn('fast');
        }
        else {
            left_control.fadeOut('fast');
        }

        // Not Last element
        if(_this.index() < gallery.length) {
            right_control.fadeIn('fast');
        }
        else {
            right_control.fadeOut('fast');
        }
    });

    // You can break this shit if you click faster then the fadeOut()
    $('.gallery-controls .right-control').on('click', function() {

        var _this = $('.gallery-view .active');
        var gallery = $('.gallery-view #gif_list').children();
        var left_control = $('.gallery-controls .left-control');
        var right_control = $('.gallery-controls .right-control');

        $(_this).removeClass('active');

        _this = $(_this).next();
        _this.addClass('active');

        console.log("index: "+_this.index());

        // Not First element
        if(_this.index() > 0) {
            left_control.fadeIn('fast');
        }
        else {
            left_control.fadeOut('fast');
        }

        // Not Last element
        if(_this.index()+1 < gallery.length) {
            right_control.fadeIn('fast');
        }
        else {
            right_control.fadeOut('fast');
        }
    });
});
