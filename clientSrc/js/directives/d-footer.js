//rccEnter
myAppD.directive('footer', ['$location', 
    function($location) {
        return {
            scope:true,
            templateUrl: 'content/tpl/footer.html',
            link : function(scope, elm, attrs) {

            }, 
            controller: ['$scope', 
                function($scope){
                    
                }
            ]        
        };
    }
]);