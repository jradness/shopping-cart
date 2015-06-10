var app = angular.module('shoppingCart', ['services']);

app.controller('mainCtrl', function ($scope, $http, apiService) {
    apiService.get('product').then(parseProducts);
    apiService.get('cart').then(parseCart);

    $scope.itemArray = [];
    $scope.cartArray = [];
    $scope.subtotal = 0;

    function parseProducts(data) {
        $scope.itemArray = [];
        data.forEach(function (element, index) {
            if (index % 3 === 0) $scope.itemArray[index / 3] = [];

            $scope.itemArray[Math.floor(index / 3)].push(element);
        });
    }

    function parseCart(data) {
        $scope.cartArray = (Array.isArray(data)) ? data : [];
        calcSubtotal();
    };

    function calcSubtotal () {
         $scope.subtotal = $scope.cartArray.reduce(function (acc, element) {
           return acc + element.price;
         }, 0);

        $scope.totalQuantity = $scope.cartArray.length;
    };

    //gets items in store
    $http.get('http://mean.codingcamp.us:5555/jason/product')
        .success(function (data, status, headers, config) {
            $scope.itemArray = data;
        });

    $scope.addToCart = function (index) {
        $scope.cartArray.push($scope.itemArray[index]);
        var postData = $scope.cartArray;
        $http.post('http://mean.codingcamp.us:5555/jason/cart', postData);
        calcSubtotal();
        /*For some reason this block of code made you have to press the add button twice and made the could glitch a ton.
        $http.get('http://mean.codingcamp.us:5555/jason/cart')
        .success(function (data, status, headers, config) {
            $scope.cartArray = data;
            //console.log($scope.cartArray);
        });*/

    };

    $scope.deleteFromMyCart = function (index) {
        $scope.cartArray.splice(index, 1);
        var postData = $scope.itemArray[index];
        $http.post('http://mean.codingcamp.us:5555/jason/cart', postData);
        calcSubtotal();
    };
});
