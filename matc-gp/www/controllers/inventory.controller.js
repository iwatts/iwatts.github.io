/**
 * Created by isaacwatts on 9/15/16.
 */
(function(){

  angular.module('starter')
      .controller('invController', invController);

  function invController(Looting, User) {

    // variables
    var fl = this;
    fl.playerData = User.playerData;
    
    fl.newloot = newLoot;
    
    
    function newLoot() {
      Looting.getLoot();
    }
  }

})();
