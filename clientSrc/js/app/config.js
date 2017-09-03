/*config */
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
    
]);