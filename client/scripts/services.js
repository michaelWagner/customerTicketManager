/* Services */

var myAppS = angular.module('myApp.services', []);;   
 myAppS.factory('AuthenticationService', ['$rootScope','$http', '$location', 'store', '$q',
    function ($rootScope, $http, $location, store, $q ) {
        return {
            GetUserStatus : function (){
                return $q(function(resolve, reject){
                    resolve(false);
                    /*
                    return $http({
                        url: '/status',
                        dataType: 'json',
                        method: 'GET',
                        data: {},
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }).then(function(response) {
                            if (response.status === 200) {
                                if(response.data != null) {
                                    store.set('isloggedin', response.data);
                                    resolve(response.data);
                                } else {
                                    // invalid response
                                    store.set('isloggedin', false);
                                    reject({'status':'error','message':'Authentication service received a null response'});
                                }
                            } else {
                                // invalid response
                                store.set('isloggedin', null);
                                reject({'status':'error','message':'Authentication service received invalid data'});
                            }
                        }, function(err) {
                            // something went wrong
                            store.set('isloggedin', false);
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
                    */
                });
            },            
            Login : function(username, password){
                return $q(function(resolve, reject){
                    return $http({
                        url: 'https://yellow-jackal-backend.herokuapp.com/api-token-auth',
                        dataType: 'json',
                        method: 'POST',
                        data: { "email":username, "password":password},
                        headers: {
                            "Content-Type": "application/html",
                            "Accept":"application/html"
                        }
                    }).then(function(response) {
                            if (response.status === 200) {
                                if(response.data != null) {
                                    console.log(response.data);
                                    store.set('user', response.data);
                                    resolve(true);
                                } else {
                                    // invalid response
                                    store.set('user', null);
                                    store.set('isloggedin', false);
                                    reject({'status':'error','message':'Authentication service received a null response'});
                                }
                            } else {
                                // invalid response
                                store.set('user', null);
                                store.set('isloggedin', false);
                                reject({'status':'error','message':'Authentication service received invalid data'});
                            }
                        }, function(err) {
                            // something went wrong
                            store.set('user', null);
                            store.set('isloggedin', false);
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
                resolve(true);
                
                /*
                return $q(function(resolve, reject){
                    return $http({
                        url: '/logout',
                        dataType: 'json',
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }).then(function(response) {
                            if (response.status === 200) {
                                if(response.data != null) {
                                    store.set('user', null);                                    
                                    store.set('isloggedin', false);
                                    resolve(true);
                                } else {
                                    // invalid response
                                    store.set('user', null);
                                    store.set('isloggedin', false);
                                    reject({'status':'error','message':'Authentication service received a null response'});
                                }
                            } else {
                                // invalid response
                                store.set('user', null);
                                store.set('isloggedin', false);
                                reject({'status':'error','message':'Authentication service received invalid data'});
                            }

                        }, function(err) {
                            // something went wrong
                            store.set('user', null);
                            store.set('isloggedin', false);
                            if(err.status===400){
                                reject({'status':err.status,'message':err.data.message});                             
                            } else if(err.status ===401){
                                $location.path('/login');
                            } else if(err.status ===404){
                                reject({'status':err.status,'message':'file not found'});                             
                            } else {
                                reject({'status':err.status,'message':'unknown authentication error'});                             
                            }
                        }
                    );
                });
                */
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
            
            GetColors : function(){
                return $q(function(resolve, reject) {
                    var colors = store.get('colors'); 
                    if(colors && colors.length > 0){
                        resolve(colors);
                    } else {
                        return $http({
                            url:      '/json/colors.json',
                            dataType: 'json',
                            method:   'GET',
                            headers:  {
                                "Content-Type": "application/json"
                            },
                            data:null,
                            }).then(function(response) {
                                if (typeof response.data === 'object') {
                                    if(response.data != null) {
                                        store.set('colors', response.data);
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
                    }
                });
            },
        
            GetSuit : function(suitstyle){
                return $q(function(resolve, reject) {
                    var suit = store.get(suitstyle + '-suit'); 
                    if(suit && suit.length > 0){
                        resolve(suit);
                    } else {
                        return $http({
                            url:      '/json/suit-' + suitstyle + '.json',
                            dataType: 'json',
                            method:   'GET',
                            headers:  {
                                "Content-Type": "application/json"
                            },
                            data:null,
                            }).then(function(response) {
                                if (typeof response.data === 'object') {
                                    if(response.data != null) {
                                        store.set(suitstyle + '-suit', response.data);
                                        resolve( response.data);
                                    } else {
                                        // invalid response
                                        reject({'status':500,'message':'GetSuit service request response data is null'});
                                    }
                                } else {
                                    // invalid response
                                    reject({'status':500,'message':'GetSuit service request response data is not an object'});
                                }
                            }, function(err) {
                                console.log("GetSuit service request response error occured", err);
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
                    }
                });
            },
            ClearSuit: function(suitstyle){

            },
            SaveSuit : function(suitstyle, suit){
                store.set(suitstyle + '-suit', suit);
            },
            GetContact: function(){
                return $q(function(resolve, reject) {
                     var contact = store.get('contact');
                    if(contact && contact.length > 0){
                        resolve(contact);
                    } else {
                        return $http({
                            url:      '/json/contact.json',
                            dataType: 'json',
                            method:   'GET',
                            headers:  {
                                "Content-Type": "application/json"
                            },
                            data:null,
                            }).then(function(response) {
                                if (typeof response.data === 'object') {
                                    if(response.data != null) {
                                        store.set('contact', response.data);
                                        resolve( response.data);
                                    } else {
                                        reject({'status':500,'message':'GetContact service request response data is null'});
                                    }
                                } else {
                                    reject({'status':500,'message':'GetContact service request response data is not an object'});
                                }
                            }, function(err) {
                                console.log("GetContact service request response error occured", err);
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
                    }
                }); 
            },
            SaveContact: function(contact){
                store.set('contact', contact);
            },
            UpdateSuitElement: function(color, suitelement){
                console.log(' in UpdateSuitElement color   = ' + color + ' suitelement = ' + suitelement  + ' $scope ' + $scope); 
            }
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
