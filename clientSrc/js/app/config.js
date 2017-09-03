/*config */
myApp.config(['$routeProvider', '$httpProvider', '$locationProvider', '$compileProvider',
    function ($routeProvider, $httpProvider, $locationProvider, $compileProvider){



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
    
        // use the HTML5 History API
        $locationProvider.html5Mode(false);
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
    
    }
    
]);