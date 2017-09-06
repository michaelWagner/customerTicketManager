
myAppC.controller('TicketReportsController', ['$scope', '$location', '$rootScope', '$routeParams', 'store', 'AuthenticationService', 'TicketingService', 'ErrorHandlingService',
function($scope, $location, $rootScope, $routeParams, store, AuthenticationService, TicketingService, ErrorHandlingService) {
    $scope.start = moment().subtract(90, 'days').toDate();;
    $scope.end = moment().add(1, 'days').toDate();;
    
    //$scope.statusOptions = [ {"key": "pending", "value": false}, {"key":"ready", "value":false}, {"key":"resolved", "value":false}, {"key":"reopened",  "value":false}];    
    $scope.statusOptions = [ {"key": "pending", "value": "pending"}, {"key":"ready", "value":"ready_for_approval"}, {"key":"resolved", "value":"resolved"}, {"key":"reopened",  "value":"reopened"}];    
    $scope.statuses = ['pending', 'ready_for_approval', 'resolved', 'reopened']


    $scope.currentPage = 2;
    $scope.itemsPerPage = 10;
    $scope.maxSize = 10;
  
    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };
  

    $scope.getTickets = function(){
        var localTickets = (typeof($scope.summary) !== 'undefined') ? $scope.summary : '';
        var ticketsPromise = TicketingService.GetTickets();
        ticketsPromise.then(
            function(payload) { 
                var tempTickets =  payload.results;
                tempTickets = _.filter(tempTickets, function(t){ 
                    return moment(t.opened_date)  >  moment($scope.start);
                });
                tempTickets = _.filter(tempTickets, function(t){ 
                    return moment(t.opened_date)  <  moment($scope.end);
                });
  
                tempTickets = _.filter(tempTickets, function(t){ 
                    return _.includes($scope.statuses, t.status);
                }); 

                $scope.tickets = tempTickets;
                $scope.totalItems = $scope.tickets.length;
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

    $scope.detail = function(id){
        console.log('goto ' + id);
        window.location.href = '/tickets/' + id;
        
    }

    $scope.openStart = function() {
        $scope.start.opened = true;
      };

    $scope.openEnd = function() {
        $scope.end.opened = true;
    };

    $scope.getFilteredTickets = function(){
        console.log($scope.statuses);
        $scope.getTickets();
    }
}
]);