   
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
]);