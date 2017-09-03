//rccEnter
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
                    }
                }
            ]             
        };
    }
]);