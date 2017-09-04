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

    $scope.newTicket = function(){
        window.location.href = '/new';
    }

    $scope.logout = function(){
        AuthenticationService.Logout();
    }
    $scope.searchTickets = function(item){
        if(item){
            var tickets = store.get('tickets');
            var index = _.findIndex(tickets, function(t) { 
                return t.id.toString() === item; 
            });
            if(index > 0){
                window.location.href = '/tickets/' +  tickets[index].id;
            } else {
                console.log('not found ' );
            }
        } else {
            console.log('nothing here');
        }
    }

    $scope.getTicketDetail();
}
]);