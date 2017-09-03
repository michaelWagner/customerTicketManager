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
            }
        }
    }
]);
