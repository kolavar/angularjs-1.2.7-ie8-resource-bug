'use strict';

angular.module('example', ['service']).
	controller('ExampleController', ['$scope', 'HttpService', 'ResourceService', 'ResourceService2', 'ResourceService3',
		function ($scope, HttpService, ResourceService, ResourceService2, ResourceService3) {
			HttpService.query().then(function (response) {
				$scope.httpRows = response;
			});
			ResourceService.query().then(function (response) {
				$scope.resourceRows = response;
			});
			ResourceService2.query().then(function (response) {
				$scope.resource2Rows = response;
			});
			ResourceService3.query().then(function (response) {
				$scope.resource3Rows = response;
			});
		}
	]);

angular.module('service', ['ngResource']).
	factory('HttpService', ['$http', '$q', function($http, $q) {
		var factory = {
			query: function() {
				var deferred = $q.defer();
				
				$http.get('data.json', {params: {'cacheSlayer' : new Date().getTime()}}).success(function (data) {
					deferred.resolve(data);
				});
					
				return deferred.promise;
			}
		};
		return factory;
	}]).
	factory('ResourceService', ['$resource', '$q', function($resource, $q) {
		var factory = {
			query: function() {
				var deferred = $q.defer();
				
				$resource('data.json', {'cacheSlayer' : new Date().getTime()}, {}).query(function (data) {
					deferred.resolve(data);
				});
					
				return deferred.promise;
			}
		};
		return factory;
	}]).
	factory('ResourceService2', ['$resource', '$q', function($resource, $q) {
		var factory = {
			query: function() {
				var deferred = $q.defer();
				
				$resource('data.json', {'cacheSlayer' : new Date().getTime()}, {
					'query': { 
						method: 'GET', 
						responseType: 'json',
						isArray: true
				}}).query(function (data) {
					deferred.resolve(data);
				});
					
				return deferred.promise;
			}
		};
		return factory;
	}]).
	factory('ResourceService3', ['$resource', '$q', function($resource, $q) {
		var factory = {
			query: function() {
				var deferred = $q.defer();
				
				$resource('data.json', {'cacheSlayer' : new Date().getTime()}, {
					'elephant': { 
						method: 'GET', 
						responseType: 'json',
						isArray: true
				}}).query(function (data) {
					deferred.resolve(data);
				});
					
				return deferred.promise;
			}
		};
		return factory;
	}]);
