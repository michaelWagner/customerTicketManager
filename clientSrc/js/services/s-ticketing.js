
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
]);