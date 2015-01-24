var app = app || {};
	
var self = this;
this.collection = new app.GifCollection();

this.collection.fetch().done(function(){
	new app.GifCollectionView({collection: self.collection});
});

// Create an isotope instance on the gif list container
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

// Our document has finished loading all the stuff.
$(document).ready(function(){
    // Make the parallax effect work
	$('.parallax').parallax();

    // Make the responsive side navigation work
    $('.button-collapse').sideNav();

    // ´*'.` magic is happening here! ´*'.`
    /*        .
                 /'
                //
            .  //
            |\//7
           /' " \
          .   . .
          | (    \     '._
          |  '._  '    '. '
          /    \'-'_---. ) )
         .              :.'
         |               \
         | .    .   .     .
         ' .    |  |      |
          \^   /_-':     /
          / | |    '\  .'
         / /| |     \\  |
         \ \( )     // /
          \ | |    // /
           L! !   // /          Monoceros'95
            [_]  L[_|           R.B.Cleary
    */
    /* The problem is: 
     * The zeroclipboard plugin uses an invisible flash video to copy content to your clipboard.
     * This element is positioned absolute.
     * Every time you hover an clipboard element, the invisible video will move under your cursor.
     * Awesome, right?
     * Not in our case, because our menu is only visible if we are hovering an .item element.
     * Just in the moment we got a focus on the flash-video, we loose the .item focus and the menu disappears.
     * So we have to make this workarround shown below:
    */
    $('#global-zeroclipboard-html-bridge').on('mouseover', function() {
    	$('.zeroclipboard-is-hover').parents('.menu').show();
    });

    $('#global-zeroclipboard-html-bridge').on('mouseout', function() {
    	$('.zeroclipboard-is-hover').parents('.menu').hide();
    });


    // Gallery switcher (left)
    $('.gallery-controls .left-control').on('click', function() {
       
        var _this = $('.gallery-view .active'); // the current active element
        var gallery = $('.gallery-view #gif_list').children(); // Our gallerie array
        var left_control = $('.gallery-controls .left-control'); // the left control button
        var right_control = $('.gallery-controls .right-control'); // the right control button

        $(_this).removeClass('active'); // remove the active class from the current item

        _this = $(_this).prev(); // our new active item is the previous
        _this.addClass('active'); // show it to the world :) !

        // Not First element
        if(_this.index() > 0) {
            left_control.show();
        }
        else {
            left_control.hide();
        }

        // Not Last element
        if(_this.index() < gallery.length) {
            right_control.show();
        }
        else {
            right_control.hide();
        }
    });

    // Gallery switcher (right)
    $('.gallery-controls .right-control').on('click', function() {

        var _this = $('.gallery-view .active'); // the current active element
        var gallery = $('.gallery-view #gif_list').children(); // Our gallerie array
        var left_control = $('.gallery-controls .left-control'); // the left control button
        var right_control = $('.gallery-controls .right-control'); // the right control button

        $(_this).removeClass('active'); // remove the active class from the current item

        _this = $(_this).next(); // our new active item is the next
        _this.addClass('active'); // show it to the world :) !

        // Not First element
        if(_this.index() > 0) {
            left_control.show();
        }
        else {
            left_control.hide();
        }

        // Not Last element
        if(_this.index()+1 < gallery.length) {
            right_control.show();
        }
        else {
            right_control.hide();
        }
    });
});
