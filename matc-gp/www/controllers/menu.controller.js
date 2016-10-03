/**
 * Created by isaacwatts on 9/15/16.
 */
(function(){

  angular.module('starter')
    .controller('menuController', menuController);

  function menuController(locationList, User) {
    // variables
    var menu = this;
    menu.inventory=User.playerData;

    menu.navigation = locationList.locations;
  }
})();
