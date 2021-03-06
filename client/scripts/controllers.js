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
]);;myAppC.controller('TicketDetailsController', ['$scope', '$location', '$rootScope', '$routeParams', 'store',  'TicketingService','AuthenticationService', 'ErrorHandlingService',
function($scope, $location, $rootScope, $routeParams, store,  TicketingService, AuthenticationService, ErrorHandlingService) {

    $scope.rep_name = 'Manny';
    $scope.note = '';
    $scope.ticket = $routeParams.id.toString();
    $scope.text = '';
    $scope.rep = '1';
    $scope.date = moment().format("YYYY-MM-DDThh:mm:ss.882824Z");
    
    $scope.getTicketDetail = function(){
        var localTickets = (typeof($scope.summary) !== 'undefined') ? $scope.summary : '';
        var ticketsPromise = TicketingService.GetTicketDetail($scope.ticket);
        ticketsPromise.then(
            function(payload) { 
                $scope.ticketDetail =  payload;
                console.log($scope.ticketDetail)
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

    $scope.newTicket = function(){
        window.location.href = '/new';
    }
    $scope.getNotes = function(){
         var notesPromise = TicketingService.GetNotes($scope.ticket);
         notesPromise.then(
            function(payload) { 
                $scope.ticketDetail.notes =  payload;
                console.log($scope.notes)
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
    $scope.submitNote = function(){
        var data = {};
        data.rep_name = $scope.rep_name;
        data.ticket   = $scope.ticket;
        data.rep      = $scope.rep ;
        data.date     = $scope.date;
        data.text     = $scope.note;
    
        var newNotePromise = TicketingService.PostNote(data);
        newNotePromise.then(
            function(payload) { 
                $scope.newNote =  payload;
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
    $scope.getNotes($scope.ticket);
}
]);;
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