myAppC.controller('TicketDetailsController', ['$scope', '$location', '$rootScope', '$routeParams', 'store',  'TicketingService','AuthenticationService', 'ErrorHandlingService',
function($scope, $location, $rootScope, $routeParams, store,  TicketingService, AuthenticationService, ErrorHandlingService) {

    var id = ($routeParams.id) 

    $scope.getTicketDetail = function(){
        var localTickets = (typeof($scope.summary) !== 'undefined') ? $scope.summary : '';
        var ticketsPromise = TicketingService.GetTicketDetail(id);
        ticketsPromise.then(
            function(payload) { 
                $scope.ticketDetail =  payload;
                $scope.ticketDetail.repName = TicketingService.GetRep($scope.ticketDetail.rep);
                console.log($scope.ticketDetail)
                $scope.status = 'success';
            },
            function(error) {
                $scope.status = 'error';
                $scope.message = ErrorHandlingService.getMessage(error);
            }
        ); 
    }
    $scope.logout = function(){
        AuthenticationService.Logout();
    }

    $scope.search = function(item){
        var tickets = store.get('tickets');
        
        console.log('search for ' + item);
    }

    $scope.getTicketDetail();
}
]);