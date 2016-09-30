(function () {

  angular.module('starter')
    .service('User', User);

  function User($firebaseAuth, $firebaseObject, $firebaseArray, $log, $q) {

    // User properties
    var self = this;
    self.displayName = undefined; // used to determine if user is logged in
    self.playerData = [];

    // User functions
    self.login = login;
    self.loginWithEmail = loginWithEmail;
    self.logout = logout;
    self.updatePlayerData = updatePlayerData;

    var userData = JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyD8yymwpm2Vdn3-iZ_xhDqSpyuqzlKNTSo:[DEFAULT]'));
    self.displayName = userData ? userData.displayName || userData.email : undefined;
    if (self.displayName) {
      var providerUser = userData.user ? userData.user : userData;
      var ref = firebase.database().ref("users");
      var profileRef = ref.child(providerUser.uid);
      var playerDataRef = profileRef.child("playerData");
      self.playerData = $firebaseArray(playerDataRef);
    }

    // login with third-party provider
    function login(provider) {
      var auth = $firebaseAuth();
      return auth.$signInWithPopup(provider)
        .then(loginSuccess)
        .catch(loginError);
    }

    function loginWithEmail(email, password) {
      var auth = $firebaseAuth();
      return auth.$createUserWithEmailAndPassword(email, password)
        .then(function () {
          auth.$signInWithEmailAndPassword(email, password)
            .then(loginSuccess)
            .catch(loginError);
        }, function (error) {
          if (error.code == "auth/weak-password") {
            loginError(error);
          } else if (error.code === "auth/email-already-in-use") {
            auth.$signInWithEmailAndPassword(email, password)
              .then(loginSuccess)
              .catch(loginError);
          } else {
            $log.error(error);
          }
        })
        .catch(loginError);
    }

    function logout() {
      var auth = $firebaseAuth();
      $log.log(self.displayName + " has been logged out.");
      auth.$signOut();
    }

    // User private functions
    function loginSuccess(firebaseUser) {
      var deferred = $q.defer();
      $log.log(firebaseUser);

      var providerUser = firebaseUser.user ? firebaseUser.user : firebaseUser;
      var ref = firebase.database().ref("users");
      var profileRef = ref.child(providerUser.uid);
      var playerDataRef = profileRef.child("playerData");
      self.playerData = $firebaseArray(playerDataRef);
      //playerDataRef.$bindTo(self.playerData);

      self.user = $firebaseObject(profileRef);
      self.user.$loaded().then(function () {
        if (!self.user.displayName) {
          $log.log("Logging in...");
          profileRef.set({
            displayName: providerUser.displayName || providerUser.email,
            email: providerUser.email,
            photoURL: providerUser.photoURL,
            lastLogin: firebase.database.ServerValue.TIMESTAMP,
            playerData: []
          }).then(function () {
            $log.log("Logged in.");
          }, function () {
            $log.log("User could not be updated.");
          });
        } else {
          $log.log('You are now logged in.');
        }
        self.displayName = providerUser.displayName;
        deferred.resolve();
      });
      return deferred.promise;
    }

    function loginError(error) {
      $log.log("Authentication failed:", error);
    }

    function updatePlayerData(addingLoot) {
      function updateVal(key, amnt) {
        var added = false;
        for (var i in self.playerData) {
          if (self.playerData[i].name == key) {
            self.playerData[i].lootCount += amnt;
            self.playerData.$save(self.playerData[i]);
            var profileRef = ref.child(providerUser.uid);
            var playerDataRef = profileRef.child("playerData");
            self.playerData = $firebaseArray(playerDataRef);
            added = true;
            break; //Stop this loop, we found it!
          }
        }
        if (!added) {
          self.playerData.$add(addingLoot);
          var profileRef = ref.child(providerUser.uid);
          var playerDataRef = profileRef.child("playerData");
          self.playerData = $firebaseArray(playerDataRef);
        }
      }

      updateVal(addingLoot.name, 1);
      //self.playerData.$add(addingLoot);
    }

  }

})();
