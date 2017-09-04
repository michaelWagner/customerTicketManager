myAppD.directive('sidemenu', ['$location', 
function($location) {
    return {
        scope:true,
        templateUrl:'content/tpl/sidemenu.html',
        link : function(scope, elm, attrs) {
            scope.gotoDestination = function(destination){
                $location.path(destination);
            }
 
        },
        controller: ['$scope', 
            function($scope){
                $scope.isCollapsed = true;
            }
        ]        
    };
}
]);