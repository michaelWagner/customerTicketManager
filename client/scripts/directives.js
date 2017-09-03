/* Directives */

var myAppD = angular.module('myApp.directives', []);;//rccEnter
myAppD.directive('footer', ['$location',
    function($location) {
        return {
            scope:true,
            templateUrl: '',
            link : function(scope, elm, attrs) {

            },
            controller: ['$scope',
                function($scope){

                }
            ]
        };
    }
]);;//rccEnter
myAppD.directive('menu', ['$location', 'store', 'AuthenticationService',
    function($location, store, AuthenticationService) {
        return {
            scope:true,
            templateUrl:'content/tpl/menu.html',
            link : function(scope, elm, attrs) {
            },
            controller: ['$scope',
                function($scope){
                    $scope.logoff = function(){
                        var logoffSuccess = AuthenticationService.Logout();

                        window.location.href = '/#/login';
                    }
                }
            ]
        };
    }
]);
