 myAppS.factory('ValidationService', ['$rootScope','$http', '$location', 
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
            },
            validateContact : function(contact){
                for(var i=0; i < contact.length; i++){
                    if( contact[i].required ===true){
                        if(contact[i].value != null ){
                            if(contact[i].type == "text" && contact[i].value.length > 0 ){
                                contact[i].isvalid = IsValidAlphanumeric(contact[i].value.trim());
                            } else if(contact[i].type ==="number"){
                                contact[i].isvalid = IsValidNumeric(contact[i].value);
                            }else if(contact[i].type ==="tel"){
                                contact[i].isvalid = IsValidAlphanumeric(contact[i].value);
                            } else {
                                contact[i].isvalid = false;
                            }     
                        } else {
                            contact[i].isvalid = false;
                        }
                    } else {
                        contact[i].isvalid = true;
                    }   
                }
                return contact;
            },
            validateMeasurements: function(measurements){
                for(var i=0; i < measurements.length; i++){
                    if(measurements[i].measurementvalue !== null){ 
                        if(measurements[i].type ==='input'){
                            measurements[i].isvalid =  IsValidNumeric(measurements[i].measurementvalue);
                        } else {
                            measurements[i].isvalid =  IsValidAlphanumeric(measurements[i].measurementvalue);
                        }
                    } else {
                        measurements[i].isvalid = false;                             
                    }
                }
                return measurements;            
            },
            validateFrontPanel: function(front){

                for(var i=0; i < front.length; i++){
                    if(front[i].required === false){
                        front[i].isvalid = true;
                    } else {
                        front[i].isvalid = (front[i].selectedvalue.length > 0) && IsValidAlphanumeric(front[i].selectedvalue);
                    }
                }
                return front;            
            },
            validateBackPanel: function(back){

                for(var i=0; i < back.length; i++){
                    if(back[i].required === false){
                        back[i].isvalid = true;
                    } else {
                        back[i].isvalid = (back[i].selectedvalue.length > 0) && IsValidAlphanumeric(back[i].selectedvalue);
                    }
                }
                return back;            
            }
        }
    }
]);
