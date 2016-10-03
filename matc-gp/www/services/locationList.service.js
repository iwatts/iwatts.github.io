/**
 * Created by isaacwatts on 9/13/16.
 */

(function () {

  angular.module('starter')
    .service('locationList', locationList);

  function locationList() {

    var self = this;
    self.locations = [
      {
        'id': 0,
        'sortkey': "establish odds",
        'name': 'Homebase',
        'desc': "The beginning of your empire."
      },
      {
        'id': 1,
        'sortkey': "establish odds",
        'name': 'Mall',
        'desc': "No one seems to be around."
      },
      {
        'id': 2,
        'sortkey': "establish odds",
        'name': 'Junkyard',
        'desc': "Thank goodness there aren't any dogs around."
      },
      {
        'id': 3,
        'sortkey': "establish odds",
        'name': 'Woods',
        'desc': "Not even the sound of birds. It is unnervingly silent."
      },
      {
        'id': 4,
        'sortkey': "establish odds",
        'name': 'School',
        'desc': "Hey look, an old school house."
      }
    ];
  }


})();
