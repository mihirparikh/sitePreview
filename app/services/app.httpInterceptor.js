(function(){
	'use strict';

	function appHttpInterceptor($injector) {
		return {
			'request': function(config) {
				console.log('req interceptor: ' + JSON.stringify(config));
				return config;
			}
		};
	}

	appHttpInterceptor.$inject = ['$injector'];

	module.exports = appHttpInterceptor;
})();