/**
 * Created by isaacwatts on 9/15/16.
 */
(function(){

  angular.module('starter')
    .controller('menuController', menuController);

  function menuController(locationList) {
    // variables
    var loc = this;

    loc.navigation = locationList.locations;
  }
})();
