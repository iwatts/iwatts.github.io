/**
 * Created by isaacwatts on 9/13/16.
 */

var latestRoll = '';
var playerData =[];

$(window).load(function() {
  $('[data-component="looting"]').each(function() {
    var looting = new components.Looting(this);
  });
});

var components = components || {};

components.Looting = function(elem) {
  // Depends on jQuery
  var self = this;
  self.el = $(elem);
  self.el.click(function () {
      self.roll();
      self.el.prop('disabled', true);
      setTimeout(function () {
          self.el.prop('disabled', false);
      }, 3000)
  })

};
components.Looting.prototype.roll = function () {
  var self = this;
  var d1 = Math.floor(Math.random() * 6) + 1;
  var d2 = Math.floor(Math.random() * 6) + 1;

  latestRoll = d1 + d2;
  //console.log(latestRoll);
  self.lootPick();
};
components.Looting.prototype.lootPick = function () {
  var newLoot = '';
  //console.log("your loot is: ");
  if (latestRoll) {
      switch(latestRoll) {
          case 2:
              newLoot = loot[0];
              break;
          case 3:
              newLoot = loot[1];
              break;
          case 4:
              newLoot = loot[2];
              break;
          case 5:
              newLoot = loot[3];
              break;
          case 6:
          case 7:
              newLoot = loot[4];
              break;
          case 8:
              newLoot = loot[5];
              break;
          case 9:
              newLoot = loot[6];
              break;
          case 10:
              newLoot = loot[7];
              break;
          case 11:
              newLoot = loot[8];
              break;
          case 12:
              newLoot = loot[9];
              break;
      }
      function containsObject(obj, list) {
          var x;
          for (x in list) {
              if (list.hasOwnProperty(x) && list[x] === obj) {
                  return true;
              }
          }
          return false;
      }
      function updateVal( key, amnt ) {
          for (var i in playerData) {
              if (playerData[i] == key) {
                  playerData[i].lootCount += amnt;
                  break; //Stop this loop, we found it!
              }
          }
      }
      var contains = containsObject(newLoot, playerData);
      if(!(contains)) {
          playerData.push(newLoot);
      }
      updateVal(newLoot, 1);
      console.log(playerData);

      
      profileRef.push(playerData);
  }
};
