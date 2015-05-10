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

