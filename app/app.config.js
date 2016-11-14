(function () {
	'use strict';

	function appConfig(appConfigProvider, $urlRouterProvider, $stateProvider, $httpProvider, $locationProvider) {
		// default state prov setup
		$locationProvider.html5Mode(true); // set html 5 mode

		$urlRouterProvider.otherwise('/app/home');

		$stateProvider.state('app', {
			url: '/app',
			abstract: true
		});

		appConfigProvider.setPollInterval(3000); // set poll interval to 3 seconds

		// TODO: Add HTTP req interceptors to $httpProvider
	}

	appConfig.$inject = [
		'appConfigProvider',
		'$urlRouterProvider',
		'$stateProvider',
		'$httpProvider',
		"$locationProvider"
	];

	module.exports = appConfig;
})();