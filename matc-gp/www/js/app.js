// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
    myAppRun();
  })

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'menuController'
    })

    .state('login',{
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'loginController',
      controllerAs: 'vm'
    })

     .state('app.locations', {
      url: "/locations",
       views: {
         'menuContent': {
           templateUrl: "templates/locations.html",
           controller: 'locationListController',
           controllerAs: 'loc'
         }
       }
    })

     .state('app.homebase', {
      url: "/homebase",
       views: {
         'menuContent': {
           templateUrl: "templates/homebase.html",
           controller: 'homebaseController'
         }
       }
    })

    .state('app.inventory', {
      url: "/inventory",
      views: {
        'menuContent': {
          templateUrl: "templates/inventory.html",
          controller: 'invController',
          controllerAs: 'fl'
        }
      }
    });

   $urlRouterProvider.otherwise('/login');
});

function myAppRun() {
    var config = {
        apiKey: "AIzaSyD8yymwpm2Vdn3-iZ_xhDqSpyuqzlKNTSo",
        authDomain: "matc-gp.firebaseapp.com",
        databaseURL: "https://matc-gp.firebaseio.com",
        storageBucket: "matc-gp.appspot.com"
    };
    firebase.initializeApp(config);
}
