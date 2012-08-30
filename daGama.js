;(function ( $, window, undefined ) {

  var daGama = 'daGama',
      document = window.document,
      defaults = {
        items: "li > a",
        speed: 1200,
        menuHeight: 85,
        easingFunction: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        }
      };

  function DaGama( element, options ) {
    this.element = element;
    this.options = $.extend( {}, defaults, options) ;
    this._defaults = defaults;
    this._name = daGama;
    this.init();
  }

  DaGama.prototype.init = function () {

    // variable soup
    var nav = this.element;
    var options = this.options;
    var links = $(nav).find(options.items);
    var linkLength=links.length;

    //making all the click events
   links.on('click', function(e) {
      var target = $(this).attr('href');
      slide(target);
      e.preventDefault();
    });
   // The slide magic.
    function slide(id){
      $('html,body').animate({scrollTop: ($(id).offset().top - options.menuHeight)},  options.speed, options.easingFunction);
    }

    // updating the nav active section.
    function showNavItems() {
      for(var i=0; i<linkLength; i++) {
        var id = $(links[i]).attr('href');
        var cLink = $(id).offset().top - $(window).scrollTop() - options.menuHeight;
        if (cLink < 100){
          $active = id;
        }
      }
      $(links).removeClass('active');
      $(nav).find('a[href=' + $active + ']').addClass('active');
    }
    //Poll the scroll!
    $(window).scroll(function() {
      showNavItems();
    });
  };

  $.fn[daGama] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + daGama)) {
        $.data(this, 'plugin_' + daGama, new DaGama( this, options ));
      }
    });
  }

}(jQuery, window));