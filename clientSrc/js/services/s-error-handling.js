 myAppS.factory('ErrorHandlingService', [
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
