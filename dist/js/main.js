(function () {
    'use strict';
    /**
     * Bonus points - manipulating the without waiting for the
     * server request
     */
     /* @ngInject */
    function QueueCtrl($scope, $http, $timeout ) {

        $scope.customers = [];
        $scope.customersServed = [];

         _getCustomers();
         _getServedCustomers();

        $scope.onCustomerAdded = function(customer ){
            $scope.customers.push(customer);
            $timeout(function(){
                _getCustomers();
            }.bind(this), 1000);
        };

        $scope.onCustomerRemoved = function(){
             _getCustomers();

        };

        $scope.onCustomerServed = function(){
              _getCustomers();
             _getServedCustomers();

        }

        function _getServedCustomers(){
            return $http.get('/api/customers/served').then(function(res){
                $scope.customersServed = res.data;
            })
        };

        function _getCustomers(){
            return $http.get('/api/customers').then(function(res){
                $scope.customers = res.data;
            })
        }
    }

     angular.module('qudini.QueueApp', [])
        .controller('QueueCtrl', QueueCtrl);


})();


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


(function () {

    /* @ngInject */
    function AddCustomer($http){
        return {
            restrict: 'E',
            scope:{
                onAdded: '&'
            },
            templateUrl:'/add-customer/add-customer.html',
            link: function(scope){

                scope.products = [
                    {name: 'Grammatical advice'},
                    {name: 'Magnifying glass repair'},
                    {name: 'Cryptography advice'}
                ];

                scope.addCustomer = function(){
                     if (!scope.product || !scope.name){
                        alert('You must select a product and a name');
                        return;
                    }
                    var customer = {
                        name: scope.name,
                        product: scope.product,
                        joinedTime: new Date().toString()
                    };
                    return $http.post('/api/customer/add', customer).then(function(res){
                        scope.onAdded()(customer)
                    });
                }
            }
        }
    }

    angular.module('qudini.QueueApp')
        .directive('addCustomer', AddCustomer);

})();

