(function () {
	'use strict';

	function appConfig($urlRouterProvider, $stateProvider, $httpProvider, $locationProvider) {
		// default state prov setup
		$locationProvider.html5Mode(true); // set html 5 mode

		$urlRouterProvider.otherwise('/app/home');

		$stateProvider.state('app', {
			url: '/app',
			abstract: true
		});
	}

	appConfig.$inject = [
		'$urlRouterProvider',
		'$stateProvider',
		'$httpProvider',
		"$locationProvider"
	];

	module.exports = appConfig;
})();