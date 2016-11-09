// require all dependencies
(function () {
	'use strict';

	require('./styles.scss');

	// require('./services');
	require('./vendor')();
	require('./services');
	require('./views');


	module.exports = angular.module('dashboard', [
			'ngMaterial',
			'ui.router',
			'dashboard.services',
			'dashboard.views'
		])
		.run(function ($rootScope, $state, $stateParams) {
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
			$rootScope.$on('$stateChangeError', console.log.bind(console));
		})
		.config(require('./app.config.js'));
})();