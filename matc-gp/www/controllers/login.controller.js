 (function() {
  angular.module('starter')
    .controller('loginController', loginController);

  function loginController(User, Game, Looting, $state, $ionicPopup) {
    // component properties
    var vm = this;
    vm.showLogin = false;
    vm.email = undefined;
    vm.password = undefined;
    vm.displayName = User.displayName;
    vm.errorMessage = undefined;
    vm.playerData = [];

    // component functions
    vm.showEmailLogin = showEmailLogin;
    vm.login = login;
    vm.loginWithEmail = loginWithEmail;
    vm.logout = logout;
    vm.gameStart = gameStart;
    vm.getLoot = getLoot;
    vm.loadGame = loadGame;
    vm.showConfirm = showConfirm;
    vm.loadConfirm = loadConfirm;


    function showEmailLogin() {
      vm.showLogin = !vm.showLogin;
    }

    function login(provider) {
      vm.errorMessage = undefined;
      if (provider === 'facebook') {
      }
      User.login(provider)
        .then(function () {
          vm.displayName = User.displayName;
          vm.showLogin = false;
        });
    }

    function loginWithEmail() {
      vm.errorMessage = undefined;
      User.loginWithEmail(vm.email, vm.password)
        .then(function () {
          if (User.displayName) {
            vm.displayName = User.displayName;
            vm.showLogin = false;
            vm.password = undefined;
          } else {
            vm.errorMessage = "Error. Please try again.";
          }
        }, function (error) {
          vm.errorMessage = error.message;
        });
    }

    function logout() {
      User.logout();
      vm.displayName = undefined;
    }

    function gameStart() {
      //console.log("send request to service");
      //Game.gameStart();
      if (!User.playerData) {
        console.log('No player data.');
        $state.go('app.homebase');
      }
      else {
        console.log(User.playerData);
        vm.showConfirm();
      }
    }

    function showConfirm() {
      console.log('This is after show confirm.');
      var confirmPopup = $ionicPopup.confirm({
        title: 'Create New Game?',
        template: 'Are you sure you want to overwrite your existing game with a new game?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          //reset game and go to game screen
          console.log('Yes I want to overwrite my existing game and start a new game.');
          $state.go('app.homebase');
        } else {
          //leave them there.
          console.log('No, I do not want to start a new game.');
        }
      });
    }

    function loadGame() {
      if (User.playerData) {
        console.log('After player data.');
        //go to game screen(homebase JS).
        vm.loadConfirm();
      }
      else {
        console.log(User.playerData)
      }
    }

    function loadConfirm() {
      console.log('This is after they click Load Game.');
      var confirmPopup = $ionicPopup.confirm({
        title: 'Load Game?',
        template: 'Are you sure you want to load your game?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          //Go to game screen
          console.log('Yes I want to load my game.');
          $state.go('app.homebase');
        } else {
          //Leave them there.
          console.log('No, I do not want to load a new game.');
        }
      });
    }

    function getLoot() {
      Looting.getLoot();
    }
  }
})();
