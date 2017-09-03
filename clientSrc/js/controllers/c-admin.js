 
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
]);