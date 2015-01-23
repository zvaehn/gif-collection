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

$(document).ready(function(){
	$('.parallax').parallax();
    $('.button-collapse').sideNav();

    $('#global-zeroclipboard-html-bridge').on('mouseover', function() {
    	$('.zeroclipboard-is-hover').parents('.menu').show();
    });

    $('#global-zeroclipboard-html-bridge').on('mouseout', function() {
    	$('.zeroclipboard-is-hover').parents('.menu').hide();
    });


    $('.gallery-controls .left-control').on('click', function() {
        var _this = $('.gallery-view .active'); // our clicked element

        // Is there a prev alement?
        if(_this.prev().length > 0) {
            $(_this).removeClass('active');
            $(_this).prev( ).addClass('active');    
        }

        // Is there a next element?
        if(_this.prev( ).next( ).length > 0) {
            $('.gallery-controls .right-control').fadeIn('fast');
        }
        
        // Are there 2 previous elements?
        if(_this.prev().prev().length > 0) {
            $(this).fadeIn('fast');
        }
        else {
            $(this).fadeOut('fast');
        }
    });

    $('.gallery-controls .right-control').on('click', function() {
        var _this = $('.gallery-view .active');

        if(_this.next( ).length > 0) {
            $(_this).removeClass('active');
            $(_this).next( ).addClass('active');
        }

        if(_this.next( ).prev( ).prev().length > 0) {
            $('.gallery-controls .left-control').fadeIn('fast');
        }

        if(_this.next( ).next( ).next().length > 0) {
            $(this).fadeIn('fast');
        }
        else {
            $(this).fadeOut('fast');
        }
    });
});
