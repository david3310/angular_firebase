(function(){
  'use strict';

  angular
    .module('app.core')
    .factory('DanceService', DanceService);

  DanceService.$inject = ['$firebaseArray', 'firebaseDataService'];
  function DanceService($firebaseArray, firebaseDataService) {

    var service = {
      getDancies: getDancies,
      updateDance: updateDance,
      Dance: Dance
    };

    return service;

    function getDancies() {
      return $firebaseArray(firebaseDataService.dances);
    }

    function updateDance(Dance) {
      var id = Dance.$id;
      firebaseDataService.dances.child(id).set({name: Dance.name,
                                              dancers: Dance.dancers,
                                              dancetype: Dance.dancetype,
                                              date: Dance.date,
                                              judges: Dance.judges,
                                              result: Dance.result,
                                              state: Dance.state});
    }
    function Dance() {
      this.name = '';
      this.dancetype = [];
      this.state = '';
      this.judge = false;
      this.date = new Date();
      this.result = [];
    }
  }
})();
