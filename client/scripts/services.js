/* Services */

var myAppS = angular.module('myApp.services', []);;   
 myAppS.factory('AuthenticationService', ['$rootScope','$http', '$location', 'store', '$q',
    function ($rootScope, $http, $location, store, $q ) {
        return {       
            GetUserStatus : function (){
                return $q(function(resolve, reject){
                    var token = store.get('token')
                    resolve(token);

                });
            },  
            Login : function(username, password){
                return $q(function(resolve, reject){
                    return $http({
                        url: 'https://yellow-jackal-backend.herokuapp.com/api-token-auth/',
                        dataType: 'json',
                        method: 'POST',
                        data: { "email":username, "password":password},
                        headers: {
                            "Content-Type": "application/json",
                            "Accept":"application/json"
                        }
                    }).then(function(response) {
                            if (response.status === 200) {
                                if(response.data != null) {
                                    console.log(response.data);
                                    store.set('token', response.data);
                                    resolve(true);
                                } else {
                                    // invalid response
                                    store.set('token', null);
                                    reject({'status':'error','message':'Authentication service received a null response'});
                                }
                            } else {
                                // invalid response
                                store.set('token', null);

                                reject({'status':'error','message':'Authentication service received invalid data'});
                            }
                        }, function(err) {
                            // something went wrong
                            store.set('token', null);
                            if(err.status===400){
                                reject({'status':err.status,'message':err.data.message});                             
                            } else if(err.status ===401){
                                reject({'status':err.status,'message':err.data.message});                             
                            } else if(err.status ===404){
                                reject({'status':err.status,'message':'file not found'});                             
                            } else {
                                reject({'status':err.status,'message':'unknown authentication error'});                             
                            }
                        }
                    );
                });
            },          
            Logout : function(){
                return $q(function(resolve, reject){
                    store.set('token', null)
                    resolve(true);

                });                

            }
        }
    }
]);; myAppS.factory('ErrorHandlingService', [
    function  () {
        return{
            getMessage : function(error){
                var message = ''
                if(error.status === -1){
                    message = "An error occured. Please contact your system administrator";
                } else if(error.status === 400){
                    message = error.message;
                } else if(error.status > 400 &&  error.status < 500){
                    message = "An error occured. Please contact your system administrator : " + error.message;
                } else {
                    message = "An error occured. Please contact your system administrator : " + error.message;
                }
                return message;
            }
        }
    }
]);
;
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
]);; myAppS.factory('ValidationService', ['$rootScope','$http', '$location',
    function ($rootScope, $http, $location ) {


        function IsValidAlphanumeric (input){
            var validChars = /^[A-Za-z\?\(\)\!\%\[\]\{\}\d\s\.\,\@]+$/;
            var result =  validChars.test(input);
            return result;
        }

        function IsValidNumeric (input){
            var result = !isNaN(parseFloat(input)) && isFinite(input);
            return result;
        }
        function IsValidEmail (input){
            var re = /^\S+@\S+$/;
            var result = re.test(email);
            return result;
        }
        function IsValidTelephone (input){
            var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            var result = phoneno.test(input);
            return result;
        }
        function IsValidPercentage(input){
            var result = (!isNaN(value) && value > 0 && value <= 100) ? true : false;
            return result;
       }
        return{
            IsValidAlphanumeric: function(input){
                var validChars = /^[A-Za-z\?\(\)\!\%\[\]\{\}\d\s\.\,\@]+$/;
                return validChars.test(input);
            }
        }
    }
]);
