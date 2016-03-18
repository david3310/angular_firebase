(function() {
  'use strict';

  angular
    .module('app.judgelist')
    .directive('gzJudgeTable', gzJudgeTable);

  function gzJudgeTable() {
    return {
      templateUrl: 'app/judgelist/directives/JudgeTable.html',
      restrict: 'E',
      controller: JudgeTableController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        judges: '='
      }
    }
  }

  JudgeTableController.$inject = ['firebaseDataService'];

  function JudgeTableController(firebaseDataService) {
    
    var vm = this;

    vm.removeJudge = removeJudge;
    vm.toggleDone = toggleDone;
    vm.changePhoto = changePhoto;

    function removeJudge(Judge) {
      vm.judges.$remove(Judge);
    }

    function toggleDone(Judge) {
      vm.judges.$save(Judge);
    }

    function changePhoto(Judge) {

      console.log("Judge", Judge);

      $.FileDialog({multiple: true}).on('files.bs.filedialog', function(ev) {
          var files = ev.files;
          var text = "";
          files.forEach(function(f) {
              text += f.name + "<br/>";

              var query = firebaseDataService.users.orderByChild("email").equalTo(Judge.email);

              query.on('value', function(snapshot) {
                  snapshot.forEach(function(weekSnapshot) {
                      weekSnapshot.ref().update({ image: f.content });
                  });
              });
          });
          
          $("#output").html(text);
      }).on('cancel.bs.filedialog', function(ev) {
          $("#output").html("Cancelled!");
      });

    }
  }

})();
