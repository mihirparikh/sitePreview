(function(){
	'use strict';
	
	module.exports = angular.module('dashboard.views.home', [])
		.config(['$stateProvider', function($stateProvider) {
		$stateProvider.state('app.home', {
			parent: 'app',
			url: '/home',
			views: {
				'centerpanel@': {
					template: require('./home.html'),
					controller: require('./controller.js'),
					controllerAs: 'vm'
				}
			}
		});
	}]);
})();