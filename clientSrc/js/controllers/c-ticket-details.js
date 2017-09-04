myAppC.controller('TicketDetailsController', ['$scope', '$location', '$rootScope', '$routeParams', 'store',  'TicketingService','AuthenticationService', 'ErrorHandlingService',
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
]);