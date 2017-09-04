/* Controllers */

var myAppC = angular.module('myApp.controllers', []);
; 
myAppC.controller('AdminController', ['$scope', '$location', 'OrderService', 'AuthenticationService', 'ErrorHandlingService',
    function($scope, $location, OrderService,  AuthenticationService, ErrorHandlingService ) {
        
        $scope.GetOrders = function(){
            var ordersPromise   = OrderService.GetOrders();
            ordersPromise.then(
                function (resp) {
                    var orderArray = resp;
                    orderArray.sort(function(a,b){return b.stripeInfo.created - a.stripeInfo.created});
                    $scope.orders = orderArray;
                },
                function(error){
                    $scope.status = 'error';
                    $scope.message = ErrorHandlingService.getMessage(error);
                }
            );  
  
        }
        $scope.showDetails = function(orderId){
            var orderindex = _.findIndex($scope.orders, function(o) { return o.charge.id === orderId; });
            OrderService.SetDetails($scope.orders[orderindex]);
            window.location.href = '/#/orderdetail';
        }
        $scope.getDate = function(date){
           var mom = new moment(1000 * date);
           return mom.format("ddd, MM-D-YY, h:mm:ss a");
        }
        $scope.GetOrders();
    }
]);; 
myAppC.controller('ErrorController', ['$scope', '$location', '$rootScope', 'SuitService', 'ErrorHandlingService',
    function($scope, $location, $rootScope, SuitService, ErrorHandlingService) {
                
   }
]);;
myAppC.controller('LoginController', ['$scope', '$location', '$rootScope', '$routeParams', 'AuthenticationService', 'ErrorHandlingService',
    function($scope, $location, $rootScope, $routeParams, AuthenticationService, ErrorHandlingService) {

        $scope.routeParams = $routeParams;

        $scope.login = function(){
            $scope.dataLoading = true;
            
            var loginPromise = AuthenticationService.Login($scope.username, $scope.password);
            loginPromise.then(
                function(payload){

                    $location.path( "/new" );
                },
                function(error){
                    console.log('failure logging in', error);

                    $scope.message = 'Login failed';
                }
            );
        };
    }
]);
;
myAppC.controller('NewTicketController', ['$scope', '$location', '$rootScope', '$routeParams', 'store', 'TicketingService', 'AuthenticationService', 'ErrorHandlingService',
function($scope, $location, $rootScope, $routeParams, store, TicketingService,  AuthenticationService, ErrorHandlingService) {
    $scope.searchitem = '';
    $scope.custid = '';
    $scope.contact_name = '';
    $scope.contact_phone = '';
    $scope.subject = '';
    $scope.status = '';                   //2017-08-18T16:55:33.882824                   Z
    $scope.opened_date = moment().format("YYYY-MM-DDThh:mm:ss.882824Z");
                                          //YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]
    $scope.resolved_date = null;
    $scope.customer = '';
    $scope.rep = 1; 

    $scope.logout = function(){
        AuthenticationService.Logout();
    }

    $scope.newTicket = function(){
        window.location.href = '/new';
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
    $scope.searchCustomer = function(custid){
        var customerPromise = TicketingService.GetCustomer(custid);
        customerPromise.then(
            function(payload) { 
                var customer =  payload;
                $scope.customer = customer.id;
                $scope.contact_name = customer.first_name + ' ' + customer.last_name;
                $scope.contact_phone = customer.phone;
                $scope.status = 'success';
            },
            function(error) {
                $scope.status = 'error';
                var message = ErrorHandlingService.getMessage(error);
                if(_.isArray(message)){
                    alert(_.values(message));
                } else {
                    alert(message);
                }
            }
        ); 
    }
    $scope.submitNewTicket = function(){
        var data = {};
        data.contact_name = $scope.contact_name;
        data.contact_phone = $scope.contact_phone;
        data.subject = $scope.subject;
        data.details = $scope.details;
        data.status = 'pending';
        data.opened_date =$scope.opened_date;
        data.resolved_date = $scope.resolved_date;
        data.customer = $scope.customer;
        data.rep = '1';

        var newTicketPromise = TicketingService.PostNewTicket(data);
        newTicketPromise.then(
            function(payload) { 
                $scope.newTicket =  payload;
                console.log($scope.newTicket)
                alert('Ticket Submitted');
            },
            function(error) {
                $scope.status = 'error';
                var message = ErrorHandlingService.getMessage(error);
                if(_.isArray(message)){
                    alert(_.values(message));
                } else {
                    alert(message);
                }
            }
        );        
    }
}
]);;
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
]);;myAppC.controller('TicketDetailsController', ['$scope', '$location', '$rootScope', '$routeParams', 'store',  'TicketingService','AuthenticationService', 'ErrorHandlingService',
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
]);;
myAppC.controller('TicketReportsController', ['$scope', '$location', '$rootScope', '$routeParams',  'AuthenticationService', 'TicketingService', 'ErrorHandlingService',
function($scope, $location, $rootScope, $routeParams, AuthenticationService, TicketingService, ErrorHandlingService) {
    $scope.start = new Date();
    $scope.end = new Date();

    $scope.status = {};
    
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