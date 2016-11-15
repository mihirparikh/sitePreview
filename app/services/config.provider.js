(function () {
	'use strict';

	function appConfigProvider() {
		var params = {};
		params.pollInterval = 3000;
		params.thumbRequestToken = '1gA2hA3J0lAyltKNWjDQEp8vBc8wBa';

		return {
			setThumbRequestToken: function(val) {
				params.thumbRequestToken = val;
			},
			setPollInterval: function (val) {
				params.pollInterval = val; // in milliseconds
				return this;
			},
			$get: function () {
				return {
					pollInterval: params.pollInterval,
					thumbRequestToken: params.thumbRequestToken
				};
			}
		};
	}

	module.exports = appConfigProvider;
})();