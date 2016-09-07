(function() {
  'use strict';

  angular
    .module('app', [
      // Angular modules.      
      'ngRoute',
      'ngAnimate',

      // Third Dance modules.
      'firebase',
      'ngStorage',
      
      // Custom modules.
      'app.auth',
      'app.core',
      'app.landing',
      'app.layout',
      'app.dancelist',
      'app.dancetypelist',
      'app.markinglist',
      'app.judgelist'
    ])
    .config(configFunction)
    .run(runFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }

  runFunction.$inject = ['$rootScope', '$location'];

  function runFunction($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
      if (error === "AUTH_REQUIRED") {
        $location.path('/');
      }
    });
  }

})();
