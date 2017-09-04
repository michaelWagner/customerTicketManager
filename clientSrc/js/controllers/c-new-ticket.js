
myAppC.controller('NewTicketController', ['$scope', '$location', '$rootScope', '$routeParams', 'AuthenticationService', 'ErrorHandlingService',
function($scope, $location, $rootScope, $routeParams, AuthenticationService, ErrorHandlingService) {
    $scope.logout = function(){
        AuthenticationService.Logout();
    }
}
]);