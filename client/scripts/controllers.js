/* Controllers */

var myAppC = angular.module('myApp.controllers', []);
;
myAppC.controller('AdminController', ['$scope', '$location', 'OrderService', 'AuthenticationService', 'ErrorHandlingService',
    function($scope, $location, OrderService,  AuthenticationService, ErrorHandlingService ) {
        
    }
]);;
myAppC.controller('ErrorController', ['$scope', '$location', '$rootScope', 'SuitService', 'ErrorHandlingService',
    function($scope, $location, $rootScope, SuitService, ErrorHandlingService) {

   }
]);;
myAppC.controller('LoginController', ['$scope', '$location', '$rootScope', '$routeParams', 'AuthenticationService', 'ErrorHandlingService',
    function($scope, $location, $rootScope, $routeParams, AuthenticationService, ErrorHandlingService) {

        $scope.routeParams = $routeParams;

        $scope.login = function(){
            $scope.dataLoading = true;

            var loginPromise = AuthenticationService.Login($scope.username, $scope.password);
            loginPromise.then(
                function(payload){

                    $location.path( "/" );
                },
                function(error){
                    console.log('failure logging in', error);
                    $scope.message = ErrorHandlingService.getMessage(error);
                }
            );
        };
    }
]);
