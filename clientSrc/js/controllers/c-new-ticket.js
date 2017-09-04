
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
]);