(function () {

  angular.module('starter')
    .service('Game', Game);

  function Game($state, User) {

    // User properties
    var self = this;

    self.gameStart = gameStart;
    self.loadGame = loadGame;

    function gameStart() {
      //If game exists, prompt to start new game.
      console.log("request received.");
    }

    function loadGame() {
      
    }

  }
})();
