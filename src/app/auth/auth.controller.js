(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$location', 'authService', 'JudgeService', 'FIREBASE_URL', '$rootScope', '$sessionStorage'];

  function AuthController($location, authService, JudgeService, FIREBASE_URL, $rootScope, $sessionStorage) {
    var vm = this;
    vm.register = register;
    vm.login = login;

    function register(user) {
      return authService.register(user)
        .then(function() {
          return vm.login(user);
        })
        .then(function() {
          return authService.sendWelcomeEmail(user);
        })
        .catch(function(error) {
          vm.error = error;
        });
    }

    function login(user) {
      return authService.login(user)
        .then(function(response) {
          var foundUser = authService.getUserByEmail(user.email);
          foundUser.$loaded().then(function(){
              angular.forEach(foundUser, function(value, key){
                if (value.role){
                  
                  $sessionStorage.role = value.role;
                  $rootScope.role = value.role;
                  $sessionStorage.photo = value.image;
                  $rootScope.photo = value.image;
                  $sessionStorage.name = value.name;
                  $sessionStorage.email = value.email;
                  $rootScope.name = value.name;
                  if($sessionStorage.role == 'admin'){
                    $location.path('/dancelist');
                  }else{
                    $location.path('/markinglist');
                  }
                }
              });
          });
          return response;
        })
        .catch(function(error) {
          vm.error = error;
        });
    }

  }

})();
