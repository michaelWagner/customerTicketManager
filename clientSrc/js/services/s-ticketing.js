
 myAppS.factory('TicketingService', ['$rootScope', '$http', '$q', '$location', 'store',
    function ($rootScope, $http, $q, $location, store ) {

        return {
            
            GetSummary : function(){
                return $q(function(resolve, reject) {

                    var token = store.get('token');

                    return $http({
                        url:      'https://yellow-jackal-backend.herokuapp.com/api/tickets/summary',
                        dataType: 'json',
                        method:   'GET',
                        headers:  {
                            "Content-Type": "application/json",
                            "Accept":"application/json",
                            "Authorization": "JWT " + token.token 
                        },
                        data:null,
                        }).then(function(response) {
                            if (typeof response.data === 'object') {
                                if(response.data != null) {
                                    store.set('summary', response.data);
                                    resolve( response.data);
                                } else {
                                    // invalid response
                                    reject({'status':500,'message':'GetColors service request response data is null'});
                                }
                            } else {
                                // invalid response
                                reject({'status':500,'message':'GetColors service request response data is not an object'});
                            }

                        }, function(err) {
                            // something went wrong
                            if(err.status===400){
                                reject({'status':err.status,'message':err.data.message});                             
                            } else if(err.status ===401){
                                $location.path('/login');
                            } else if(err.status ===404){
                                reject({'status':err.status,'message':'file not found'});                             
                            } else {
                                reject({'status':err.status,'message':'unknown error'});                             
                            }
                    });

                });
            },
            GetTickets : function(){
                return $q(function(resolve, reject) {
                    var token = store.get('token');
                    return $http({
                        url:      'https://yellow-jackal-backend.herokuapp.com/api/tickets/?page=1&page_size=200',
                        dataType: 'json',
                        method:   'GET',
                        headers:  {
                            "Content-Type": "application/json",
                            "Accept":"application/json",
                            "Authorization": "JWT " + token.token 
                        },
                        data:null,
                        }).then(function(response) {
                            if (typeof response.data === 'object') {
                                if(response.data != null) {
                                    store.set('tickets', response.data);
                                    resolve( response.data);
                                } else {
                                    // invalid response
                                    reject({'status':500,'message':'GetColors service request response data is null'});
                                }
                            } else {
                                // invalid response
                                reject({'status':500,'message':'GetColors service request response data is not an object'});
                            }

                        }, function(err) {
                            // something went wrong
                            if(err.status===400){
                                reject({'status':err.status,'message':err.data.message});                             
                            } else if(err.status ===401){
                                $location.path('/login');
                            } else if(err.status ===404){
                                reject({'status':err.status,'message':'file not found'});                             
                            } else {
                                reject({'status':err.status,'message':'unknown error'});                             
                            }
                    });
                });
            },
            GetTicketDetail : function(id){
                return $q(function(resolve, reject) {
                    var token = store.get('token');
                    return $http({
                        url:      'https://yellow-jackal-backend.herokuapp.com/api/tickets/' + id + '/',
                        dataType: 'json',
                        method:   'GET',
                        headers:  {
                            "Content-Type": "application/json",
                            "Accept":"application/json",
                            "Authorization": "JWT " + token.token 
                        },
                        data:null,
                        }).then(function(response) {
                            if (typeof response.data === 'object') {
                                if(response.data != null) {
                                    store.set('currentDetail', response.data);
                                    resolve( response.data);
                                } else {
                                    // invalid response
                                    reject({'status':500,'message':'GetColors service request response data is null'});
                                }
                            } else {
                                // invalid response
                                reject({'status':500,'message':'GetColors service request response data is not an object'});
                            }

                        }, function(err) {
                            // something went wrong
                            if(err.status===400){
                                reject({'status':err.status,'message':err.data.message});                             
                            } else if(err.status ===401){
                                $location.path('/login');
                            } else if(err.status ===404){
                                reject({'status':err.status,'message':'file not found'});                             
                            } else {
                                reject({'status':err.status,'message':'unknown error'});                             
                            }
                    });
                });
            },
            GetRep : function(id){
                return $q(function(resolve, reject) {
                    var token = store.get('token');
                    resolve('George Jetson');
    
                });
            },
        }
    }
]);