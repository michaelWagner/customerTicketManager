/* Services */

var myAppS = angular.module('myApp.services', []);;
 myAppS.factory('AuthenticationService', ['$rootScope','$http', '$location', 'store', '$q',
    function ($rootScope, $http, $location, store, $q ) {
        return {
            Login : function(username, password){
                return $q(function(resolve, reject){
                    return $http({
                        url: '/login',
                        dataType: 'json',
                        method: 'POST',
                        data: { username:username, password:password},
                        headers: {
                            "Content-Type": "application/json",
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
