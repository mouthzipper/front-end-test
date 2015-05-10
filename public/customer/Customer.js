(function () {
    'use strict';
    /**
     * The <customer> directive is responsible for:
     * - serving customer
     * - calculating queued time
     * - removing customer from the queue
     */
     /* @ngInject */
    function Customer($http){

        return{
            restrict: 'E',
            scope:{
                customer: '=',

                onRemoved: '&',
                onServed: '&'
            },
            templateUrl: '/customer/customer.html',

            link: function(scope){

                // calculate how long the customer has queued for
                scope.queuedTime = new Date() - new Date(scope.customer.joinedTime);

                scope.remove = function(){
                    $http({
                        method: 'DELETE',
                        url: '/api/customer/remove',
                        params: {id: scope.customer.id}
                    }).then(function(res){
                        scope.onRemoved()()
                    })
                };
                // serve now
                scope.serve = function () {
                    $http({
                        method: 'POST',
                        url: '/api/customer/serve',
                        data: {id: scope.customer.id}
                    }).then(function (res) {
                        scope.onServed()()
                    })
                };
            }
        }
    }

    angular.module('qudini.QueueApp' )
    .directive('customer', Customer);

})();

