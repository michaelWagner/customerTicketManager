/* Directives */

var myAppD = angular.module('myApp.directives', []);;//rccEnter
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
                        if(logoffSuccess){
                            store.set('orderDetails', null);
                        }
                        window.location.href = '/#/login';
                    },
                    $scope.gotoDestination = function(destination){
                        $location.path(destination);
                    }
                }
            ]             
        };
    }
]);;myAppD.directive('sidemenu', ['$location', 
function($location) {
    return {
        scope:true,
        templateUrl:'content/tpl/sidemenu.html',
        link : function(scope, elm, attrs) {
            scope.gotoDestination = function(destination){
                $location.path(destination);
            }
        },
        controller: ['$scope', 
            function($scope){

            }
        ]        
    };
}
]);