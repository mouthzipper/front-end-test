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

