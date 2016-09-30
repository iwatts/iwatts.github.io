angular.module("app",['ionic']).controller("ContentController", ContentController);

function ContentController($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
}

