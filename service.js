angular.module('services', [])

.service('apiService', function ($http, $q, baseUrl) {
  this.get = function (resource) {
    return $q(function (resolve, reject) {
      $http.get(baseUrl + '/' + resource).success(resolve);
    });
  };

  this.saveCart = function (cart) {
    $http.post(baseUrl + '/cart', cart);
  };
})

.value('baseUrl', 'http://mean.codingcamp.us:5555/jason');
