// Declare app level module which depends on filters, services, directives, and controllers

var myApp = angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'angular-storage',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
]);
;/*config */
myApp.config(['$routeProvider', '$httpProvider', '$locationProvider', '$compileProvider',
    function ($routeProvider, $httpProvider, $locationProvider, $compileProvider){

/*
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
*/
    $routeProvider.
        when('/', {
            templateUrl: 'content/tpl/home.html',
            controller: 'HomeController',
            access: {restricted: true},
            reloadOnSearch: false
        }).when('/login', {
            templateUrl: 'content/tpl/login.html',
            controller: 'LoginController',
            access: {restricted: false},
            reloadOnSearch: false
        }).when('/new', {
            templateUrl: 'content/tpl/newticket.html',
            controller: 'NewTicketController',
            access: {restricted: false},
            reloadOnSearch: false
        }).when('/tickets', {
            templateUrl: 'content/tpl/ticketreports.html',
            controller: 'TicketReportsController',
            access: {restricted: false},
            reloadOnSearch: false
        }).when('/tickets/:id', {
            templateUrl: 'content/tpl/ticketdetails.html',
            controller: 'TicketDetailsController',
            access: {restricted: false},
            reloadOnSearch: false
        }).when('/summary', {
            templateUrl: 'content/tpl/summary.html',
            controller: 'SummaryController',
            access: {restricted: false},
            reloadOnSearch: false
        }).when('/error', {
            templateUrl: '/content/tpl/error.html',
            controller: 'ErrorController',
            access: {restricted: false},
            reloadOnSearch: false
        }).otherwise({
            templateUrl: '/content/tpl/notfound.html',
            controller: 'ErrorController',
            reloadOnSearch: false
        }); 
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};    

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
    
    }
    
]);;/* Run */

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
                    var isUserLoggedIn = resp.isLoggedIn;
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