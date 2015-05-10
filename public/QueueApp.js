(function () {
    'use strict';
    /**
     * Bonus points - manipulating the without waiting for the
     * server request
     */
    function QueueCtrl($scope, $http, $interval ) {

        $scope.customers = [];
        $scope.customersServed = [];
        $interval(function(){
            _getCustomers();
             _getServedCustomers();
        },300);
        $scope.onCustomerAdded = function(){
            // _getCustomers();
            $interval(function(){
              _getCustomers();
            },300);
        }

        $scope.onCustomerRemoved = function(){
            _getCustomers();
        }

        $scope.onCustomerServed = function(){
            $interval(function(){
               _getCustomers();
             _getServedCustomers();
            },300);
           
        }

        function _getServedCustomers(){
            return $http.get('/api/customers/served').then(function(res){
                $scope.customersServed = res.data;
            })
        }

        function _getCustomers(){
            return $http.get('/api/customers').then(function(res){
                $scope.customers = res.data;
            })
        }
    }

     angular.module('qudini.QueueApp', [])
        .controller('QueueCtrl', QueueCtrl);


})();

