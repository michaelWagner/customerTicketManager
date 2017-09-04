/* Run */

myApp.run(['$rootScope', '$window', '$route', '$log', '$location', '$timeout', 'AuthenticationService', 'ErrorHandlingService',
    function ($rootScope, $window, $route, $log, $location, $timeout,  AuthenticationService, ErrorHandlingService ) {

        $rootScope.isWorking = true;
        $rootScope.refId = '';

    	var ngApp = document.getElementById('ng-app');
        var header = document.getElementsByTagName('header')[0];
        var jsGo = false;

        $rootScope.$on('$routeChangeStart',
            function (event, next, current) {
                var getUserStatusPromise = AuthenticationService.GetUserStatus();
                getUserStatusPromise.then(
                function (resp) {
                    var isUserLoggedIn = resp;
                    console.log('at route change start. Next.access = ' + JSON.stringify(next.access));
                    console.log('isUserLoggedIn + ' + JSON.stringify(isUserLoggedIn));
                    if (next.access.restricted && !isUserLoggedIn){
                        $location.path('/login');
                        $route.reload();
                    }
                },
                function(error){
                    ErrorHandlingService.getMessage(error);
                    $location.path('/error');
                });

            }
        );         
    }
]);