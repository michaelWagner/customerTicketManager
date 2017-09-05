
myAppC.controller('TicketReportsController', ['$scope', '$location', '$rootScope', '$routeParams',  'AuthenticationService', 'TicketingService', 'ErrorHandlingService',
function($scope, $location, $rootScope, $routeParams, AuthenticationService, TicketingService, ErrorHandlingService) {
    $scope.start = new Date();
    $scope.end = new Date();

    $scope.status = {};
    $scope.$watch('start', function(start){
        console.log(start);
    });
    $scope.status.pending = false;
    $scope.status.ready = false;
    $scope.status.resolved = false;
    $scope.status.reopened = false;


    $scope.currentPage = 2;
    $scope.itemsPerPage = 10;
    $scope.maxSize = 10; //Number of pager buttons to show
  
    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };
  

    $scope.getTickets = function(){
        var localTickets = (typeof($scope.summary) !== 'undefined') ? $scope.summary : '';
        var ticketsPromise = TicketingService.GetTickets();
        ticketsPromise.then(
            function(payload) { 
                $scope.tickets =  payload.results;
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
    
    $scope.togglePending = function(){
        $scope.status.pending = !$scope.status.pending

    }
    $scope.toggleReady = function(){
        $scope.status.ready = !$scope.status.ready
    }
    $scope.toggleResolved = function(){
        $scope.status.resolved = !$scope.status.resolved
    }
    $scope.toggleReopened= function(){
        $scope.status.reopened = !$scope.status.reopened
    }

    $scope.openEnd = function() {
        $scope.end.opened = true;
    };
    $scope.getTickets();
}
]);