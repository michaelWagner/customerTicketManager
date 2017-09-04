
myAppC.controller('SummaryController', ['$scope', '$location', '$rootScope', '$routeParams', 'TicketingService', 'AuthenticationService', 'ErrorHandlingService',
function($scope, $location, $rootScope, $routeParams, TicketingService, AuthenticationService, ErrorHandlingService) {
    $scope.ticketing = {};
    $scope.hideCompleted = false;
    $scope.getSummary = function(){
        var summaryPromise = TicketingService.GetSummary();
        summaryPromise.then(
            function(payload) { 
                $scope.ticketing.summary =  payload;
                $scope.status = 'success';
            },
            function(error) {
                $scope.status = 'error';
                $scope.message = ErrorHandlingService.getMessage(error);
            }
        ); 
    }
    $scope.getActionItems = function(){
        var summaryPromise = TicketingService.GetActionItems();
        summaryPromise.then(
            function(payload) { 
                $scope.ticketing.actionItems =  payload;
                $scope.status = 'success';
            },
            function(error) {
                $scope.status = 'error';
                $scope.message = ErrorHandlingService.getMessage(error);
            }
        ); 
    }
    $scope.markComplete = function(id){
        var index = _.findIndex($scope.ticketing.actionItems, function(i) { 
            return i.id === id; 
        });
        if(index > 0){
            $scope.ticketing.actionItems.is_complete = !$scope.ticketing.actionItems.is_complete;
        }
    }
    $scope.toggleHide = function(){
        $scope.hideCompleted = !$scope.hideCompleted;
    }
    $scope.logout = function(){
        AuthenticationService.Logout();
    }
    $scope.getSummary(); 
    $scope.getActionItems();   
}
]);