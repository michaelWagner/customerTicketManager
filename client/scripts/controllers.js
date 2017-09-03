/* Controllers */

var myAppC = angular.module('myApp.controllers', []);
; 
myAppC.controller('AdminController', ['$scope', '$location', 'OrderService', 'AuthenticationService', 'ErrorHandlingService',
    function($scope, $location, OrderService,  AuthenticationService, ErrorHandlingService ) {
        
        $scope.GetOrders = function(){
            var ordersPromise   = OrderService.GetOrders();
            ordersPromise.then(
                function (resp) {
                    var orderArray = resp;
                    orderArray.sort(function(a,b){return b.stripeInfo.created - a.stripeInfo.created});
                    $scope.orders = orderArray;
                },
                function(error){
                    $scope.status = 'error';
                    $scope.message = ErrorHandlingService.getMessage(error);
                }
            );  
  
        }
        $scope.showDetails = function(orderId){
            var orderindex = _.findIndex($scope.orders, function(o) { return o.charge.id === orderId; });
            OrderService.SetDetails($scope.orders[orderindex]);
            window.location.href = '/#/orderdetail';
        }
        $scope.getDate = function(date){
           var mom = new moment(1000 * date);
           return mom.format("ddd, MM-D-YY, h:mm:ss a");
        }
        $scope.GetOrders();
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
;
myAppC.controller('NewTicketController', ['$scope', '$location', '$rootScope', '$routeParams', 'AuthenticationService', 'ErrorHandlingService',
function($scope, $location, $rootScope, $routeParams, AuthenticationService, ErrorHandlingService) {

}
]);;
myAppC.controller('SummaryController', ['$scope', '$location', '$rootScope', '$routeParams', 'AuthenticationService', 'ErrorHandlingService',
function($scope, $location, $rootScope, $routeParams, AuthenticationService, ErrorHandlingService) {

}
]);;;
myAppC.controller('TicketReportsController', ['$scope', '$location', '$rootScope', '$routeParams', 'AuthenticationService', 'ErrorHandlingService',
function($scope, $location, $rootScope, $routeParams, AuthenticationService, ErrorHandlingService) {

}
]);