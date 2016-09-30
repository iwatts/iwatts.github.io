(function(){

    // this CREATES the myApp module (because it has the second, array parameter)
    angular.module('myApp', [
        /* listed imported modules here */
        'mainAppModule',
        'navModule',
        'listModule',
        'ui.router',
        'ngStorage'
    ]);

})();

(function( $ ) {

    var $container = $('.masonry-container');
    $container.masonry({
        columnWidth: '.item',
        itemSelector: '.item'
    });
    //console.log("Masonry running");

})(jQuery);
