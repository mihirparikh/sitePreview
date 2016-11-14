(function () {
	'use strict';

	function appConfigProvider() {
		var params = {};
		params.pollInterval = 3000;

		return {
			setPollInterval: function (val) {
				params.pollInterval = val; // in milliseconds
				return this;
			},
			$get: function () {
				return {
					pollInterval: params.pollInterval
				};
			}
		};
	}

	module.exports = appConfigProvider;
})();