
myAppC.controller('SummaryController', ['$scope', '$location', '$rootScope', '$routeParams', 'TicketingService', 'AuthenticationService', 'ErrorHandlingService',
function($scope, $location, $rootScope, $routeParams, TicketingService, AuthenticationService, ErrorHandlingService) {

    $scope.getSummary = function(){
        var localSummary = (typeof($scope.summary) !== 'undefined') ? $scope.summary : '';
        var summaryPromise = TicketingService.GetSummary();
        summaryPromise.then(
            function(payload) { 
                $scope.summary =  payload;
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
    $scope.getSummary(); 
    
}
]);